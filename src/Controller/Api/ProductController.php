<?php

namespace App\Controller\Api;

use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

/**
 * API REST de Productos — acceso público, sin autenticación.
 *
 * Endpoints:
 *   GET /api/productos              Lista todos los productos (filtrable por categoría)
 *   GET /api/productos/destacados   Solo productos destacados (para la portada)
 *   GET /api/productos/{slug}       Detalle de un producto
 *   GET /api/productos/buscar       Búsqueda por texto (?q=diamante)
 */
#[Route('/api/productos', name: 'api_productos_')]
class ProductController extends AbstractController
{
    public function __construct(private ProductRepository $productRepository)
    {
    }

    /**
     * GET /api/productos
     * GET /api/productos?categoria=anillos
     */
    #[Route('', name: 'list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        $categoriaSlug = $request->query->get('categoria');
        $products = $this->productRepository->findAllWithCategory($categoriaSlug);

        return $this->json(
            array_map(fn($p) => $this->serializeProduct($p, $request), $products),
            200,
            $this->corsHeaders()
        );
    }

    /**
     * GET /api/productos/destacados
     */
    #[Route('/destacados', name: 'destacados', methods: ['GET'])]
    public function destacados(Request $request): JsonResponse
    {
        $products = $this->productRepository->findDestacados();

        return $this->json(
            array_map(fn($p) => $this->serializeProduct($p, $request), $products),
            200,
            $this->corsHeaders()
        );
    }

    /**
     * GET /api/productos/buscar?q=diamante
     */
    #[Route('/buscar', name: 'buscar', methods: ['GET'])]
    public function buscar(Request $request): JsonResponse
    {
        $query = $request->query->get('q', '');

        if (strlen($query) < 2) {
            return $this->json(['error' => 'La búsqueda debe tener al menos 2 caracteres'], 400, $this->corsHeaders());
        }

        $products = $this->productRepository->search($query);

        return $this->json(
            array_map(fn($p) => $this->serializeProduct($p, $request), $products),
            200,
            $this->corsHeaders()
        );
    }

    /**
     * GET /api/productos/{slug}
     */
    #[Route('/{slug}', name: 'show', methods: ['GET'])]
    public function show(string $slug, Request $request): JsonResponse
    {
        $product = $this->productRepository->findBySlug($slug);

        if (!$product) {
            return $this->json(['error' => 'Producto no encontrado'], 404, $this->corsHeaders());
        }

        return $this->json($this->serializeProduct($product, $request, true), 200, $this->corsHeaders());
    }

    /**
     * Convierte un Product a array serializable para la respuesta JSON.
     */
    private function serializeProduct(\App\Entity\Product $p, Request $request, bool $full = false): array
    {
        $baseUrl = $request->getSchemeAndHttpHost();

        $data = [
            'id'              => $p->getId(),
            'nombre'          => $p->getNombre(),
            'slug'            => $p->getSlug(),
            'material'        => $p->getMaterial(),
            'precio'          => $p->getPrecio(),          // en céntimos
            'precioFormateado' => number_format($p->getPrecio() / 100, 2, ',', '.') . ' €',
            'stock'           => $p->getStock(),
            'destacado'       => $p->isDestacado(),
            'imagen'          => $p->getImagenFilename()
                ? $baseUrl . '/uploads/products/' . $p->getImagenFilename()
                : null,
            'galeria'         => array_map(function($img) use ($baseUrl) {
                return $baseUrl . '/uploads/products/' . $img;
            }, $p->getImagenesExtra() ?? []),
            'tallas'          => $p->getTallasDisponibles() ?? [],
            'categoria'       => $p->getCategory() ? [
                'id'     => $p->getCategory()->getId(),
                'nombre' => $p->getCategory()->getNombre(),
                'slug'   => $p->getCategory()->getSlug(),
            ] : null,
            'createdAt'       => $p->getCreatedAt()?->format('Y-m-d'),
        ];

        // En la vista de detalle, incluimos la descripción completa
        if ($full) {
            $data['descripcion'] = $p->getDescripcion();
        }

        return $data;
    }

    /**
     * Cabeceras CORS para que React (en otro puerto) pueda hacer fetch() al API.
     */
    private function corsHeaders(): array
    {
        return [
            'Access-Control-Allow-Origin'  => '*',
            'Access-Control-Allow-Methods' => 'GET, OPTIONS',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
        ];
    }
}
