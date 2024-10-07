<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BudgetsTableSeeder extends Seeder
{
    public function run()
    {
        $userId = 1; // All budgets have user_id of 1
        $budgets = [];

        for ($i = 1; $i <= 10; $i++) {
            $budgets[] = [
                'user_id' => $userId,
                'title' => 'Budget ' . $i,
                'amount' => rand(1000, 5000), // Random amount for each budget
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        }

        DB::table('budgets')->insert($budgets);
    }
}