FROM php:8.2-apache

# pdo y pdo_mysql usan librerías ya incluidas en la imagen base — no necesita apt-get
# Añadimos libpq-dev para pdo_pgsql ya que Render usa PostgreSQL
RUN apt-get update && apt-get install -y git unzip libzip-dev libpq-dev \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql zip

# Habilitar mod_rewrite para que Symfony enrute correctamente
RUN a2enmod rewrite

# Copiar Composer desde su imagen oficial
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Apuntar Apache al directorio /public de Symfony
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf \
    && sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

WORKDIR /var/www/html

# Copiar todo el proyecto al contenedor
COPY . /var/www/html/

# Instalar dependencias de Symfony (Quitamos --no-dev para que se instalen las Fixtures)
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN composer install --optimize-autoloader --no-scripts

# Dar permisos a la carpeta var, uploads y config para que Apache pueda crear los certificados JWT
RUN chown -R www-data:www-data /var/www/html/var /var/www/html/public/uploads /var/www/html/config || true
