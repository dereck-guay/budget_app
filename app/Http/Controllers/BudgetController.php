<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BudgetController extends Controller
{
    public function index(Request $request) {
        $budgets = Budget::search([
            'keywords' => $request->get('keywords', '')
        ]);
        
        return inertia('app/budgets/index/page', compact('budgets'));
    }

    public function show(Request $request, Budget $budget) {
        return inertia('app/budgets/show/page', compact('budget'));
    }

    public function store(Request $request) {
        $validData = $request->validate([
            'title' => 'required',
            'amount' => 'required|numeric'
        ]);
        
        Budget::create([
            ...$validData,
            'user_id' => Auth::id()
        ]);

        return to_route('budget.index');
    }

    public function update(Request $request, Budget $budget) {
        $validData = $request->validate([
            'title' => '',
            'amount' => 'numeric'
        ]);
        
        $budget->update($validData);

        return to_route('budget.index');
    }

    public function destroy(Request $request, Budget $budget) {
        $budget->delete();
        return to_route('budget.index');
    }
}