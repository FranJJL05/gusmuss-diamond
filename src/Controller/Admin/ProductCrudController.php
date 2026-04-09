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
            // El primer texto es la propiedad de tu entidad, el segundo es cómo se ve en la columna
            TextField::new('nombre', 'Nombre de la Prenda'), 
            AssociationField::new('category', 'Categoría'), // Este lo dejamos así porque vimos que funcionaba
            NumberField::new('precio', 'Precio'), 
            NumberField::new('stock', 'Unidades en Stock'),
            TextareaField::new('descripcion', 'Descripción'),
            
            ImageField::new('imagenFilename', 'Foto del Producto')
                ->setBasePath('uploads/images/products') 
                ->setUploadDir('public/uploads/images/products') 
                ->setUploadedFileNamePattern('[randomhash].[extension]') 
                ->setRequired(false), 
        ];
    }
}
