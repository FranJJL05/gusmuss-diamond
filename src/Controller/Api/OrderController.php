<?php

namespace App\Controller\Api;

use App\Entity\Order;
use App\Entity\OrderItem;
use App\Entity\User;
use App\Repository\OrderRepository;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

/**
 * API REST de Pedidos.
 *
 * El carrito vive en React (localStorage / Context API).
 * Al hacer checkout, React envía los items al backend para crear el pedido.
 *
 * Endpoints:
 *   POST /api/pedidos          → Crear pedido desde React (requiere auth)
 *   GET  /api/pedidos          → Mis pedidos (requiere auth)
 *   GET  /api/pedidos/{id}     → Detalle de un pedido (requiere auth)
 */
#[Route('/api/pedidos', name: 'api_pedidos_')]
class OrderController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $em,
        private ProductRepository      $productRepository,
        private OrderRepository        $orderRepository,
    ) {
    }

    /**
     * POST /api/pedidos
     *
     * El carrito llega en el body JSON desde React:
     * {
     *   "items": [
     *     { "productId": 1, "cantidad": 2 },
     *     { "productId": 5, "cantidad": 1 }
     *   ],
     *   "direccionEnvio": "Calle Mayor 1, 28001 Madrid"   ← opcional
     * }
     */
    #[Route('', name: 'crear', methods: ['POST'])]
    public function crear(#[CurrentUser] ?User $user, Request $request): JsonResponse
    {
        if (!$user) {
            return $this->json(['error' => 'Debes iniciar sesión para finalizar la compra'], 401, $this->cors());
        }

        $data  = json_decode($request->getContent(), true) ?? [];
        $items = $data['items'] ?? [];

        if (empty($items)) {
            return $this->json(['error' => 'El carrito está vacío'], 422, $this->cors());
        }

        $direccionEnvio = $data['direccionEnvio'] ?? $user->getDireccion() ?? 'Sin dirección especificada';

        // Crear cabecera del pedido
        $order = new Order();
        $order->setUser($user)
              ->setEstado('pendiente')
              ->setFechaPedido(new \DateTimeImmutable());

        $total       = 0.0;
        $resumenItems = [];

        foreach ($items as $cartItem) {
            $productId = (int) ($cartItem['productId'] ?? 0);
            $cantidad  = max(1, (int) ($cartItem['cantidad'] ?? 1));

            $product = $this->productRepository->find($productId);

            if (!$product) {
                return $this->json(['error' => "Producto #{$productId} no encontrado"], 404, $this->cors());
            }

            if ($product->getStock() < $cantidad) {
                return $this->json([
                    'error'           => 'Stock insuficiente para: ' . $product->getNombre(),
                    'stockDisponible' => $product->getStock(),
                    'pedido'          => $cantidad,
                ], 422, $this->cors());
            }

            // Crear la línea del pedido
            $orderItem = new OrderItem();
            $orderItem->setProduct($product)
                      ->setCantidad($cantidad)
                      ->setPrecioUnitario($product->getPrecio() / 100); // euros (float)

            $order->addOrderItem($orderItem);

            // Descontar stock
            $product->setStock($product->getStock() - $cantidad);

            $subtotal = $product->getPrecio() * $cantidad;
            $total   += $subtotal;

            $resumenItems[] = [
                'nombre'           => $product->getNombre(),
                'cantidad'         => $cantidad,
                'precioUnitario'   => number_format($product->getPrecio() / 100, 2, ',', '.') . ' €',
                'subtotalFormateado' => number_format($subtotal / 100, 2, ',', '.') . ' €',
            ];
        }

        $order->setTotal($total / 100); // total en euros

        $this->em->persist($order);
        $this->em->flush();

        return $this->json([
            'mensaje' => '¡Pedido confirmado!',
            'pedido'  => [
                'id'              => $order->getId(),
                'estado'          => $order->getEstado(),
                'fechaPedido'     => $order->getFechaPedido()->format('Y-m-d H:i'),
                'totalFormateado' => number_format($order->getTotal(), 2, ',', '.') . ' €',
                'direccionEnvio'  => $direccionEnvio,
                'items'           => $resumenItems,
            ],
        ], 201, $this->cors());
    }

    /**
     * GET /api/pedidos
     * Historial de pedidos del usuario autenticado.
     */
    #[Route('', name: 'mis_pedidos', methods: ['GET'])]
    public function misPedidos(#[CurrentUser] ?User $user): JsonResponse
    {
        if (!$user) {
            return $this->json(['error' => 'No autenticado'], 401, $this->cors());
        }

        $pedidos = $this->orderRepository->findBy(
            ['user' => $user],
            ['fechaPedido' => 'DESC']
        );

        return $this->json(
            array_map(fn(Order $o) => $this->serializeOrder($o), $pedidos),
            200,
            $this->cors()
        );
    }

    /**
     * GET /api/pedidos/{id}
     */
    #[Route('/{id}', name: 'detalle', methods: ['GET'])]
    public function detalle(int $id, #[CurrentUser] ?User $user): JsonResponse
    {
        if (!$user) {
            return $this->json(['error' => 'No autenticado'], 401, $this->cors());
        }

        $pedido = $this->orderRepository->find($id);

        if (!$pedido || $pedido->getUser() !== $user) {
            return $this->json(['error' => 'Pedido no encontrado'], 404, $this->cors());
        }

        return $this->json($this->serializeOrder($pedido, true), 200, $this->cors());
    }

    // ---------------------------------------------------------------

    private function serializeOrder(Order $o, bool $withItems = false): array
    {
        $data = [
            'id'              => $o->getId(),
            'estado'          => $o->getEstado(),
            'fechaPedido'     => $o->getFechaPedido()?->format('Y-m-d H:i'),
            'total'           => $o->getTotal(),
            'totalFormateado' => number_format($o->getTotal(), 2, ',', '.') . ' €',
            'totalLineas'     => $o->getOrderItems()->count(),
        ];

        if ($withItems) {
            $data['items'] = array_values(
                $o->getOrderItems()->map(fn(OrderItem $item) => [
                    'id'                  => $item->getId(),
                    'nombre'              => $item->getProduct()?->getNombre(),
                    'slug'                => $item->getProduct()?->getSlug(),
                    'imagen'              => $item->getProduct()?->getImagenFilename()
                        ? '/uploads/products/' . $item->getProduct()->getImagenFilename()
                        : null,
                    'cantidad'            => $item->getCantidad(),
                    'precioUnitario'      => $item->getPrecioUnitario(),
                    'subtotalFormateado'  => number_format($item->getPrecioUnitario() * $item->getCantidad(), 2, ',', '.') . ' €',
                ])->toArray()
            );
        }

        return $data;
    }

    private function cors(): array
    {
        return [
            'Access-Control-Allow-Origin'  => '*',
            'Access-Control-Allow-Methods' => 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
        ];
    }
}
