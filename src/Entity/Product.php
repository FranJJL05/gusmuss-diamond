<?php

namespace App\Entity;

use App\Repository\ProductRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\String\Slugger\AsciiSlugger;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nombre = null;

    /**
     * Slug único para URLs SEO-friendly (ej: "anillo-solitario-diamante-18k")
     */
    #[ORM\Column(length: 255, unique: true, nullable: true)]
    private ?string $slug = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $descripcion = null;

    /**
     * Precio almacenado en céntimos de euro (ej: 250000 = 2500,00 €)
     * MoneyField de EasyAdmin divide automáticamente por 100 para mostrarlo
     */
    #[ORM\Column]
    private ?int $precio = null;

    #[ORM\Column]
    private ?int $stock = null;

    /**
     * Material de la joya: "Oro 18k", "Plata 925", "Platino", etc.
     */
    #[ORM\Column(length: 100, nullable: true)]
    private ?string $material = null;

    /**
     * Producto destacado: aparece en la sección principal de la tienda
     */
    #[ORM\Column]
    private bool $destacado = false;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $imagenFilename = null;

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE)]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\ManyToOne(inversedBy: 'products')]
    private ?Category $category = null;

    public function __toString(): string
    {
        return $this->nombre ?? '';
    }

    /**
     * Genera el slug automáticamente a partir del nombre antes de persistir/actualizar
     */
    #[ORM\PrePersist]
    #[ORM\PreUpdate]
    public function computeSlug(): void
    {
        if (!$this->slug && $this->nombre) {
            $slugger = new AsciiSlugger();
            $this->slug = strtolower($slugger->slug($this->nombre)->toString()) . '-' . uniqid();
        }

        if (!$this->createdAt) {
            $this->createdAt = new \DateTimeImmutable();
        }
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

    public function getPrecio(): ?int { return $this->precio; }

    public function setPrecio(int $precio): static
    {
        $this->precio = $precio;
        return $this;
    }

    public function getStock(): ?int { return $this->stock; }

    public function setStock(int $stock): static
    {
        $this->stock = $stock;
        return $this;
    }

    public function getMaterial(): ?string { return $this->material; }

    public function setMaterial(?string $material): static
    {
        $this->material = $material;
        return $this;
    }

    public function isDestacado(): bool { return $this->destacado; }

    public function setDestacado(bool $destacado): static
    {
        $this->destacado = $destacado;
        return $this;
    }

    public function getImagenFilename(): ?string { return $this->imagenFilename; }

    public function setImagenFilename(?string $imagenFilename): static
    {
        $this->imagenFilename = $imagenFilename;
        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable { return $this->createdAt; }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getCategory(): ?Category { return $this->category; }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;
        return $this;
    }
}
