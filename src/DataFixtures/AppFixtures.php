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

            // --- ROPA ---
            [ 'nombre' => 'Vestido de Noche Azul Marino', 'nombreEn' => 'Navy Blue Evening Dress', 'desc' => 'Elegante vestido de noche fluido en tono azul marino profundo. Su silueta sofisticada y caída impecable lo convierten en la elección perfecta para eventos de gala.', 'descEn' => 'Elegant flowing evening dress in deep navy blue. Its sophisticated silhouette and impeccable drape make it the perfect choice for gala events.', 'precio' => 24000, 'stock' => 5, 'material' => 'Seda Natural', 'destacado' => true, 'cat' => 'ropa', 'imagen' => 'ropa-0.png' ],
            [ 'nombre' => 'Vestido Largo Encaje Blanco', 'nombreEn' => 'White Lace Long Dress', 'desc' => 'Romántico vestido largo confeccionado en encaje blanco con detalles calados. Presenta un escote en V profundo y falda escalonada que aporta movimiento y ligereza.', 'descEn' => 'Romantic long dress made of white lace with cutwork details. Features a deep V-neckline and tiered skirt that adds movement and lightness.', 'precio' => 18000, 'stock' => 10, 'material' => 'Encaje y Algodón', 'destacado' => false, 'cat' => 'ropa', 'imagen' => 'ropa-1.png' ],
            [ 'nombre' => 'Camiseta Blanca Estampado Acuarela', 'nombreEn' => 'White Watercolour Print T-Shirt', 'desc' => 'Camiseta de algodón premium en color blanco puro, destacando un delicado estampado estilo acuarela oriental con un árbol y aves. Arte y moda en una prenda casual de lujo.', 'descEn' => 'Premium cotton t-shirt in pure white, featuring a delicate oriental watercolour-style print with a tree and birds. Art and fashion in a luxury casual piece.', 'precio' => 22000, 'stock' => 8, 'material' => 'Algodón Premium', 'destacado' => true, 'cat' => 'ropa', 'imagen' => 'ropa-2.png' ],
            [ 'nombre' => 'Pantalón Ancho Sastre Beige', 'nombreEn' => 'Beige Wide-Leg Tailored Trousers', 'desc' => 'Pantalón de traje de pierna ancha en tono arena. Con pinzas frontales marcadas y cintura alta, redefine la sastrería moderna combinando comodidad absoluta y sofisticación.', 'descEn' => 'Wide-leg suit trousers in sand tone. With defined front pleats and a high waist, they redefine modern tailoring combining absolute comfort and sophistication.', 'precio' => 19500, 'stock' => 12, 'material' => 'Mezcla de Lino', 'destacado' => false, 'cat' => 'ropa', 'imagen' => 'ropa-3.png' ],
            [ 'nombre' => 'Conjunto Punto Canalé Beige', 'nombreEn' => 'Beige Ribbed Knit Set', 'desc' => 'Exclusivo conjunto de dos piezas en punto de canalé color crema. Compuesto por un top de manga corta y cuello redondo junto a una falda midi ajustada que realza la silueta.', 'descEn' => 'Exclusive two-piece set in cream ribbed knit. Comprised of a short-sleeve round-neck top and a fitted midi skirt that enhances the silhouette.', 'precio' => 35000, 'stock' => 4, 'material' => 'Punto de Lana', 'destacado' => true, 'cat' => 'ropa', 'imagen' => 'ropa-4.png' ],
            [ 'nombre' => 'Vestido Cruzado Floral Seda', 'nombreEn' => 'Floral Silk Wrap Dress', 'desc' => 'Vestido midi cruzado estilo wrap en seda satinada. Su exquisito estampado floral sobre fondo crema y detalle de volante asimétrico evocan una elegancia primaveral irresistible.', 'descEn' => 'Wrap-style midi dress in satin silk. Its exquisite floral print on a cream background and asymmetric ruffle detail evoke an irresistible spring elegance.', 'precio' => 28000, 'stock' => 7, 'material' => 'Seda Satén', 'destacado' => false, 'cat' => 'ropa', 'imagen' => 'ropa-5.png' ],
            [ 'nombre' => 'Vestido Asimétrico Satén Negro', 'nombreEn' => 'Black Satin Asymmetric Dress', 'desc' => 'Impactante vestido de noche asimétrico confeccionado en satén negro de alto brillo. Presenta un solo hombro y un elegante drapeado lateral que esculpe la figura con sofisticación absoluta.', 'descEn' => 'Striking asymmetric evening dress crafted in high-gloss black satin. Features one shoulder and an elegant side drape that sculpts the figure with absolute sophistication.', 'precio' => 45000, 'stock' => 3, 'material' => 'Satén Premium', 'destacado' => true, 'cat' => 'ropa', 'imagen' => 'ropa-6.png' ],
            [ 'nombre' => 'Camisa Lino Rayas Beige', 'nombreEn' => 'Beige Striped Linen Shirt', 'desc' => 'Camisa de lino puro con patrón de rayas verticales en tonos arena y blanco. Ligera, transpirable y de corte relajado, es el epítome de la elegancia casual veraniega.', 'descEn' => 'Pure linen shirt with vertical stripe pattern in sand and white tones. Light, breathable and relaxed cut, it is the epitome of summer casual elegance.', 'precio' => 16500, 'stock' => 15, 'material' => 'Lino 100%', 'destacado' => false, 'cat' => 'ropa', 'imagen' => 'ropa-7.png' ],
            [ 'nombre' => 'Pantalón Vaquero Blanco', 'nombreEn' => 'White Denim Trousers', 'desc' => 'Pantalón de corte recto y tiro alto en un inmaculado color blanco. Confeccionado en tejido premium con un toque de elasticidad para garantizar un ajuste perfecto y favorecedor.', 'descEn' => 'Straight-cut high-waisted trousers in immaculate white. Made from premium fabric with a touch of elasticity to guarantee a perfect, flattering fit.', 'precio' => 52000, 'stock' => 2, 'material' => 'Denim Premium', 'destacado' => true, 'cat' => 'ropa', 'imagen' => 'ropa-8.png' ],
            [ 'nombre' => 'Vestido Lencero Esmeralda', 'nombreEn' => 'Emerald Slip Dress', 'desc' => 'Sensual vestido lencero en tono verde esmeralda vibrante. Cuenta con un delicado escote fluido drapeado y una abertura lateral atrevida, ideal para deslumbrar en eventos nocturnos.', 'descEn' => 'Sensual slip dress in vibrant emerald green. Features a delicate draped neckline and a bold side slit, ideal for dazzling at evening events.', 'precio' => 21000, 'stock' => 9, 'material' => 'Satén de Seda', 'destacado' => false, 'cat' => 'ropa', 'imagen' => 'ropa-9.png' ],
            [ 'nombre' => 'Pantalón Sastre Negro', 'nombreEn' => 'Black Tailored Trousers', 'desc' => 'Pantalón de traje negro de corte inmaculado. Una pieza fundamental de sastrería con pinzas definidas y caída recta que aporta autoridad y elegancia a cualquier conjunto.', 'descEn' => 'Black suit trousers with an impeccable cut. A fundamental tailoring piece with defined pleats and a straight fall that adds authority and elegance to any outfit.', 'precio' => 31000, 'stock' => 6, 'material' => 'Lana Fría', 'destacado' => true, 'cat' => 'ropa', 'imagen' => 'ropa-10.png' ],
            [ 'nombre' => 'Conjunto Lino Terracota', 'nombreEn' => 'Terracotta Linen Set', 'desc' => 'Conjunto de dos piezas en lino orgánico color terracota. Compuesto por camisa de corte relajado y pantalón palazzo fluido. Confort transpirable y estética boho chic insuperable.', 'descEn' => 'Two-piece set in organic terracotta linen. Comprised of a relaxed-fit shirt and flowing palazzo trousers. Breathable comfort and unbeatable boho chic aesthetic.', 'precio' => 17500, 'stock' => 14, 'material' => 'Lino Orgánico', 'destacado' => false, 'cat' => 'ropa', 'imagen' => 'ropa-11.png' ],
            [ 'nombre' => 'Vestido Romántico Bordado Suizo', 'nombreEn' => 'Romantic Swiss Embroidered Dress', 'desc' => 'Vestido midi confeccionado en algodón con delicado bordado suizo. Presenta mangas con sutiles volantes, escote en V y cintura fruncida que perfila una silueta romántica y estival.', 'descEn' => 'Midi dress crafted in cotton with delicate Swiss embroidery. Features sleeves with subtle ruffles, a V-neckline and gathered waist that outlines a romantic, summery silhouette.', 'precio' => 48000, 'stock' => 5, 'material' => 'Algodón Bordado', 'destacado' => true, 'cat' => 'ropa', 'imagen' => 'ropa-12.png' ],
            [ 'nombre' => 'Top Lencero Satén Champagne', 'nombreEn' => 'Champagne Satin Slip Top', 'desc' => 'Top lencero de tirantes finos en seda satinada color champagne. Su brillo perlado y caída fluida lo convierten en una pieza de fondo de armario esencial para cualquier look de noche.', 'descEn' => 'Thin-strap slip top in champagne satin silk. Its pearlescent shimmer and fluid drape make it an essential wardrobe staple for any evening look.', 'precio' => 29500, 'stock' => 8, 'material' => 'Seda Satén', 'destacado' => false, 'cat' => 'ropa', 'imagen' => 'ropa-13.png' ],
            [ 'nombre' => 'Mono Seda Esmeralda', 'nombreEn' => 'Emerald Silk Jumpsuit', 'desc' => 'Espectacular mono largo en seda raso verde esmeralda. Su diseño fluido presenta cuello camisero, manga larga y perneras amplias que fluyen con absoluta elegancia a cada paso.', 'descEn' => 'Spectacular long jumpsuit in emerald green silk satin. Its fluid design features a shirt collar, long sleeves and wide legs that flow with absolute elegance at every step.', 'precio' => 65000, 'stock' => 2, 'material' => 'Seda Raso', 'destacado' => true, 'cat' => 'ropa', 'imagen' => 'ropa-14.png' ],
            [ 'nombre' => 'Vestido Cruzado Rojo Pasión', 'nombreEn' => 'Passion Red Wrap Dress', 'desc' => 'Vestido midi de corte cruzado con lazada a la cintura en un vibrante rojo pasión. Manga larga sutilmente abullonada y escote en V que estructuran una silueta clásicamente seductora.', 'descEn' => 'Midi wrap dress with waist tie in vibrant passion red. Subtly puffed long sleeve and V-neckline that structure a classically seductive silhouette.', 'precio' => 24000, 'stock' => 11, 'material' => 'Seda Crepé', 'destacado' => false, 'cat' => 'ropa', 'imagen' => 'ropa-15.png' ],
            [ 'nombre' => 'Blusa Satén Cuello Mao', 'nombreEn' => 'Mao Collar Satin Blouse', 'desc' => 'Elegante blusa de manga larga confeccionada en seda satinada negra. Presenta un sofisticado escote en V con cuello mao y sutiles pliegues que aportan un movimiento fluido inigualable.', 'descEn' => 'Elegant long-sleeve blouse crafted in black satin silk. Features a sophisticated V-neckline with Mao collar and subtle pleats that provide unmatched fluid movement.', 'precio' => 38000, 'stock' => 6, 'material' => 'Seda Satén', 'destacado' => true, 'cat' => 'ropa', 'imagen' => 'ropa-16.png' ],
            [ 'nombre' => 'Blazer Sastre Blanco', 'nombreEn' => 'White Tailored Blazer', 'desc' => 'Blazer blanca de corte sastre impecable. Confeccionada en mezcla de lino orgánico, cuenta con solapas estructuradas y cierre de un botón, siendo la definición del lujo minimalista.', 'descEn' => 'White blazer with impeccable tailored cut. Crafted in organic linen blend with structured lapels and single-button closure, it is the definition of minimalist luxury.', 'precio' => 19000, 'stock' => 13, 'material' => 'Lino Orgánico', 'destacado' => false, 'cat' => 'ropa', 'imagen' => 'ropa-17.png' ],
            [ 'nombre' => 'Bermuda Sastre Azul Marino', 'nombreEn' => 'Navy Blue Tailored Shorts', 'desc' => 'Bermuda de vestir en azul marino profundo. Una pieza de auténtica alta costura que reinterpreta el estilo casual con líneas de sastrería pura y acabados hechos a mano.', 'descEn' => 'Dress shorts in deep navy blue. A piece of authentic haute couture that reinterprets casual style with pure tailoring lines and handmade finishes.', 'precio' => 85000, 'stock' => 1, 'material' => 'Algodón Premium', 'destacado' => true, 'cat' => 'ropa', 'imagen' => 'ropa-18.png' ],

            // --- ACCESORIOS ---
            [ 'nombre' => 'Sombrero Fedora Camel', 'nombreEn' => 'Camel Fedora Hat', 'desc' => 'Elegante sombrero de ala ancha en tono camel. Confeccionado en fieltro de lana premium, es el accesorio definitivo para aportar un toque sofisticado a cualquier look de temporada.', 'descEn' => 'Elegant wide-brim hat in camel tone. Crafted in premium wool felt, it is the ultimate accessory to add a sophisticated touch to any seasonal look.', 'precio' => 8500, 'stock' => 5, 'material' => 'Fieltro de Lana', 'destacado' => true, 'cat' => 'accesorios', 'imagen' => 'accesorio-0.png' ],
            [ 'nombre' => 'Sombrero Fedora Negro', 'nombreEn' => 'Black Fedora Hat', 'desc' => 'Clásico sombrero fedora en color negro profundo. Su diseño atemporal de ala ancha y copa estructurada lo convierte en una pieza de elegancia atemporal.', 'descEn' => 'Classic fedora hat in deep black. Its timeless wide-brim and structured crown design make it a piece of timeless elegance.', 'precio' => 8500, 'stock' => 10, 'material' => 'Fieltro de Lana', 'destacado' => false, 'cat' => 'accesorios', 'imagen' => 'accesorio-1.png' ],
            [ 'nombre' => 'Sombrero Canotier Rústico', 'nombreEn' => 'Rustic Boater Hat', 'desc' => 'Sombrero estilo canotier confeccionado en paja natural trenzada con distintiva cinta negra. Ligero y con personalidad, ideal para protegerte del sol con auténtica estética parisina.', 'descEn' => 'Boater-style hat crafted in natural braided straw with a distinctive black ribbon. Light and characterful, ideal for sun protection with authentic Parisian aesthetics.', 'precio' => 6500, 'stock' => 8, 'material' => 'Paja Natural', 'destacado' => true, 'cat' => 'accesorios', 'imagen' => 'accesorio-2.png' ],
            [ 'nombre' => 'Sombrero Panamá Clásico', 'nombreEn' => 'Classic Panama Hat', 'desc' => 'Auténtico sombrero panamá de ala media trenzado a mano. Su distintiva cinta negra y color crudo lo hacen el acompañante perfecto para escapadas estivales de lujo.', 'descEn' => 'Authentic medium-brim panama hat hand-woven. Its distinctive black ribbon and natural colour make it the perfect companion for luxury summer getaways.', 'precio' => 12000, 'stock' => 12, 'material' => 'Paja Toquilla', 'destacado' => false, 'cat' => 'accesorios', 'imagen' => 'accesorio-3.png' ],
            [ 'nombre' => 'Sombrero Fedora Gris Ceniza', 'nombreEn' => 'Ash Grey Fedora Hat', 'desc' => 'Sombrero fedora de ala corta en tono gris ceniza con cinta en contraste. Confeccionado en lana de alta densidad, ofrece un estilo urbano, contemporáneo y muy versátil.', 'descEn' => 'Short-brim fedora in ash grey with contrast ribbon. Crafted in high-density wool, it offers an urban, contemporary and very versatile style.', 'precio' => 7500, 'stock' => 4, 'material' => 'Lana Premium', 'destacado' => true, 'cat' => 'accesorios', 'imagen' => 'accesorio-4.png' ],
            [ 'nombre' => 'Colgante Disco Oro 18k', 'nombreEn' => '18k Gold Disc Pendant', 'desc' => 'Elegante collar de cadena fina en oro amarillo de 18k, adornado con un delicado colgante circular liso. Un diseño minimalista perfecto para el uso diario o para combinar a capas.', 'descEn' => 'Elegant fine chain necklace in 18k yellow gold, adorned with a delicate smooth circular pendant. A minimalist design perfect for daily use or layering.', 'precio' => 32000, 'stock' => 7, 'material' => 'Oro Amarillo 18k', 'destacado' => false, 'cat' => 'accesorios', 'imagen' => 'accesorio-5.png' ],
            [ 'nombre' => 'Anillo Promesa Diamante', 'nombreEn' => 'Diamond Promise Ring', 'desc' => 'Anillo solitario entrelazado en oro amarillo brillante con un exquisito diamante central de talla brillante. Su diseño fluido simboliza la elegancia sutil y el amor eterno.', 'descEn' => 'Interlaced solitaire ring in brilliant yellow gold with an exquisite round-cut central diamond. Its fluid design symbolises subtle elegance and eternal love.', 'precio' => 145000, 'stock' => 3, 'material' => 'Oro 18k y Diamante', 'destacado' => true, 'cat' => 'accesorios', 'imagen' => 'accesorio-6.png' ],
            [ 'nombre' => 'Pendientes Aro Chunky', 'nombreEn' => 'Chunky Hoop Earrings', 'desc' => 'Pendientes de aro grueso tubular en oro amarillo de 18 quilates. Un básico rotundo y sofisticado que enmarca el rostro con un destello cálido inconfundible.', 'descEn' => 'Chunky tubular hoop earrings in 18-carat yellow gold. A bold and sophisticated staple that frames the face with an unmistakable warm gleam.', 'precio' => 45000, 'stock' => 15, 'material' => 'Oro Amarillo 18k', 'destacado' => false, 'cat' => 'accesorios', 'imagen' => 'accesorio-7.png' ],
            [ 'nombre' => 'Pulsera Cadena Minimalista', 'nombreEn' => 'Minimalist Chain Bracelet', 'desc' => 'Pulsera ultrafina de eslabones en oro de 18k con un sutil detalle de esfera central. Delicadeza absoluta para adornar la muñeca con elegancia silenciosa y refinada.', 'descEn' => 'Ultra-thin link bracelet in 18k gold with a subtle central sphere detail. Absolute delicacy to adorn the wrist with silent, refined elegance.', 'precio' => 18000, 'stock' => 12, 'material' => 'Oro Amarillo 18k', 'destacado' => true, 'cat' => 'accesorios', 'imagen' => 'accesorio-8.png' ],
            [ 'nombre' => 'Alianza Banda Platino', 'nombreEn' => 'Platinum Band Alliance', 'desc' => 'Alianza de diseño arquitectónico en platino cepillado con un elegante surco central. Representa la joyería contemporánea en su forma más pura, noble y resistente.', 'descEn' => 'Architecturally designed alliance in brushed platinum with an elegant central groove. It represents contemporary jewellery in its purest, noblest and most durable form.', 'precio' => 185000, 'stock' => 4, 'material' => 'Platino 950', 'destacado' => false, 'cat' => 'accesorios', 'imagen' => 'accesorio-9.png' ],
        ];

        foreach ($productos as $data) {
            $product = new Product();
            $product->setNombre($data['nombre'])
                    ->setNombreEn($data['nombreEn'] ?? null)
                    ->setDescripcion($data['desc'])
                    ->setDescripcionEn($data['descEn'] ?? null)
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