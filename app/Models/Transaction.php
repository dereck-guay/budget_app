<?php

namespace App\Models;

use App\SearchableTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Transaction extends Model
{
    use HasFactory, SearchableTrait;

    protected $guarded = [];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function budget() {
        return $this->belongsTo(Budget::class);
    }

    public static function search($params = []) {
        $query = self::query()->select('transactions.*');
        
        $query->where('transactions.user_id', Auth::id());
        $query->join('budgets', 'budgets.id', '=', 'transactions.budget_id');

        $query = self::process_keywords($query, data_get($params, 'keywords', ''), ['transactions.title', 'budgets.title']);

        $query->with('budget');
        return $query->orderBy('date', 'DESC')->orderBy('id', 'DESC')->get();
    }
}
