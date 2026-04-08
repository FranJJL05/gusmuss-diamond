FROM php:8.2-apache

# pdo y pdo_mysql usan librerías ya incluidas en la imagen base — no necesita apt-get
RUN docker-php-ext-install pdo pdo_mysql

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
