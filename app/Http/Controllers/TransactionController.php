<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TransactionController extends Controller
{

    public function index(Request $request) {
        $transactions = Transaction::search([
            'keywords' => $request->get('keywords'),
            'fromDate' => $request->get('from'),
            'toDate' => $request->get('to'),
        ]);

        return inertia('app/transactions/index/page', compact(
                'transactions'
            )
        );
    }

    public function store(Request $request) {
        $validData = $request->validate([
            'title' => 'required',
            'amount' => 'required|numeric',
            'date' => 'required|date'
        ]);

        Transaction::create([
            'user_id' => Auth::id(),
            'budget_id' => 1,
            ...$validData
        ]);

        return to_route('transaction.index');
    }

    public function destroy(Request $request, Transaction $transactions) {
        $transactions->delete();
        return to_route('transaction.index');
    }

    public function update(Request $request, Transaction $transaction) {
        $validData = $request->validate([
            'title' => '',
            'amount' => 'numeric',
            'date' => 'date'
        ]);

        $transaction->update($validData);

        return to_route('transaction.index');
    }

    public function show(Request $request, Transaction $transaction) {
        return inertia('app/transactions/show/page', compact('transaction'));
    }
}
