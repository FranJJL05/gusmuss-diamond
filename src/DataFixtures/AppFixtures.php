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

            // --- ROPA (NUEVA COLECCIÓN DEL ALUMNO) ---
            [ 'nombre' => 'Vestido de Noche Azul Marino', 'desc' => 'Elegante vestido de noche fluido en tono azul marino profundo. Su silueta sofisticada y caída impecable lo convierten en la elección perfecta para eventos de gala.', 'precio' => 24000, 'stock' => 5, 'material' => 'Seda Natural', 'destacado' => true, 'cat' => 'ropa', 'imagen' => 'ropa-0.png' ],
            [ 'nombre' => 'Vestido Largo Encaje Blanco', 'desc' => 'Romántico vestido largo confeccionado en encaje blanco con detalles calados. Presenta un escote en V profundo y falda escalonada que aporta movimiento y ligereza.', 'precio' => 18000, 'stock' => 10, 'material' => 'Encaje y Algodón', 'destacado' => false, 'cat' => 'ropa', 'imagen' => 'ropa-1.png' ],
            [ 'nombre' => 'Camiseta Blanca Estampado Acuarela', 'desc' => 'Camiseta de algodón premium en color blanco puro, destacando un delicado estampado estilo acuarela oriental con un árbol y aves. Arte y moda en una prenda casual de lujo.', 'precio' => 22000, 'stock' => 8, 'material' => 'Algodón Premium', 'destacado' => true, 'cat' => 'ropa', 'imagen' => 'ropa-2.png' ],
            [ 'nombre' => 'Pantalón Ancho Sastre Beige', 'desc' => 'Pantalón de traje de pierna ancha en tono arena. Con pinzas frontales marcadas y cintura alta, redefine la sastrería moderna combinando comodidad absoluta y sofisticación.', 'precio' => 19500, 'stock' => 12, 'material' => 'Mezcla de Lino', 'destacado' => false, 'cat' => 'ropa', 'imagen' => 'ropa-3.png' ],
            [ 'nombre' => 'Conjunto Punto Canalé Beige', 'desc' => 'Exclusivo conjunto de dos piezas en punto de canalé color crema. Compuesto por un top de manga corta y cuello redondo junto a una falda midi ajustada que realza la silueta.', 'precio' => 35000, 'stock' => 4, 'material' => 'Punto de Lana', 'destacado' => true, 'cat' => 'ropa', 'imagen' => 'ropa-4.png' ],
            [ 'nombre' => 'Vestido Cruzado Floral Seda', 'desc' => 'Vestido midi cruzado estilo wrap en seda satinada. Su exquisito estampado floral sobre fondo crema y detalle de volante asimétrico evocan una elegancia primaveral irresistible.', 'precio' => 28000, 'stock' => 7, 'material' => 'Seda Satén', 'destacado' => false, 'cat' => 'ropa', 'imagen' => 'ropa-5.png' ],
            [ 'nombre' => 'Vestido Asimétrico Satén Negro', 'desc' => 'Impactante vestido de noche asimétrico confeccionado en satén negro de alto brillo. Presenta un solo hombro y un elegante drapeado lateral que esculpe la figura con sofisticación absoluta.', 'precio' => 45000, 'stock' => 3, 'material' => 'Satén Premium', 'destacado' => true, 'cat' => 'ropa', 'imagen' => 'ropa-6.png' ],
            [ 'nombre' => 'Camisa Lino Rayas Beige', 'desc' => 'Camisa de lino puro con patrón de rayas verticales en tonos arena y blanco. Ligera, transpirable y de corte relajado, es el epítome de la elegancia casual veraniega.', 'precio' => 16500, 'stock' => 15, 'material' => 'Lino 100%', 'destacado' => false, 'cat' => 'ropa', 'imagen' => 'ropa-7.png' ],
            [ 'nombre' => 'Pantalón Vaquero Blanco', 'desc' => 'Pantalón de corte recto y tiro alto en un inmaculado color blanco. Confeccionado en tejido premium con un toque de elasticidad para garantizar un ajuste perfecto y favorecedor.', 'precio' => 52000, 'stock' => 2, 'material' => 'Denim Premium', 'destacado' => true, 'cat' => 'ropa', 'imagen' => 'ropa-8.png' ],
            [ 'nombre' => 'Vestido Lencero Esmeralda', 'desc' => 'Sensual vestido lencero en tono verde esmeralda vibrante. Cuenta con un delicado escote fluido drapeado y una abertura lateral atrevida, ideal para deslumbrar en eventos nocturnos.', 'precio' => 21000, 'stock' => 9, 'material' => 'Satén de Seda', 'destacado' => false, 'cat' => 'ropa', 'imagen' => 'ropa-9.png' ],
            [ 'nombre' => 'Pantalón Sastre Negro', 'desc' => 'Pantalón de traje negro de corte inmaculado. Una pieza fundamental de sastrería con pinzas definidas y caída recta que aporta autoridad y elegancia a cualquier conjunto.', 'precio' => 31000, 'stock' => 6, 'material' => 'Lana Fría', 'destacado' => true, 'cat' => 'ropa', 'imagen' => 'ropa-10.png' ],
            [ 'nombre' => 'Conjunto Lino Terracota', 'desc' => 'Conjunto de dos piezas en lino orgánico color terracota. Compuesto por camisa de corte relajado y pantalón palazzo fluido. Confort transpirable y estética boho chic insuperable.', 'precio' => 17500, 'stock' => 14, 'material' => 'Lino Orgánico', 'destacado' => false, 'cat' => 'ropa', 'imagen' => 'ropa-11.png' ],
            [ 'nombre' => 'Vestido Romántico Bordado Suizo', 'desc' => 'Vestido midi confeccionado en algodón con delicado bordado suizo. Presenta mangas con sutiles volantes, escote en V y cintura fruncida que perfila una silueta romántica y estival.', 'precio' => 48000, 'stock' => 5, 'material' => 'Algodón Bordado', 'destacado' => true, 'cat' => 'ropa', 'imagen' => 'ropa-12.png' ],
            [ 'nombre' => 'Top Lencero Satén Champagne', 'desc' => 'Top lencero de tirantes finos en seda satinada color champagne. Su brillo perlado y caída fluida lo convierten en una pieza de fondo de armario esencial para cualquier look de noche.', 'precio' => 29500, 'stock' => 8, 'material' => 'Seda Satén', 'destacado' => false, 'cat' => 'ropa', 'imagen' => 'ropa-13.png' ],
            [ 'nombre' => 'Mono Seda Esmeralda', 'desc' => 'Espectacular mono largo en seda raso verde esmeralda. Su diseño fluido presenta cuello camisero, manga larga y perneras amplias que fluyen con absoluta elegancia a cada paso.', 'precio' => 65000, 'stock' => 2, 'material' => 'Seda Raso', 'destacado' => true, 'cat' => 'ropa', 'imagen' => 'ropa-14.png' ],
            [ 'nombre' => 'Vestido Cruzado Rojo Pasión', 'desc' => 'Vestido midi de corte cruzado con lazada a la cintura en un vibrante rojo pasión. Manga larga sutilmente abullonada y escote en V que estructuran una silueta clásicamente seductora.', 'precio' => 24000, 'stock' => 11, 'material' => 'Seda Crepé', 'destacado' => false, 'cat' => 'ropa', 'imagen' => 'ropa-15.png' ],
            [ 'nombre' => 'Blusa Satén Cuello Mao', 'desc' => 'Elegante blusa de manga larga confeccionada en seda satinada negra. Presenta un sofisticado escote en V con cuello mao y sutiles pliegues que aportan un movimiento fluido inigualable.', 'precio' => 38000, 'stock' => 6, 'material' => 'Seda Satén', 'destacado' => true, 'cat' => 'ropa', 'imagen' => 'ropa-16.png' ],
            [ 'nombre' => 'Blazer Sastre Blanco', 'desc' => 'Blazer blanca de corte sastre impecable. Confeccionada en mezcla de lino orgánico, cuenta con solapas estructuradas y cierre de un botón, siendo la definición del lujo minimalista.', 'precio' => 19000, 'stock' => 13, 'material' => 'Lino Orgánico', 'destacado' => false, 'cat' => 'ropa', 'imagen' => 'ropa-17.png' ],
            [ 'nombre' => 'Bermuda Sastre Azul Marino', 'desc' => 'Bermuda de vestir en azul marino profundo. Una pieza de auténtica alta costura que reinterpreta el estilo casual con líneas de sastrería pura y acabados hechos a mano.', 'precio' => 85000, 'stock' => 1, 'material' => 'Algodón Premium', 'destacado' => true, 'cat' => 'ropa', 'imagen' => 'ropa-18.png' ],

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

            // Assign standard sizes if category is ropa
            if ($data['cat'] === 'ropa') {
                $allSizes = ['XS', 'S', 'M', 'L', 'XL'];
                // Give each piece of clothing a random set of sizes to simulate stock
                // At least one size, at most all 5. Let's make some miss sizes to test the UI!
                $randomSizeCount = rand(2, 5); 
                shuffle($allSizes);
                $assignedSizes = array_slice($allSizes, 0, $randomSizeCount);
                // Sort them conventionally
                $sortIndex = ['XS'=>0, 'S'=>1, 'M'=>2, 'L'=>3, 'XL'=>4];
                usort($assignedSizes, fn($a, $b) => $sortIndex[$a] <=> $sortIndex[$b]);
                
                $product->setTallasDisponibles($assignedSizes);
            } else {
                // Accessories / Jewelry
                $product->setTallasDisponibles([]);
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