<?php

namespace App\Controller\Admin;

use EasyCorp\Bundle\EasyAdminBundle\Attribute\AdminDashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGeneratorInterface;
use Symfony\Component\HttpFoundation\Response;

#[AdminDashboard(routePath: '/admin', routeName: 'admin')]
class DashboardController extends AbstractDashboardController
{
    public function __construct(private AdminUrlGeneratorInterface $adminUrlGenerator)
    {
    }

    /**
     * Al entrar en /admin, redirigimos al listado de Productos.
     * parent::index() solo muestra una página de bienvenida sin menú,
     * por eso en EasyAdmin 5 lo sustituimos por un redirect al primer CRUD.
     */
    public function index(): Response
    {
        return $this->redirect(
            $this->adminUrlGenerator
                ->setController(ProductCrudController::class)
                ->generateUrl()
        );
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Gusmuss Diamond ✦ Admin');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');

        yield MenuItem::section('Catálogo');
        yield MenuItem::linkTo(ProductCrudController::class, 'Productos', 'fas fa-gem');
        yield MenuItem::linkTo(CategoryCrudController::class, 'Categorías', 'fas fa-tags');

        yield MenuItem::section('Pedidos');
        yield MenuItem::linkTo(OrderCrudController::class, 'Pedidos', 'fas fa-shopping-bag');

        yield MenuItem::section('Usuarios');
        yield MenuItem::linkTo(UserCrudController::class, 'Usuarios', 'fas fa-users');

        yield MenuItem::section('');
        yield MenuItem::linkToUrl('Ver Tienda', 'fas fa-store', '/');
        yield MenuItem::linkToLogout('Cerrar Sesión', 'fas fa-sign-out-alt');
    }
}
