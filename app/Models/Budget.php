<?php

namespace App\Models;

use App\SearchableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Budget extends Model
{
    use HasFactory, SearchableTrait;

    protected $guarded = [];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function transactions() {
        return $this->hasMany(Transaction::class);
    }

    static public function search($params = []) {
        $query = self::query();

        $query->where('user_id', Auth::id());

        $query = self::process_keywords($query, data_get($params, 'keywords', ''), ['title']);

        $query->with('transactions');
        return $query->get();
    }
}
