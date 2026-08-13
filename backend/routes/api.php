<?php

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\ApplicationOfferController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\InstanceController;
use App\Http\Controllers\SupportController;
use App\Http\Controllers\PasswordResetController;

Route::get('/test', function () {
    return response()->json([
        'message' => 'API Laravel OK'
    ]);
});

Route::post('/register', function (Request $request) {
    $validator = Validator::make($request->all(), [
    'nom' => 'required|string|max:255',
    'prenom' => 'required|string|max:255',
    'email' => 'required|email|unique:users,email',
    'password' => 'required|string|min:6',
    ], [
        'nom.required' => 'Le nom est obligatoire.',
        'prenom.required' => 'Le prénom est obligatoire.',
        'email.required' => 'L’adresse e-mail est obligatoire.',
        'email.email' => 'L’adresse e-mail n’est pas valide.',
        'email.unique' => 'Cette adresse e-mail est déjà utilisée.',
        'password.required' => 'Le mot de passe est obligatoire.',
        'password.min' => 'Le mot de passe doit contenir au moins 6 caractères.',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'message' => 'Erreur de validation',
            'errors' => $validator->errors(),
        ], 422);
    }

    $user = User::create([
        'nom' => $request->nom,
        'prenom' => $request->prenom,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    $token = $user->createToken('api-token')->plainTextToken;

    return response()->json([
        'message' => 'Compte créé avec succès',
        'user' => $user,
        'token' => $token,
    ], 201);
});

Route::post('/login', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'password' => 'required|string',
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        return response()->json([
            'message' => 'Identifiants incorrects'
        ], 401);
    }

    $token = $user->createToken('api-token')->plainTextToken;

    return response()->json([
        'message' => 'Connexion réussie',
        'user' => $user,
        'token' => $token,
    ]);
});

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return response()->json([
        'user' => $request->user()
    ]);
});

Route::middleware('auth:sanctum')->put('/me', function (Request $request) {
    $user = $request->user();
    $validated = $request->validate([
        'nom' => 'required|string|max:255',
        'prenom' => 'required|string|max:255',
        'email' => 'required|string|max:255|unique:users,email,' . $user->id,
    ]);

    $user->update($validated);

    return response()->json([
        'message' => 'Profil mis à jour avec succès',
        'user' => $user,
    ]);
});

Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'message' => 'Déconnexion réussie'
    ]);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/orders', [OrderController::class, 'create']);
    Route::post('/orders/{order}/capture', [OrderController::class, 'capture']);
});

Route::middleware('auth:sanctum')->get(
    '/instances',
    [InstanceController::class, 'index']
);

Route::get('/applications/{id}/offers', [ApplicationOfferController::class, 'getOffersByApplication']);
Route::delete('/instances/{id}', [InstanceController::class, 'destroy'])
    ->middleware('auth:sanctum');
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/support', [SupportController::class, 'send']);
});

Route::post(
    '/mot-de-passe-oublie',
    [PasswordResetController::class, 'forgotPassword']
);

Route::post(
    '/reset-password',
    [PasswordResetController::class, 'resetPassword']
);

Route::middleware('auth:sanctum')->group(function () {

    Route::get(
        '/instances/{id}/upgrades',
        [InstanceController::class, 'availableUpgrades']
    );

    Route::post(
        '/instances/{id}/upgrade',
        [InstanceController::class, 'upgrade']
    );

});