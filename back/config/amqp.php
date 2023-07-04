<?php

return [

    'use' => 'production',

    'properties' => [

        'production' => [
            'host'                => env('RABBITMQ_HOST', '127.0.0.1'),
            'port'                => env('RABBITMQ_PORT', 5672),
            'username'            => env('RABBITMQ_USER', 'guest'),
            'password'            => env('RABBITMQ_PASSWORD', 'guest'),
            'vhost'               => env('RABBITMQ_VHOST', '/'),
            'exchange'            => 'amq.topic',
            'exchange_type'       => 'topic',
            'consumer_tag'        => 'consumer',
            'ssl_options'         => [], // See https://secure.php.net/manual/en/context.ssl.php
            'connect_options'     => [], // See https://github.com/php-amqplib/php-amqplib/blob/master/PhpAmqpLib/Connection/AMQPSSLConnection.php
            'queue_properties'    => ['x-ha-policy' => ['S', 'all']],
            'exchange_properties' => [],
            'timeout'             => 0
        ],

    ],

];
