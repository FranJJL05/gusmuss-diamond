<?php

namespace App\Controller\Admin;

use App\Entity\Order;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\DateTimeField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;

class OrderCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Order::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            DateTimeField::new('fechaPedido', 'Fecha del Pedido'),
            ChoiceField::new('estado', 'Estado')->setChoices([
                'Pendiente'   => 'pendiente',
                'Procesando'  => 'procesando',
                'Enviado'     => 'enviado',
                'Entregado'   => 'entregado',
                'Cancelado'   => 'cancelado',
            ]),
            MoneyField::new('total', 'Total')->setCurrency('EUR'),
            AssociationField::new('user', 'Cliente'),
        ];
    }
}
