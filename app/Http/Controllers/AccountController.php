<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    public function index(Request $request) {
        $accounts = Account::search();

        return inertia('app/accounts/index/page', compact(
            'accounts',
        ));
    }

    public function show(Request $request, Account $account) {
        return inertia('app/accounts/show/page', compact('account'));
    }

    public function store(Request $request) {
        $validData = $request->validate([
            'title' => 'required',
        ]);

        Account::create([
            ...$validData,
            'user_id' => Auth::id(),
        ]);

        return to_route('account.index');

    }
    
    public function update(Request $request, Account $account) {
        $validData = $request->validate([
            'title' => '',
        ]);

        $account->update($validData);

        return to_route('account.index');
    }

    public function destroy(Request $request, Account $account) {
        $account->delete();
        return to_route('account.index');
    }
}
