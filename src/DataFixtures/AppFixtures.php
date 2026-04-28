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
                'descripcion' => 'Piezas únicas y exclusivas de nuestra colección más prestigiosa. Joyería de firma para ocasiones inolvidables.',
            ],
            [
                'nombre'      => 'Ropa',
                'slug'        => 'ropa',
                'descripcion' => 'Colección de moda de lujo. Vestidos de noche, conjuntos de alta costura y prendas exclusivas para mujeres con estilo.',
            ],
            [
                'nombre'      => 'Accesorios',
                'slug'        => 'accesorios',
                'descripcion' => 'Sombreros de lujo, bolsos artesanales y complementos exclusivos que elevan cualquier look a otro nivel.',
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
                'precio'     => 185000,
                'stock'      => 8,
                'material'   => 'Oro Blanco 18k',
                'destacado'  => true,
                'cat'        => 'anillos',
                'imagen'     => 'anillo-solitario-diamante-05ct.jpg',
            ],
            [
                'nombre'     => 'Anillo Diamante Solitario 1ct',
                'desc'       => 'Solitario de 1 quilate en montura cesta cuatro garras sobre oro blanco 18k. Diamante talla brillante D-VS1, certificado por el GIA.',
                'precio'     => 420000,
                'stock'      => 4,
                'material'   => 'Oro Blanco 18k',
                'destacado'  => true,
                'cat'        => 'anillos',
                'imagen'     => 'anillo-diamante-solitario-1ct.jpg',
            ],
            [
                'nombre'     => 'Alianza Eternidad Brillantes',
                'desc'       => 'Alianza de eternidad pavé con brillantes de 0,05ct cada uno engastados a canal en oro amarillo 18k. Brillo sin interrupciones.',
                'precio'     => 98000,
                'stock'      => 15,
                'material'   => 'Oro Amarillo 18k',
                'destacado'  => false,
                'cat'        => 'anillos',
                'imagen'     => 'alianza-eternidad-brillantes.jpg',
            ],
            [
                'nombre'     => 'Anillo Rubí Birmano y Diamantes',
                'desc'       => 'Anillo cóctel en platino 950 con rubí birmano central de 2ct rodeado de brillantes blancos. Pieza de colección con certificado Gübelin.',
                'precio'     => 890000,
                'stock'      => 2,
                'material'   => 'Platino 950',
                'destacado'  => true,
                'cat'        => 'alta-joyeria',
                'imagen'     => 'anillo-rubi-birmano-diamantes.jpg',
            ],

            // --- COLLARES ---
            [
                'nombre'     => 'Colgante Diamante Corazón',
                'desc'       => 'Colgante en forma de corazón con diamante central 0,3ct y pavé de brillantes sobre cadena en oro blanco 18k (42 cm).',
                'precio'     => 125000,
                'stock'      => 10,
                'material'   => 'Oro Blanco 18k',
                'destacado'  => true,
                'cat'        => 'collares-colgantes',
                'imagen'     => 'colgante-diamante-corazon.jpg',
            ],
            [
                'nombre'     => 'Collar Riviére Diamantes',
                'desc'       => 'Collar riviére de 23 diamantes talla brillante en total 3ct, montados en hilo de oro blanco 18k. Elegancia sin igual para la noche.',
                'precio'     => 750000,
                'stock'      => 3,
                'material'   => 'Oro Blanco 18k',
                'destacado'  => true,
                'cat'        => 'collares-colgantes',
                'imagen'     => 'collar-riviere-diamantes.jpg',
            ],
            [
                'nombre'     => 'Gargantilla Esmeralda Colombia',
                'desc'       => 'Gargantilla en oro amarillo 18k con esmeralda colombiana central de 3ct calibrada en talla rectangular y rodeada de brillantes.',
                'precio'     => 1250000,
                'stock'      => 1,
                'material'   => 'Oro Amarillo 18k',
                'destacado'  => false,
                'cat'        => 'alta-joyeria',
                'imagen'     => 'gargantilla-esmeralda-colombia.jpg',
            ],

            // --- PULSERAS ---
            [
                'nombre'     => 'Pulsera Tennis Diamantes 3ct',
                'desc'       => 'Clásica pulsera tennis con 45 diamantes redondos en total 3ct, engastados en garras sobre oro blanco 18k. Longitud ajustable 17–19 cm.',
                'precio'     => 480000,
                'stock'      => 5,
                'material'   => 'Oro Blanco 18k',
                'destacado'  => true,
                'cat'        => 'pulseras',
                'imagen'     => 'pulsera-tennis-diamantes-3ct.jpg',
            ],
            [
                'nombre'     => 'Brazalete Rígido Oro Amarillo',
                'desc'       => 'Brazalete rígido torchon en oro amarillo 18k macizo. Diseño minimal de alta durabilidad, acabado pulido espejo. Peso 22g.',
                'precio'     => 210000,
                'stock'      => 7,
                'material'   => 'Oro Amarillo 18k',
                'destacado'  => false,
                'cat'        => 'pulseras',
                'imagen'     => 'brazalete-rigido-oro-amarillo.jpg',
            ],

            // --- PENDIENTES ---
            [
                'nombre'     => 'Pendientes Solitario Diamante 0.3ct',
                'desc'       => 'Pendientes de tuerca en oro blanco 18k con diamante brillante de 0,3ct cada uno. Certificados individualmente por el IGI.',
                'precio'     => 95000,
                'stock'      => 12,
                'material'   => 'Oro Blanco 18k',
                'destacado'  => true,
                'cat'        => 'pendientes',
                'imagen'     => 'pendientes-solitario-diamante-03ct.jpg',
            ],
            [
                'nombre'     => 'Ear Climbers Diamante Pavé',
                'desc'       => 'Pendientes ear climber que ascienden por el lóbulo con una línea de brillantes pavé en oro blanco 18k. Modernos y distintos.',
                'precio'     => 145000,
                'stock'      => 6,
                'material'   => 'Oro Blanco 18k',
                'destacado'  => false,
                'cat'        => 'pendientes',
                'imagen'     => 'pendientes-ear-climbers-pave.jpg',
            ],
            [
                'nombre'     => 'Pendientes Zafiro y Diamantes',
                'desc'       => 'Pendientes colgantes con zafiro azul Sri Lanka de 1,5ct y diamantes en pavé, en oro blanco 18k. Reminiscencia a la joyería real.',
                'precio'     => 320000,
                'stock'      => 4,
                'material'   => 'Oro Blanco 18k',
                'destacado'  => true,
                'cat'        => 'alta-joyeria',
                'imagen'     => 'pendientes-zafiro-diamantes.jpg',
            ],

            // --- ROPA (solo prendas de vestir) ---
            [
                'nombre'     => 'Vestido de Noche en Seda Negra',
                'desc'       => 'Vestido de noche en seda negra con corpiño estructurado, detalle drapeado y falda con pequeña cola. Confeccionado a mano. Tallas XS-XL.',
                'precio'     => 58000,
                'stock'      => 6,
                'material'   => 'Seda Natural',
                'destacado'  => true,
                'cat'        => 'ropa',
                'imagen'     => 'vestido-noche-seda.jpg',
            ],
            [
                'nombre'     => 'Vestido Cóctel Midi Beige',
                'desc'       => 'Vestido cóctel de longitud midi en satén beige con finos tirantes y vuelo sutil. Elegante y luminoso para cualquier ocasión especial.',
                'precio'     => 42000,
                'stock'      => 8,
                'material'   => 'Satén',
                'destacado'  => true,
                'cat'        => 'ropa',
                'imagen'     => 'vestido-coctel-dorado.jpg',
            ],
            [
                'nombre'     => 'Conjunto Blazer y Pantalón Crema',
                'desc'       => 'Conjunto de poder femenino: blazer oversize en crema con botones dorados y pantalón de pierna ancha a juego. Tejido premium italiano.',
                'precio'     => 35000,
                'stock'      => 10,
                'material'   => 'Lana Italiana',
                'destacado'  => false,
                'cat'        => 'ropa',
                'imagen'     => 'conjunto-blazer-pantalon.jpg',
            ],
            [
                'nombre'     => 'Vestido Verano Bordado',
                'desc'       => 'Vestido midi de verano en blanco puro con bordado floral en hilo dorado en el escote y el bajo. Ligero y romántico para eventos al aire libre.',
                'precio'     => 28000,
                'stock'      => 12,
                'material'   => 'Algodón Premium',
                'destacado'  => false,
                'cat'        => 'ropa',
                'imagen'     => 'vestido-verano-bordado.jpg',
            ],
            [
                'nombre'     => 'Falda Midi Plisada Champagne',
                'desc'       => 'Falda midi plisada en satén champagne con cintura elástica y caída fluida. Versátil y femenina, perfecta para combinar con blusa o body.',
                'precio'     => 19500,
                'stock'      => 14,
                'material'   => 'Satén Plisado',
                'destacado'  => true,
                'cat'        => 'ropa',
                'imagen'     => 'falda-midi-plisada.jpg',
            ],
            [
                'nombre'     => 'Blusa de Seda con Volantes',
                'desc'       => 'Blusa de seda blanca con cuello de volantes y manga larga. Sofisticada y atemporal, ideal para combinar con falda o pantalón de sastre.',
                'precio'     => 22000,
                'stock'      => 10,
                'material'   => 'Seda',
                'destacado'  => false,
                'cat'        => 'ropa',
                'imagen'     => 'blusa-seda-blanca.jpg',
            ],
            [
                'nombre'     => 'Abrigo Largo de Lana Negra',
                'desc'       => 'Abrigo largo de lana negra con solapas limpias y corte recto. Cálido, elegante y atemporal. El básico de lujo que nunca pasa de moda.',
                'precio'     => 89000,
                'stock'      => 5,
                'material'   => 'Lana',
                'destacado'  => true,
                'cat'        => 'ropa',
                'imagen'     => 'abrigo-largo-negro.jpg',
            ],
            [
                'nombre'     => 'Vestido Wrap Verde Bosque',
                'desc'       => 'Vestido cruzado en verde bosque con escote en V y manga larga. Silueta fluida y favorecedora para cualquier tipo de cuerpo. Tallas XS-XL.',
                'precio'     => 31000,
                'stock'      => 9,
                'material'   => 'Tejido Fluido',
                'destacado'  => false,
                'cat'        => 'ropa',
                'imagen'     => 'vestido-wrap-verde.jpg',
            ],
            [
                'nombre'     => 'Pantalón Lino de Vuelo',
                'desc'       => 'Pantalón ancho de lino orgánico blanco crudo con cintura alta y pinzas marcadas. Silueta sartorial ligera y muy veraniega.',
                'precio'     => 18000,
                'stock'      => 15,
                'material'   => 'Lino Orgánico',
                'destacado'  => false,
                'cat'        => 'ropa',
                'imagen'     => 'pantalon-lino.jpg',
            ],
            [
                'nombre'     => 'Cardigan Cashmere Gris',
                'desc'       => 'Cárdigan ajustado en mezcla de cashmere y lana virgen de color gris claro. Botones de nácar y acabado premium. El básico definitivo.',
                'precio'     => 29500,
                'stock'      => 8,
                'material'   => 'Cashmere',
                'destacado'  => false,
                'cat'        => 'ropa',
                'imagen'     => 'cardigan-cashmere.jpg',
            ],
            [
                'nombre'     => 'Vestido Asimétrico Rojo',
                'desc'       => 'Vestido asimétrico de noche en seda de color rojo escarlata. Un hombro destubierto, drapeado lateral y silueta escultural.',
                'precio'     => 62000,
                'stock'      => 4,
                'material'   => 'Seda Raso',
                'destacado'  => true,
                'cat'        => 'ropa',
                'imagen'     => 'vestido-asimetrico.jpg',
            ],
            [
                'nombre'     => 'Trench Coat Clásico',
                'desc'       => 'Gabardina clásica camel beige cruzada con cinturón a juego. Prenda exterior indispensable para la transición entre temporadas.',
                'precio'     => 45000,
                'stock'      => 7,
                'material'   => 'Algodón Gabardina',
                'destacado'  => true,
                'cat'        => 'ropa',
                'imagen'     => 'trench-coat.jpg',
            ],

            // --- ACCESORIOS (sombreros + joyería) ---
            [
                'nombre'     => 'Anillo Solitario Oro 18k',
                'desc'       => 'Anillo solitario de diseño minimalista fabricado artesanalmente en oro amarillo de 18 quilates con un pequeño diamante corte brillante coronando la pieza.',
                'precio'     => 145000,
                'stock'      => 4,
                'material'   => 'Oro Amarillo 18k, Diamante',
                'destacado'  => true,
                'cat'        => 'accesorios',
                'imagen'     => 'anillo-solitario.jpg',
            ],
            [
                'nombre'     => 'Anillo Banda Platino',
                'desc'       => 'Anillo estilo alianza en platino pulido. Un diseño liso, grueso y ergonómico que transmite elegancia silenciosa en cada detalle.',
                'precio'     => 185000,
                'stock'      => 3,
                'material'   => 'Platino 950',
                'destacado'  => false,
                'cat'        => 'accesorios',
                'imagen'     => 'anillo-solitario-platino.jpg',
            ],
            [
                'nombre'     => 'Sombrero Bucket Beige',
                'desc'       => 'Sombrero bucket en algodón beige de corte limpio y moderno. Ligero, lavable y con aro interior ajustable. Perfecto para verano y días de playa.',
                'precio'     => 8500,
                'stock'      => 20,
                'material'   => 'Algodón',
                'destacado'  => true,
                'cat'        => 'accesorios',
                'imagen'     => 'sombrero-ala-ancha.jpg',
            ],
            [
                'nombre'     => 'Sombrero Fedora Blanco',
                'desc'       => 'Fedora de ala ancha en fieltro blanco prémium con cinta de seda negra. Atemporal y elegante, ideal para eventos al aire libre y garden parties.',
                'precio'     => 18500,
                'stock'      => 15,
                'material'   => 'Fieltro Premium',
                'destacado'  => false,
                'cat'        => 'accesorios',
                'imagen'     => 'sombrero-ala-ancha-blanco.jpg',
            ],
            [
                'nombre'     => 'Sombrero Panamá Artesanal',
                'desc'       => 'Auténtico sombrero panamá tejido a mano en Ecuador con cinta de seda negra y certificado de origen. El complemento veraniego de lujo por excelencia.',
                'precio'     => 24500,
                'stock'      => 10,
                'material'   => 'Paja Toquilla',
                'destacado'  => true,
                'cat'        => 'accesorios',
                'imagen'     => 'sombrero-panama.jpg',
            ],
            [
                'nombre'     => 'Collar de Perlas Clásico',
                'desc'       => 'Collar de perlas cultivadas de primera calidad con cierre en oro de 18k. Un clásico intemporale que eleva cualquier look al instante.',
                'precio'     => 32000,
                'stock'      => 8,
                'material'   => 'Perlas y Oro 18k',
                'destacado'  => true,
                'cat'        => 'accesorios',
                'imagen'     => 'collar-perlas.jpg',
            ],
            [
                'nombre'     => 'Pendientes Aro Dorado',
                'desc'       => 'Pendientes de aro en oro amarillo 18k pulido. Tamaño medio, ligeros y versátiles. El complemento perfecto para el día a día con un toque de lujo.',
                'precio'     => 14500,
                'stock'      => 18,
                'material'   => 'Oro Amarillo 18k',
                'destacado'  => false,
                'cat'        => 'accesorios',
                'imagen'     => 'pendientes-aro-dorado.jpg',
            ],
            [
                'nombre'     => 'Pulsera Cadena de Oro',
                'desc'       => 'Pulsera de cadena fina en oro de 18k, delicada y elegante. Perfecta para llevar sola o apilada con otras pulseras. Cierre de mosquetón.',
                'precio'     => 19000,
                'stock'      => 12,
                'material'   => 'Oro 18k',
                'destacado'  => false,
                'cat'        => 'accesorios',
                'imagen'     => 'pulsera-cadena-dorada.jpg',
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
                    ->setImagenFilename($data['imagen'] ?? null)
                    ->setCreatedAt(new \DateTimeImmutable());

            // Add automatic imagenesExtra based on primary image
            if (isset($data['imagen'])) {
                $baseName = pathinfo($data['imagen'], PATHINFO_FILENAME);
                $ext = pathinfo($data['imagen'], PATHINFO_EXTENSION);
                $product->setImagenesExtra([
                    "{$baseName}-2.{$ext}",
                    "{$baseName}-3.{$ext}",
                ]);
            }

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