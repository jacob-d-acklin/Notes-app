<?php

use App\Http\Controllers\Api\AuthController;
use \App\Http\Controllers\Api\NoteController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    //User and Auth
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/users', UserController::class);


    //Notes
    Route::post('/note', [NoteController::class, 'store']);
    Route::get('/viewNotes', [NoteController::class, 'index']);
    Route::post('/updateNote', [NoteController::class, 'update']);
    Route::delete('/deleteNote/{id}', [NoteController::class, 'destroy']);

});

// Login Logout also Auth
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

