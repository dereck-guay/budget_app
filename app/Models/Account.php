<?php

namespace App\Models;

use App\SearchableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Account extends Model
{
    use HasFactory, SearchableTrait;

    protected $guarded = [];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function enteringTransactions() {
        return $this->hasMany(Transaction::class, 'id', 'to_account_id');
    }

    public function leavingTransactions() {
        return $this->hasMany(Transaction::class, 'id', 'from_account_id');
    }

    static public function search($params = []) {
        $query = self::query();
        $query->where('user_id', Auth::id());

        return $query->get();
    }
}
