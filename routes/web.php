<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function() {
    return redirect('/app');
});

Route::group(['middleware' => ['auth', 'verified'], 'prefix' => 'app'], function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard.index');

    // Route::get('/_fake_trans', function() {
    //     Transaction::create([
    //         'user_id' => Auth::id(),
    //         'budget_id' => 1,
    //         'title' => 'Some expense',
    //         'amount' => -10,
    //     ]);
    // });

    Route::group(['prefix' => 'transactions'], function () {
        Route::get('/', [TransactionController::class, 'index'])->name('transaction.index');
    });


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
