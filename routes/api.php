<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\CustomerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// product api 
//get
Route::get('products/all', [ProductController::class, 'getProduct'])->name('product.all');
//post
Route::post('/products/store', [ProductController::class, 'store'])->name('product.store');

//service api 
//get
Route::get('services/all', [ServiceController::class, 'getService'])->name('service.all');
//post
Route::post('/services/store', [ServiceController::class, 'store'])->name('service.store');

Route::get('/customer/all', ['uses' => 'CustomerController@getCustomerAll', 'as' => 'customer.getcustomerall']);

Route::post('/customer/store', [CustomerController::class, 'store'])->name('customer.store');




// Route::resource('customer', 'CustomerController');