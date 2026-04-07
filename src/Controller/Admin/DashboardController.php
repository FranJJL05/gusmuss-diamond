<?php

namespace App\Controller\Admin;

use App\Entity\Category;
use App\Entity\Order;
use App\Entity\Product;
use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Attribute\AdminDashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use Symfony\Component\HttpFoundation\Response;

#[AdminDashboard(routePath: '/admin', routeName: 'admin')]
class DashboardController extends AbstractDashboardController
{
    public function index(): Response
    {
        // Redirigimos al listado de productos como página principal del panel
        return $this->redirectToRoute('admin', ['crudAction' => 'index', 'crudControllerFqcn' => ProductCrudController::class]);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('<img src="/images/logo.png" alt="Gusmuss Diamond"> Gusmuss Diamond')
            ->setFaviconPath('favicon.ico')
            ->setTranslationDomain('admin');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linkToDashboard('Dashboard', 'fa fa-home');

        yield MenuItem::section('Catálogo');
        yield MenuItem::linkToCrud('Productos', 'fas fa-gem', Product::class);
        yield MenuItem::linkToCrud('Categorías', 'fas fa-tags', Category::class);

        yield MenuItem::section('Pedidos');
        yield MenuItem::linkToCrud('Pedidos', 'fas fa-shopping-bag', Order::class);

        yield MenuItem::section('Usuarios');
        yield MenuItem::linkToCrud('Usuarios', 'fas fa-users', User::class);

        yield MenuItem::section('');
        yield MenuItem::linkToUrl('Ver Tienda', 'fas fa-store', '/');
        yield MenuItem::linkToLogout('Cerrar Sesión', 'fas fa-sign-out-alt');
    }
}
