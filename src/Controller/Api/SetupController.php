<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Console\Application;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Output\BufferedOutput;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Routing\Attribute\Route;

class SetupController extends AbstractController
{
    /**
     * Endpoint temporal para inicializar la base de datos en servidores como Render
     * donde no hay acceso a la consola/shell.
     */
    #[Route('/api/dev/setup', name: 'api_dev_setup', methods: ['GET'])]
    public function setup(KernelInterface $kernel): Response
    {
        $application = new Application($kernel);
        $application->setAutoExit(false);

        $output = new BufferedOutput();
        $html = "<div style='font-family: monospace; background: #111; color: #0f0; padding: 20px; border-radius: 5px; height: 100vh;'>";
        $html .= "<h1>Inicializando Servidor (Gusmuss Diamond)</h1>";

        try {
            // 1. Crear Schema / Migrar
            $html .= "<br><b>[1/3] Actualizando estructura de Base de Datos...</b><br>";
            $input1 = new ArrayInput(['command' => 'doctrine:schema:update', '--force' => true]);
            $application->run($input1, $output);
            $html .= nl2br($output->fetch());

            // 2. Cargar Fixtures
            $html .= "<br><br><b>[2/3] Creando catálogo de productos y usuarios (Fixtures)...</b><br>";
            $input2 = new ArrayInput(['command' => 'doctrine:fixtures:load', '--no-interaction' => true]);
            $application->run($input2, $output);
            $html .= nl2br($output->fetch());

            // 3. Generar JWT Keys si no existen
            $html .= "<br><br><b>[3/3] Comprobando claves de seguridad JWT...</b><br>";
            $input3 = new ArrayInput(['command' => 'lexik:jwt:generate-keypair', '--skip-if-exists' => true]);
            $application->run($input3, $output);
            $html .= nl2br($output->fetch());

            $html .= "<br><br><h2 style='color: yellow;'>¡TODO LISTO!</h2><p>La base de datos se ha creado. Ya puedes cerrar esta ventana y entrar a tu dominio principal.</p></div>";

        } catch (\Exception $e) {
            $html .= "<br><br><b style='color: red;'>ERROR: " . $e->getMessage() . "</b></div>";
        }

        return new Response($html);
    }

    #[Route('/api/dev/update-galleries', name: 'api_dev_update_galleries', methods: ['GET'])]
    public function updateGalleries(\Doctrine\ORM\EntityManagerInterface $em, \App\Repository\ProductRepository $productRepo): Response
    {
        try {
            $products = $productRepo->findAll();
            
            // Solo estos 11 productos tienen una imagen generada por IA única.
            // Para el resto, no mostraremos galería (evitando duplicados).
            $customImages = [
                'anillo-solitario-diamante-05ct',
                'anillo-diamante-solitario-1ct',
                'anillo-rubi-birmano-diamantes',
                'colgante-diamante-corazon',
                'collar-riviere-diamantes',
                'pulsera-tennis-diamantes-3ct',
                'pendientes-solitario-diamante-03ct',
                'pendientes-zafiro-diamantes',
                'vestido-noche-seda',
                'vestido-coctel-dorado',
                'falda-midi-plisada'
            ];

            $count = 0;

            foreach ($products as $product) {
                $imagen = $product->getImagenFilename();
                if ($imagen) {
                    $baseName = pathinfo($imagen, PATHINFO_FILENAME);
                    $ext = pathinfo($imagen, PATHINFO_EXTENSION);
                    
                    if (in_array($baseName, $customImages)) {
                        // Solo añadimos la imagen secundaria -2.jpg, la -3.jpg era un duplicado
                        $product->setImagenesExtra([
                            "{$baseName}-2.{$ext}"
                        ]);
                        $count++;
                    } else {
                        // Para el resto, borramos la galería para que no haya fotos repetidas
                        $product->setImagenesExtra([]);
                    }
                }
            }

            $em->flush();

            return new Response("<div style='font-family: monospace; background: #111; color: #0f0; padding: 20px; border-radius: 5px; height: 100vh;'><h1>Galerías Limpias</h1><p>Se han eliminado las fotos duplicadas y se han configurado $count productos con fotos secundarias a medida.</p><p>Ya puedes volver a la página web.</p></div>");
        } catch (\Throwable $e) {
            return new Response("<div style='font-family: monospace; background: #111; color: red; padding: 20px;'><h1>Error 500</h1><pre>" . $e->getMessage() . "\n\n" . $e->getTraceAsString() . "</pre></div>");
        }
    }
}
