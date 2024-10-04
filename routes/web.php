<?php

use App\Http\Controllers\BudgetController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GenericController;
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

    Route::group(['prefix' => 'budgets'], function () {
        Route::get('/', [BudgetController::class, 'index'])->name('budget.index');
        Route::get('/{budget}', [BudgetController::class, 'show'])->name('budget.show');
        Route::post('/', [BudgetController::class, 'store'])->name('budget.store');
        Route::put('/{budget}', [BudgetController::class, 'update'])->name('budget.update');
        Route::delete('/{budget}', [BudgetController::class, 'destroy'])->name('budget.destroy');
    }); 

    Route::group(['prefix' => 'transactions'], function () {
        Route::get('/', [TransactionController::class, 'index'])->name('transaction.index');
        Route::get('/{transaction}', [TransactionController::class, 'show'])->name('transaction.show');
        Route::post('/', [TransactionController::class, 'store'])->name('transaction.store');
        Route::put('/{transaction}', [TransactionController::class, 'update'])->name('transaction.update');
        Route::delete('/{transaction}', [TransactionController::class, 'destroy'])->name('transaction.destroy');
    });

    Route::group(['prefix' => 'generic'], function() {
        Route::post('/delete/{entity}', [GenericController::class, 'delete'])->name('generic.delete');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
