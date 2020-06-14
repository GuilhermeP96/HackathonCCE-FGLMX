<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        factory(App\Models\User::class)->create([
            'name' => 'Felipe Cardoso',
            'email'    => 'admin@outlook.com',
            'password' =>Hash::make('password')
        ]);
    }
}
