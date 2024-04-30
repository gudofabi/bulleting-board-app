<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CommentController;

Route::prefix('v1')->group(function() {

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
    Route::get('/me', function (Request $request) {
        return $request->user();
    })->middleware('auth:sanctum');
    
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::apiResource('/articles', ArticleController::class);
        Route::apiResource('/articles/{id}/comments', CommentController::class);
    });
});
