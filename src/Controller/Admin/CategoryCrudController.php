<?php

namespace App\Controller\Admin;

use App\Entity\Category;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class CategoryCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Category::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),
            TextField::new('nombre', 'Nombre'),
            TextField::new('slug', 'Slug (URL)')
                ->setHelp('ej: anillos-de-compromiso. Se usará en las URLs de la tienda.'),
            TextareaField::new('descripcion', 'Descripción')
                ->hideOnIndex()
                ->setHelp('Texto que aparece en la página de listado de la categoría.'),
        ];
    }
}
