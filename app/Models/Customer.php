<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    // protected $primaryKey = "id";

    public $table = 'customers';

    public $timestamps = false;

    protected $fillable = ['fname', 'lname', 'address', 'town', 'city', 'phone', 'customer_image'];
}
