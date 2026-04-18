<?php

namespace App\Repository;

use App\Entity\Product;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Product>
 */
class ProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Product::class);
    }

    /**
     * Devuelve todos los productos con su categoría cargada en un solo JOIN.
     * Opcionalmente filtra por slug de categoría.
     *
     * @return Product[]
     */
    public function findAllWithCategory(?string $categoriaSlug = null): array
    {
        $qb = $this->createQueryBuilder('p')
            ->join('p.category', 'c')
            ->addSelect('c')
            ->orderBy('p.createdAt', 'DESC');

        if ($categoriaSlug) {
            $qb->andWhere('c.slug = :slug')
               ->setParameter('slug', $categoriaSlug);
        }

        return $qb->getQuery()->getResult();
    }

    /**
     * Devuelve los productos marcados como destacados (para la portada de la tienda).
     *
     * @return Product[]
     */
    public function findDestacados(): array
    {
        return $this->createQueryBuilder('p')
            ->join('p.category', 'c')
            ->addSelect('c')
            ->andWhere('p.destacado = :dest')
            ->setParameter('dest', true)
            ->orderBy('p.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * Busca un producto por su slug. Usado en la ruta GET /api/productos/{slug}
     */
    public function findBySlug(string $slug): ?Product
    {
        return $this->createQueryBuilder('p')
            ->join('p.category', 'c')
            ->addSelect('c')
            ->andWhere('p.slug = :slug')
            ->setParameter('slug', $slug)
            ->getQuery()
            ->getOneOrNullResult();
    }

    /**
     * Búsqueda de productos por texto (nombre o descripción).
     *
     * @return Product[]
     */
    public function search(string $query): array
    {
        return $this->createQueryBuilder('p')
            ->join('p.category', 'c')
            ->addSelect('c')
            ->andWhere('p.nombre LIKE :q OR p.descripcion LIKE :q OR p.material LIKE :q')
            ->setParameter('q', '%' . $query . '%')
            ->orderBy('p.nombre', 'ASC')
            ->getQuery()
            ->getResult();
    }
}
