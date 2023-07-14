<?php

namespace App\Http\Controllers;

use DB;
use Log;
use Illuminate\Http\Request;
use App\Models\Product;
use Amqp;
use Elasticsearch\ClientBuilder;
use Elasticsearch;

class ProductController extends Controller
{

    public function search(Request $request) {
        $query = $request->query('q');
        $products = [];

        try {
            $results = Elasticsearch::search([
                'index' => 'products',
                'body'  => [
                    'query' => [
                        'query_string' => [
                            'query' => '*' . $query . '*',
                            "fields" => ["name", "description"]
                        ]
                    ]
                ]
            ]);

            foreach ($results['hits']['hits'] as $product)
                $products[] = $product['_source'];
        } catch (\Exception $e) {
            Log::error($e);
            abort(500);
        }

        return response()->json($products);
    }

    public function create(Request $request) {
        $input = $request->validate([
            'name' => 'required|string|min:1|max:255',
            'description' => 'required|string|min:1',
            'image' => 'required|string|url',
        ]);

        try {
            $product = Product::create([
                'name' => $input['name'],
                'description' => $input['description'],
                'image' => $input['image'],
            ]);
        } catch (\Exception $e) {
            Log::error("Cannot create product");
            Log::error($e);
            abort(500);
        }

        $amqpBody = [
            'event_type' => 'create',
            'product' => $product,
        ];
        Amqp::publish('create', json_encode($amqpBody), ['exchange' => 'product.event']);

        return response()->json(['status' => 'ok', 'product' => $product]);
    }

    public function delete(Request $request, $id) {
        DB::table('products')->where('id', $id)->delete();

        $amqpBody = [
            'event_type' => 'create',
            'product_id' => $id,
        ];
        Amqp::publish('delete', json_encode($amqpBody), ['exchange' => 'product.event']);

        return response()->json('ok');
    }

}
