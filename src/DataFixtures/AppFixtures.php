<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Product;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\String\Slugger\AsciiSlugger;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $hasher;
    private AsciiSlugger $slugger;

    public function __construct(UserPasswordHasherInterface $hasher)
    {
        $this->hasher = $hasher;
        $this->slugger = new AsciiSlugger();
    }

    private function makeSlug(string $text): string
    {
        return strtolower($this->slugger->slug($text)->toString());
    }

    public function load(ObjectManager $manager): void
    {
        // =============================================
        // 1. USUARIO ADMINISTRADOR
        // =============================================
        $admin = new User();
        $admin->setEmail('admin@gusmuss.com')
              ->setNombre('Admin')
              ->setApellidos('Gusmuss Diamond')
              ->setRoles(['ROLE_ADMIN'])
              ->setIsVerified(true)
              ->setPassword($this->hasher->hashPassword($admin, 'admin1234'));
        $manager->persist($admin);

        // =============================================
        // 2. USUARIO DE PRUEBA (cliente)
        // =============================================
        $cliente = new User();
        $cliente->setEmail('cliente@gusmuss.com')
                ->setNombre('María')
                ->setApellidos('García López')
                ->setRoles([])
                ->setIsVerified(true)
                ->setTelefono('+34 612 345 678')
                ->setDireccion('Calle Serrano 15, 28001 Madrid, España')
                ->setPassword($this->hasher->hashPassword($cliente, 'cliente1234'));
        $manager->persist($cliente);

        // =============================================
        // 3. CATEGORÍAS DE ALTA JOYERÍA
        // =============================================
        $categorias = [
            [
                'nombre'      => 'Anillos',
                'slug'        => 'anillos',
                'descripcion' => 'Colección de anillos de alta joyería en oro, platino y diamantes. Desde solitarios hasta bandas de eternidad.',
            ],
            [
                'nombre'      => 'Collares y Colgantes',
                'slug'        => 'collares-colgantes',
                'descripcion' => 'Collares y colgantes artesanales con piedras preciosas certificadas. Piezas únicas de distinción.',
            ],
            [
                'nombre'      => 'Pulseras',
                'slug'        => 'pulseras',
                'descripcion' => 'Pulseras de lujo en oro blanco y amarillo con brillantes y gemas de color.',
            ],
            [
                'nombre'      => 'Pendientes',
                'slug'        => 'pendientes',
                'descripcion' => 'Pendientes de alta joyería: desde pendientes de botón hasta espectaculares ear climbers.',
            ],
            [
                'nombre'      => 'Alta Joyería',
                'slug'        => 'alta-joyeria',
                'descripcion' => 'Piezas únicas y exclusivas de nuestra colección más prestig iosa. Joyería de firma para ocasiones inolvidables.',
            ],
        ];

        $categoriaEntidades = [];
        foreach ($categorias as $data) {
            $cat = new Category();
            $cat->setNombre($data['nombre'])
                ->setSlug($data['slug'])
                ->setDescripcion($data['descripcion']);
            $manager->persist($cat);
            $categoriaEntidades[$data['slug']] = $cat;
        }

        // =============================================
        // 4. PRODUCTOS DE ALTA JOYERÍA
        // Precio en céntimos: 250000 = 2.500,00 €
        // =============================================
        $productos = [
            // --- ANILLOS ---
            [
                'nombre'     => 'Anillo Solitario Diamante 0.5ct',
                'desc'       => 'Anillo solitario en oro blanco 18k con diamante central de 0,5 quilates talla brillante. Certificado GIA. La expresión clásica del amor eterno.',
                'precio'     => 185000,  // 1.850,00 €
                'stock'      => 8,
                'material'   => 'Oro Blanco 18k',
                'destacado'  => true,
                'cat'        => 'anillos',
            ],
            [
                'nombre'     => 'Anillo Diamante Solitario 1ct',
                'desc'       => 'Solitario de 1 quilate en montura cesta cuatro garras sobre oro blanco 18k. Diamante talla brillante D-VS1, certificado por el GIA.',
                'precio'     => 420000,  // 4.200,00 €
                'stock'      => 4,
                'material'   => 'Oro Blanco 18k',
                'destacado'  => true,
                'cat'        => 'anillos',
            ],
            [
                'nombre'     => 'Alianza Eternidad Brillantes',
                'desc'       => 'Alianza de eternidad pavé con brillantes de 0,05ct cada uno engastados a canal en oro amarillo 18k. Brillo sin interrupciones.',
                'precio'     => 98000,   // 980,00 €
                'stock'      => 15,
                'material'   => 'Oro Amarillo 18k',
                'destacado'  => false,
                'cat'        => 'anillos',
            ],
            [
                'nombre'     => 'Anillo Rubí Birmano y Diamantes',
                'desc'       => 'Anillo cóctel en platino 950 con rubí birmano central de 2ct rodeado de brillantes blancos. Pieza de colección con certificado Gübelin.',
                'precio'     => 890000,  // 8.900,00 €
                'stock'      => 2,
                'material'   => 'Platino 950',
                'destacado'  => true,
                'cat'        => 'alta-joyeria',
            ],

            // --- COLLARES ---
            [
                'nombre'     => 'Colgante Diamante Corazón',
                'desc'       => 'Colgante en forma de corazón con diamante central 0,3ct y pavé de brillantes sobre cadena en oro blanco 18k (42 cm).',
                'precio'     => 125000,  // 1.250,00 €
                'stock'      => 10,
                'material'   => 'Oro Blanco 18k',
                'destacado'  => true,
                'cat'        => 'collares-colgantes',
            ],
            [
                'nombre'     => 'Collar Riviére Diamantes',
                'desc'       => 'Collar riviére de 23 diamantes talla brillante en total 3ct, montados en hilo de oro blanco 18k. Elegancia sin igual para la noche.',
                'precio'     => 750000,  // 7.500,00 €
                'stock'      => 3,
                'material'   => 'Oro Blanco 18k',
                'destacado'  => true,
                'cat'        => 'collares-colgantes',
            ],
            [
                'nombre'     => 'Gargantilla Esmeralda Colombia',
                'desc'       => 'Gargantilla en oro amarillo 18k con esmeralda colombiana central de 3ct calibrada en talla rectangular y rodeada de brillantes.',
                'precio'     => 1250000, // 12.500,00 €
                'stock'      => 1,
                'material'   => 'Oro Amarillo 18k',
                'destacado'  => false,
                'cat'        => 'alta-joyeria',
            ],

            // --- PULSERAS ---
            [
                'nombre'     => 'Pulsera Tennis Diamantes 3ct',
                'desc'       => 'Clásica pulsera tennis con 45 diamantes redondos en total 3ct, engastados en garras sobre oro blanco 18k. Longitud ajustable 17–19 cm.',
                'precio'     => 480000,  // 4.800,00 €
                'stock'      => 5,
                'material'   => 'Oro Blanco 18k',
                'destacado'  => true,
                'cat'        => 'pulseras',
            ],
            [
                'nombre'     => 'Brazalete Rígido Oro Amarillo',
                'desc'       => 'Brazalete rígido torchon en oro amarillo 18k macizo. Diseño minimal de alta durabilidad, acabado pulido espejo. Peso 22g.',
                'precio'     => 210000,  // 2.100,00 €
                'stock'      => 7,
                'material'   => 'Oro Amarillo 18k',
                'destacado'  => false,
                'cat'        => 'pulseras',
            ],

            // --- PENDIENTES ---
            [
                'nombre'     => 'Pendientes Solitario Diamante 0.3ct',
                'desc'       => 'Pendientes de tuerca en oro blanco 18k con diamante brillante de 0,3ct cada uno. Certificados individualmente por el IGI.',
                'precio'     => 95000,   // 950,00 €
                'stock'      => 12,
                'material'   => 'Oro Blanco 18k',
                'destacado'  => true,
                'cat'        => 'pendientes',
            ],
            [
                'nombre'     => 'Ear Climbers Diamante Pavé',
                'desc'       => 'Pendientes ear climber que ascienden por el lóbulo con una línea de brillantes pavé en oro blanco 18k. Modernos y distintos.',
                'precio'     => 145000,  // 1.450,00 €
                'stock'      => 6,
                'material'   => 'Oro Blanco 18k',
                'destacado'  => false,
                'cat'        => 'pendientes',
            ],
            [
                'nombre'     => 'Pendientes Zafiro y Diamantes',
                'desc'       => 'Pendientes colgantes con zafiro azul Sri Lanka de 1,5ct y diamantes en pavé, en oro blanco 18k. Reminiscencia a la joyería real.',
                'precio'     => 320000,  // 3.200,00 €
                'stock'      => 4,
                'material'   => 'Oro Blanco 18k',
                'destacado'  => true,
                'cat'        => 'alta-joyeria',
            ],
        ];

        foreach ($productos as $data) {
            $product = new Product();
            $product->setNombre($data['nombre'])
                    ->setDescripcion($data['desc'])
                    ->setPrecio($data['precio'])
                    ->setStock($data['stock'])
                    ->setMaterial($data['material'])
                    ->setDestacado($data['destacado'])
                    ->setCategory($categoriaEntidades[$data['cat']])
                    ->setCreatedAt(new \DateTimeImmutable());

            // El slug se genera automáticamente con el nombre
            $product->setSlug($this->makeSlug($data['nombre']) . '-' . uniqid());

            $manager->persist($product);
        }

        // =============================================
        // 5. GUARDAR TODO EN MySQL
        // =============================================
        $manager->flush();
    }
}