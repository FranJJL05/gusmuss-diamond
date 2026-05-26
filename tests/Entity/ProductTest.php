<?php

namespace App\Tests\Entity;

use App\Entity\Product;
use App\Entity\Category;
use PHPUnit\Framework\TestCase;

class ProductTest extends TestCase
{
    public function testProductGettersAndSetters(): void
    {
        $product = new Product();
        
        $product->setNombre('Anillo de Diamante Elegante');
        $this->assertEquals('Anillo de Diamante Elegante', $product->getNombre());
        $this->assertEquals('Anillo de Diamante Elegante', (string)$product);

        $product->setPrecio(150000); // 1500,00 €
        $this->assertEquals(150000, $product->getPrecio());

        $product->setStock(10);
        $this->assertEquals(10, $product->getStock());

        $product->setMaterial('Oro blanco 18k');
        $this->assertEquals('Oro blanco 18k', $product->getMaterial());

        $product->setDestacado(true);
        $this->assertTrue($product->isDestacado());

        $product->setImagenFilename('anillo.png');
        $this->assertEquals('anillo.png', $product->getImagenFilename());

        $tallas = ['12', '14', '16'];
        $product->setTallasDisponibles($tallas);
        $this->assertEquals($tallas, $product->getTallasDisponibles());

        $imagenesExtra = ['anillo-2.png', 'anillo-3.png'];
        $product->setImagenesExtra($imagenesExtra);
        $this->assertEquals($imagenesExtra, $product->getImagenesExtra());
    }

    public function testComputeSlug(): void
    {
        $product = new Product();
        $product->setNombre('Collar Riviere de Diamantes');
        
        $product->computeSlug();
        
        $this->assertNotNull($product->getSlug());
        $this->assertStringContainsString('collar-riviere-de-diamantes-', $product->getSlug());
        $this->assertNotNull($product->getCreatedAt());
    }

    public function testCategoryRelationship(): void
    {
        $product = new Product();
        $category = new Category();
        $category->setNombre('Collares');
        
        $product->setCategory($category);
        $this->assertSame($category, $product->getCategory());
    }
}
