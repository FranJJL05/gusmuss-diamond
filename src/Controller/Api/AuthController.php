<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

/**
 * API de Autenticación para el frontend React.
 *
 * Endpoints:
 *   POST /api/auth/registro   → Crear cuenta nueva
 *   POST /api/auth/login      → Login con email/password (vía json_login del firewall)
 *   POST /api/auth/logout     → Cerrar sesión
 *   GET  /api/auth/me         → Datos del usuario autenticado actual
 */
#[Route('/api/auth', name: 'api_auth_')]
class AuthController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface      $em,
        private UserPasswordHasherInterface $hasher,
    ) {
    }

    /**
     * POST /api/auth/registro
     * Body JSON: { "email": "...", "password": "...", "nombre": "...", "apellidos": "..." }
     */
    #[Route('/registro', name: 'registro', methods: ['POST'])]
    public function registro(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        // Validación básica de campos obligatorios
        $required = ['email', 'password', 'nombre', 'apellidos'];
        foreach ($required as $field) {
            if (empty($data[$field])) {
                return $this->json(['error' => "El campo '{$field}' es obligatorio"], 400, $this->cors());
            }
        }

        // Email único
        if ($this->em->getRepository(User::class)->findOneBy(['email' => $data['email']])) {
            return $this->json(['error' => 'Ya existe una cuenta con ese email'], 409, $this->cors());
        }

        // Validación formato email
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            return $this->json(['error' => 'El email no tiene un formato válido'], 400, $this->cors());
        }

        // Contraseña mínimo 6 caracteres
        if (strlen($data['password']) < 6) {
            return $this->json(['error' => 'La contraseña debe tener al menos 6 caracteres'], 400, $this->cors());
        }

        $user = new User();
        $user->setEmail($data['email'])
             ->setNombre($data['nombre'])
             ->setApellidos($data['apellidos'])
             ->setRoles([])
             ->setIsVerified(false)
             ->setTelefono($data['telefono'] ?? null)
             ->setDireccion($data['direccion'] ?? null)
             ->setPassword($this->hasher->hashPassword($user, $data['password']));

        $this->em->persist($user);
        $this->em->flush();

        return $this->json([
            'mensaje' => 'Cuenta creada correctamente',
            'usuario' => $this->serializeUser($user),
        ], 201, $this->cors());
    }

    /**
     * GET /api/auth/me
     * Devuelve los datos del usuario autenticado en sesión.
     * Retorna 401 si no hay sesión activa.
     */
    #[Route('/me', name: 'me', methods: ['GET'])]
    public function me(#[CurrentUser] ?User $user): JsonResponse
    {
        if (!$user) {
            return $this->json(['error' => 'No autenticado'], 401, $this->cors());
        }

        return $this->json($this->serializeUser($user), 200, $this->cors());
    }

    /**
     * PUT /api/auth/perfil
     * Actualiza los datos del perfil del usuario autenticado.
     * Body JSON: { "nombre": "...", "apellidos": "...", "telefono": "...", "direccion": "..." }
     */
    #[Route('/perfil', name: 'perfil', methods: ['PUT'])]
    public function perfil(#[CurrentUser] ?User $user, Request $request): JsonResponse
    {
        if (!$user) {
            return $this->json(['error' => 'No autenticado'], 401, $this->cors());
        }

        $data = json_decode($request->getContent(), true);

        if (!empty($data['nombre']))    $user->setNombre($data['nombre']);
        if (!empty($data['apellidos'])) $user->setApellidos($data['apellidos']);
        if (isset($data['telefono']))   $user->setTelefono($data['telefono']);
        if (isset($data['direccion']))  $user->setDireccion($data['direccion']);

        $this->em->flush();

        return $this->json([
            'mensaje' => 'Perfil actualizado',
            'usuario' => $this->serializeUser($user),
        ], 200, $this->cors());
    }

    private function serializeUser(User $user): array
    {
        return [
            'id'        => $user->getId(),
            'email'     => $user->getEmail(),
            'nombre'    => $user->getNombre(),
            'apellidos' => $user->getApellidos(),
            'telefono'  => $user->getTelefono(),
            'direccion' => $user->getDireccion(),
            'roles'     => $user->getRoles(),
        ];
    }

    private function cors(): array
    {
        return [
            'Access-Control-Allow-Origin'  => '*',
            'Access-Control-Allow-Methods' => 'GET, POST, PUT, OPTIONS',
            'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
        ];
    }
}
