FROM php:7.4.33-zts-alpine3.16

RUN apk add --no-cache \
    linux-headers \
    && docker-php-ext-install -j$(nproc) sockets pdo_mysql pdo_pgsql

WORKDIR /app

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install

EXPOSE 8080

CMD ["php", "artisan", "serve", "--port", "8080", "--host", "0.0.0.0"]
