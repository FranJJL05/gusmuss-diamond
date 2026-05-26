<?php

namespace App\Controller\Api;

use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[Route('/api/chat', name: 'api_chat_')]
class AiAgentController extends AbstractController
{
    public function __construct(
        private ProductRepository $productRepository,
        private HttpClientInterface $httpClient
    ) {
    }

    #[Route('', name: 'send', methods: ['POST', 'OPTIONS'])]
    public function chat(Request $request): JsonResponse
    {
        // Soporte para pre-flight CORS
        if ($request->getMethod() === 'OPTIONS') {
            return new JsonResponse(null, 204, $this->corsHeaders());
        }

        $data = json_decode($request->getContent(), true);
        $userMessage = $data['message'] ?? '';
        $history = $data['history'] ?? [];

        if (empty($userMessage)) {
            return $this->json(['error' => 'El mensaje no puede estar vacío'], 400, $this->corsHeaders());
        }

        $apiKey = $_ENV['GEMINI_API_KEY'] ?? getenv('GEMINI_API_KEY') ?: '';

        // Si la clave no está configurada, proporcionar un modo de simulación amigable para pruebas locales
        if (empty($apiKey) || $apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
            return $this->json([
                'response' => "🤖 [Gusmuss AI - MODO SIMULACIÓN]\n¡Hola! Veo que estás probando el asistente inteligente localmente. Para habilitar las respuestas reales con IA, por favor introduce una clave de API válida en el archivo `.env` configurando `GEMINI_API_KEY=tu_clave`.\n\nComo simulación amigable, puedo decirte que en nuestra tienda tenemos piezas exclusivas como el **Anillo Solitario de Diamante 0.5ct** o el **Collar Riviere de Diamantes**. ¿Te gustaría saber más sobre ellos?",
                'warning' => 'La API Key de Gemini no está configurada en el archivo .env.'
            ], 200, $this->corsHeaders());
        }

        // 1. Obtener catálogo y construir el System Prompt
        $products = $this->productRepository->findAll();
        $catalogText = "";
        foreach ($products as $p) {
            $precio = number_format($p->getPrecio() / 100, 2, ',', '.') . ' €';
            $categoryName = $p->getCategory() ? $p->getCategory()->getNombre() : 'General';
            $catalogText .= "- **{$p->getNombre()}**\n";
            $catalogText .= "  Categoría: {$categoryName}\n";
            $catalogText .= "  Material: {$p->getMaterial()}\n";
            $catalogText .= "  Precio: {$precio}\n";
            $catalogText .= "  Stock: {$p->getStock()} unidades\n";
            $catalogText .= "  Enlace de producto: `/producto/{$p->getSlug()}`\n";
            $catalogText .= "  Descripción corta: " . substr($p->getDescripcion(), 0, 150) . "...\n\n";
        }

        $systemPrompt = "Eres un asistente virtual elegante, exclusivo y experto en alta joyería de 'Gusmuss Diamond'.\n";
        $systemPrompt .= "Tu objetivo es guiar, asesorar y vender joyas exclusivas, ropa de lujo y accesorios a los clientes.\n\n";
        $systemPrompt .= "Directrices de comportamiento:\n";
        $systemPrompt .= "1. Sé extremadamente educado, distinguido y usa un tono profesional y acogedor. Háblale en el idioma en que te escriba (español por defecto).\n";
        $systemPrompt .= "2. Recomienda productos basados en el presupuesto del usuario o la ocasión (ej. bodas, aniversarios, regalos).\n";
        $systemPrompt .= "3. Cuando hables o recomiendes un producto de nuestro catálogo, proporciona SIEMPRE su precio, material, stock e incluye su enlace interno utilizando markdown de la siguiente manera: `[Ver producto](/producto/slug-del-producto)`.\n";
        $systemPrompt .= "4. Si el cliente pregunta por la disponibilidad de tallas, menciónale que disponemos de tallas seleccionables en la página del producto.\n";
        $systemPrompt .= "5. No inventes productos que no estén en el catálogo. Si no tenemos lo que busca (por ejemplo, si pide un reloj de oro y no hay en el catálogo), confiésalo amablemente y sugiérele la alternativa más cercana (como una pulsera de diamantes).\n\n";
        $systemPrompt .= "Este es el catálogo oficial de Gusmuss Diamond actualizado en tiempo real:\n\n";
        $systemPrompt .= $catalogText;

        // 2. Estructurar el cuerpo para la API de Gemini (1.5 Flash)
        // Convertimos el historial al formato de Gemini
        $contents = [];
        foreach ($history as $msg) {
            $role = ($msg['sender'] === 'user') ? 'user' : 'model';
            $contents[] = [
                'role' => $role,
                'parts' => [
                    ['text' => $msg['text']]
                ]
            ];
        }

        // Añadir el mensaje actual
        $contents[] = [
            'role' => 'user',
            'parts' => [
                ['text' => $userMessage]
            ]
        ];

        $requestBody = [
            'contents' => $contents,
            'systemInstruction' => [
                'parts' => [
                    ['text' => $systemPrompt]
                ]
            ]
        ];

        try {
            $url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" . $apiKey;
            
            $response = $this->httpClient->request('POST', $url, [
                'json' => $requestBody,
                'headers' => [
                    'Content-Type' => 'application/json'
                ]
            ]);

            $statusCode = $response->getStatusCode();
            if ($statusCode !== 200) {
                return $this->json([
                    'error' => 'Error de comunicación con la API de IA',
                    'details' => $response->getContent(false)
                ], $statusCode, $this->corsHeaders());
            }

            $result = $response->toArray();
            $replyText = $result['candidates'][0]['content']['parts'][0]['text'] ?? 'Disculpa, no he podido procesar tu solicitud.';

            return $this->json([
                'response' => $replyText
            ], 200, $this->corsHeaders());

        } catch (\Exception $e) {
            return $this->json([
                'error' => 'Ocurrió un error inesperado al procesar la respuesta',
                'details' => $e->getMessage()
            ], 500, $this->corsHeaders());
        }
    }

    private function corsHeaders(): array
    {
        return [
            'Access-Control-Allow-Origin'  => '*',
            'Access-Control-Allow-Methods' => 'POST, OPTIONS',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
        ];
    }
}
