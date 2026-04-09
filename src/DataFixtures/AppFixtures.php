<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Product;
use App\Entity\User; // Importamos tu entidad User
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface; // Importamos el encriptador

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $hasher;

    // Inyectamos el encriptador de contraseñas de Symfony
    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
    }

    public function load(ObjectManager $manager): void
    {
        // 1. CREAR EL USUARIO ADMINISTRADOR SUPERIOR
        $admin = new User();
        $admin->setEmail('admin@gusmuss.com'); // Este será tu usuario

        $admin->setNombre('Administrador');

        $admin->setApellidos('Gusmuss');
        $admin->setRoles(['ROLE_ADMIN']); // Le damos el poder absoluto
        
        // Encriptamos la contraseña "123456"
        $password = $this->hasher->hashPassword($admin, '123456');
        $admin->setPassword($password);
        // Si tu entidad User requiere el campo 'isVerified' u otros, ponlos aquí:
        // $admin->setIsVerified(true); 

        $manager->persist($admin);

        // 2. CREAR CATEGORÍAS
        $categoriasData = ['Camisas y Blusas', 'Pantalones y Jeans', 'Vestidos', 'Ropa de Abrigo', 'Accesorios'];
        $categories = [];

        foreach ($categoriasData as $nombreCat) {
            $category = new Category();
            $category->setNombre($nombreCat);
            $manager->persist($category);
            $categories[$nombreCat] = $category;
        }

        // 3. CREAR PRODUCTOS DE ROPA
        $productosData = [
            ['nombre' => 'Camisa Oxford Blanca', 'desc' => 'Camisa de corte regular fit 100% algodón orgánico.', 'precio' => 4500, 'stock' => 50, 'img' => 'camisa-oxford-blanca.jpg', 'cat' => 'Camisas y Blusas'],
            ['nombre' => 'Blusa Seda Floral', 'desc' => 'Blusa fluida de seda natural con cuello en V.', 'precio' => 8900, 'stock' => 15, 'img' => 'blusa-seda-floral.jpg', 'cat' => 'Camisas y Blusas'],
            ['nombre' => 'Jeans Slim Fit', 'desc' => 'Pantalón vaquero elástico lavado oscuro.', 'precio' => 4995, 'stock' => 100, 'img' => 'jeans-slim-oscuro.jpg', 'cat' => 'Pantalones y Jeans'],
            ['nombre' => 'Pantalón Chino', 'desc' => 'Pantalón chino de corte recto en sarga.', 'precio' => 3999, 'stock' => 60, 'img' => 'chino-tostado.jpg', 'cat' => 'Pantalones y Jeans'],
            ['nombre' => 'Vestido Midi Punto', 'desc' => 'Vestido ajustado de largo midi en punto elástico.', 'precio' => 4500, 'stock' => 40, 'img' => 'vestido-midi-punto.jpg', 'cat' => 'Vestidos'],
            ['nombre' => 'Vestido Lencero', 'desc' => 'Confeccionado en satén negro con tirantes finos.', 'precio' => 7500, 'stock' => 20, 'img' => 'vestido-lencero-negro.jpg', 'cat' => 'Vestidos'],
            ['nombre' => 'Abrigo Lana Camel', 'desc' => 'Abrigo largo cruzado con mezcla de lana.', 'precio' => 12900, 'stock' => 10, 'img' => 'abrigo-lana-camel.jpg', 'cat' => 'Ropa de Abrigo'],
            ['nombre' => 'Biker Cuero', 'desc' => 'Chaqueta estilo motero en 100% piel ovina.', 'precio' => 15900, 'stock' => 8, 'img' => 'biker-cuero.jpg', 'cat' => 'Ropa de Abrigo'],
            ['nombre' => 'Bolso Shopper Piel', 'desc' => 'Bolso de gran capacidad en piel texturizada.', 'precio' => 8500, 'stock' => 12, 'img' => 'bolso-shopper-piel.jpg', 'cat' => 'Accesorios'],
            ['nombre' => 'Bufanda Cashmere', 'desc' => 'Bufanda extra suave elaborada en cashmere puro.', 'precio' => 6500, 'stock' => 30, 'img' => 'bufanda-cashmere.jpg', 'cat' => 'Accesorios'],
        ];

        foreach ($productosData as $data) {
            $product = new Product();
            $product->setNombre($data['nombre']);
            $product->setDescripcion($data['desc']);
            $product->setPrecio($data['precio']); 
            $product->setStock($data['stock']);
            $product->setCategory($categories[$data['cat']]);
            $product->setImagenFilename($data['img']); 
            
            $manager->persist($product);
        }

        // 4. GUARDAR TODO EN MYSQL
        $manager->flush();
    }
}