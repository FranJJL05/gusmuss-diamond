<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260418084619 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE category ADD slug VARCHAR(100) DEFAULT NULL, ADD descripcion LONGTEXT DEFAULT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_64C19C1989D9B62 ON category (slug)');
        $this->addSql('ALTER TABLE product ADD slug VARCHAR(255) DEFAULT NULL, ADD material VARCHAR(100) DEFAULT NULL, ADD destacado TINYINT(1) NOT NULL DEFAULT 0, ADD created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, CHANGE descripcion descripcion LONGTEXT DEFAULT NULL, CHANGE precio precio INT NOT NULL DEFAULT 0');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_D34A04AD989D9B62 ON product (slug)');
        $this->addSql('ALTER TABLE user ADD telefono VARCHAR(20) DEFAULT NULL, ADD direccion VARCHAR(500) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP INDEX UNIQ_64C19C1989D9B62 ON category');
        $this->addSql('ALTER TABLE category DROP slug, DROP descripcion');
        $this->addSql('DROP INDEX UNIQ_D34A04AD989D9B62 ON product');
        $this->addSql('ALTER TABLE product DROP slug, DROP material, DROP destacado, DROP created_at, CHANGE descripcion descripcion LONGTEXT NOT NULL, CHANGE precio precio DOUBLE PRECISION NOT NULL');
        $this->addSql('ALTER TABLE user DROP telefono, DROP direccion');
    }
}
