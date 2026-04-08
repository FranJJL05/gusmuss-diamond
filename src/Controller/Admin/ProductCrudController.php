<?php

namespace App\Controller\Admin;

use App\Entity\Product;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\AssociationField;
use EasyCorp\Bundle\EasyAdminBundle\Field\IdField;
use EasyCorp\Bundle\EasyAdminBundle\Field\ImageField;
use EasyCorp\Bundle\EasyAdminBundle\Field\MoneyField;
use EasyCorp\Bundle\EasyAdminBundle\Field\NumberField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextareaField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class ProductCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return Product::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            IdField::new('id')->hideOnForm(),

            TextField::new('nombre', 'Nombre del Producto'),

            TextareaField::new('descripcion', 'Descripción')
                ->hideOnIndex(),

            MoneyField::new('precio', 'Precio')
                ->setCurrency('EUR'),

            NumberField::new('stock', 'Stock'),

            // ImageField gestiona automáticamente la subida del fichero al servidor
            // setBasePath: la ruta pública desde la que se sirve la imagen (URL)
            // setUploadDir: la ruta física donde se guarda en el servidor
            // setUploadedFileNamePattern: nombre único para evitar colisiones
            ImageField::new('imagenFilename', 'Imagen')
                ->setBasePath('/uploads/products')
                ->setUploadDir('public/uploads/products')
                ->setUploadedFileNamePattern('[slug]-[timestamp].[extension]')
                ->setRequired(false),

            AssociationField::new('category', 'Categoría'),
        ];
    }
}
