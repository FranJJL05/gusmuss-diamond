<?php

namespace App\Controller\Api;

use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

/**
 * API REST de Categorías — acceso público.
 *
 * Endpoints:
 *   GET /api/categorias              Lista todas las categorías
 *   GET /api/categorias/{slug}       Detalle de categoría + sus productos
 */
#[Route('/api/categorias', name: 'api_categorias_')]
class CategoryController extends AbstractController
{
    public function __construct(
        private CategoryRepository $categoryRepository,
        private ProductRepository  $productRepository,
    ) {
    }

    /**
     * GET /api/categorias
     */
    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $categorias = $this->categoryRepository->findAll();

        $data = array_map(fn($c) => [
            'id'          => $c->getId(),
            'nombre'      => $c->getNombre(),
            'slug'        => $c->getSlug(),
            'descripcion' => $c->getDescripcion(),
            'totalProductos' => $c->getProducts()->count(),
        ], $categorias);

        return $this->json($data, 200, $this->corsHeaders());
    }

    /**
     * GET /api/categorias/{slug}
     * Devuelve la categoría + todos sus productos
     */
    #[Route('/{slug}', name: 'show', methods: ['GET'])]
    public function show(string $slug): JsonResponse
    {
        $categoria = $this->categoryRepository->findOneBy(['slug' => $slug]);

        if (!$categoria) {
            return $this->json(['error' => 'Categoría no encontrada'], 404, $this->corsHeaders());
        }

        $productos = $this->productRepository->findAllWithCategory($slug);

        return $this->json([
            'id'          => $categoria->getId(),
            'nombre'      => $categoria->getNombre(),
            'slug'        => $categoria->getSlug(),
            'descripcion' => $categoria->getDescripcion(),
            'productos'   => array_map(fn($p) => [
                'id'               => $p->getId(),
                'nombre'           => $p->getNombre(),
                'slug'             => $p->getSlug(),
                'material'         => $p->getMaterial(),
                'precio'           => $p->getPrecio(),
                'precioFormateado' => number_format($p->getPrecio() / 100, 2, ',', '.') . ' €',
                'stock'            => $p->getStock(),
                'imagen'           => $p->getImagenFilename()
                    ? '/uploads/products/' . $p->getImagenFilename()
                    : null,
            ], $productos),
        ], 200, $this->corsHeaders());
    }

    private function corsHeaders(): array
    {
        return [
            'Access-Control-Allow-Origin'  => '*',
            'Access-Control-Allow-Methods' => 'GET, OPTIONS',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
        ];
    }
}
