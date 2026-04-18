<?php

namespace App\Entity;

use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nombre = null;

    /**
     * Slug para URLs SEO (ej: "anillos-de-compromiso")
     */
    #[ORM\Column(length: 100, unique: true, nullable: true)]
    private ?string $slug = null;

    /**
     * Descripción de la categoría para la página de listado de productos
     */
    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $descripcion = null;

    /**
     * @var Collection<int, Product>
     */
    #[ORM\OneToMany(targetEntity: Product::class, mappedBy: 'category')]
    private Collection $products;

    public function __construct()
    {
        $this->products = new ArrayCollection();
    }

    public function __toString(): string
    {
        return $this->nombre ?? '';
    }

    public function getId(): ?int { return $this->id; }

    public function getNombre(): ?string { return $this->nombre; }

    public function setNombre(string $nombre): static
    {
        $this->nombre = $nombre;
        return $this;
    }

    public function getSlug(): ?string { return $this->slug; }

    public function setSlug(?string $slug): static
    {
        $this->slug = $slug;
        return $this;
    }

    public function getDescripcion(): ?string { return $this->descripcion; }

    public function setDescripcion(?string $descripcion): static
    {
        $this->descripcion = $descripcion;
        return $this;
    }

    /**
     * @return Collection<int, Product>
     */
    public function getProducts(): Collection { return $this->products; }

    public function addProduct(Product $product): static
    {
        if (!$this->products->contains($product)) {
            $this->products->add($product);
            $product->setCategory($this);
        }
        return $this;
    }

    public function removeProduct(Product $product): static
    {
        if ($this->products->removeElement($product)) {
            if ($product->getCategory() === $this) {
                $product->setCategory(null);
            }
        }
        return $this;
    }
}
