<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TransactionsTableSeeder extends Seeder
{
    public function run()
    {
        $userId = 1; // All transactions have user_id of 1
        $transactions = [];

        for ($budgetId = 1; $budgetId <= 10; $budgetId++) {
            $transactions[] = [
                'user_id' => $userId,
                'budget_id' => $budgetId,
                'title' => 'Transaction ' . $budgetId,
                'amount' => rand(100, 1000), // Random amount for each transaction
                'is_savings' => (bool) rand(0, 1), // Randomly true or false
                'date' => Carbon::now()->subDays(rand(0, 30)), // Random date within the last 30 days
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }

        DB::table('transactions')->insert($transactions);
    }
}