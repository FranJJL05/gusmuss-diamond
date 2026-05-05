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
}
