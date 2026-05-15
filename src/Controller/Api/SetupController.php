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
        $html = "<div style='font-family: monospace; background: #111; color: #0f0; padding: 20px; border-radius: 5px; min-height: 100vh;'>";
        $html .= "<h1>Inicializando Servidor (Gusmuss Diamond)</h1>";

        try {
            // 1. Borrar schema existente
            $html .= "<br><b>[1/4] Borrando base de datos existente...</b><br>";
            $input1 = new ArrayInput(['command' => 'doctrine:schema:drop', '--force' => true]);
            $input1->setInteractive(false);
            $application->run($input1, $output);
            $html .= nl2br($output->fetch());

            // 2. Crear schema desde cero con TODAS las columnas actuales
            $html .= "<br><br><b>[2/4] Creando estructura de Base de Datos...</b><br>";
            $input2 = new ArrayInput(['command' => 'doctrine:schema:create']);
            $input2->setInteractive(false);
            $application->run($input2, $output);
            $html .= nl2br($output->fetch());

            // 3. Cargar Fixtures
            $html .= "<br><br><b>[3/4] Creando catálogo de productos y usuarios (Fixtures)...</b><br>";
            $input3 = new ArrayInput(['command' => 'doctrine:fixtures:load', '--no-interaction' => true, '--append' => false]);
            $input3->setInteractive(false);
            $application->run($input3, $output);
            $html .= nl2br($output->fetch());

            // 4. Generar JWT Keys
            $html .= "<br><br><b>[4/4] Generando claves de seguridad JWT...</b><br>";
            $input4 = new ArrayInput(['command' => 'lexik:jwt:generate-keypair', '--overwrite' => true]);
            $input4->setInteractive(false);
            $application->run($input4, $output);
            $html .= nl2br($output->fetch());

            $html .= "<br><br><h2 style='color: yellow;'>¡TODO LISTO!</h2><p>La base de datos se ha creado con todos los campos. Ya puedes cerrar esta ventana y entrar a tu dominio principal.</p></div>";

        } catch (\Exception $e) {
            $html .= "<br><br><b style='color: red;'>ERROR: " . htmlspecialchars($e->getMessage()) . "</b>";
            $html .= "<pre style='color: #f88;'>" . htmlspecialchars($e->getTraceAsString()) . "</pre></div>";
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
                // Ropa nueva (19 prendas con galería completa de 3 fotos)
                'ropa-0', 'ropa-1', 'ropa-2', 'ropa-3', 'ropa-4', 'ropa-5', 'ropa-6', 'ropa-7', 'ropa-8', 'ropa-9', 
                'ropa-10', 'ropa-11', 'ropa-12', 'ropa-13', 'ropa-14', 'ropa-15', 'ropa-16', 'ropa-17', 'ropa-18',
                // Accesorios nuevos (10 accesorios con galería completa de 3 fotos)
                'accesorio-0', 'accesorio-1', 'accesorio-2', 'accesorio-3', 'accesorio-4', 'accesorio-5', 'accesorio-6', 'accesorio-7', 'accesorio-8', 'accesorio-9'
            ];

            $count = 0;

            foreach ($products as $product) {
                $imagen = $product->getImagenFilename();
                if ($imagen) {
                    $baseName = pathinfo($imagen, PATHINFO_FILENAME);
                    $ext = pathinfo($imagen, PATHINFO_EXTENSION);
                    
                    if (in_array($baseName, $customImages)) {
                        if (str_starts_with($baseName, 'ropa-') || str_starts_with($baseName, 'accesorio-')) {
                            // La ropa y accesorios nuevos tienen 3 fotos (prenda, modelo, detalle)
                            $product->setImagenesExtra([
                                "{$baseName}-2.{$ext}",
                                "{$baseName}-3.{$ext}"
                            ]);
                        } else {
                            // Las joyas con IA solo tienen la foto -2 (la -3 era duplicado)
                            $product->setImagenesExtra([
                                "{$baseName}-2.{$ext}"
                            ]);
                        }
                        $count++;
                    } else {
                        // Para el resto de joyas antiguas sin foto IA, borramos la galería para evitar duplicados
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
