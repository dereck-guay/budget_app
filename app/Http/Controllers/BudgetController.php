<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use Illuminate\Http\Request;

class BudgetController extends Controller
{
    public function index(Request $request) {
        $budgets = Budget::search();
        return inertia('app/budgets/Index', compact('budgets'));
    }

    public function show(Request $request, Budget $budget) {
        return inertia('app/budgets/Show', compact('budget'));
    }
}