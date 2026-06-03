<?php

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Carbon\Carbon;
use App\Http\Controllers\ApplicationOfferController;

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

Route::post('/mot-de-passe-oublie', function (Request $request) {
    if (!$request->email) {
        return response()->json([
            'message' => "L'adresse mail est obligatoire."
        ], 422);
    }

    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json([
            'message' => 'Si un compte existe avec cette adresse, un lien de réinitialisation a été envoyé.'
        ]);
    }

    $token = Str::random(64);

    DB::table('password_reset_tokens')->updateOrInsert(
        ['email' => $request->email],
        [
            'token' => Hash::make($token),
            'created_at' => now(),
        ]
    );

    $resetUrl = 'http://192.128.6.48/reset-password?email=' . urlencode($request->email) . '&token=' . $token;

    // Pour le moment, on met le lien dans les logs Laravel
    logger('Lien reset password : ' . $resetUrl);

    return response()->json([
        'message' => 'Si un compte existe avec cette adresse, un lien de réinitialisation a été envoyé.'
    ]);
});

Route::post('/reset-password', function (Request $request) {
    if (!$request->email || !$request->token || !$request->password) {
        return response()->json([
            'message' => 'Tous les champs sont obligatoires.'
        ], 422);
    }

    if (strlen($request->password) < 6) {
        return response()->json([
            'message' => 'Le mot de passe doit contenir au moins 6 caractères.'
        ], 422);
    }

    $reset = DB::table('password_reset_tokens')
        ->where('email', $request->email)
        ->first();

    if (!$reset || !Hash::check($request->token, $reset->token)) {
        return response()->json([
            'message' => 'Le lien de réinitialisation est invalide.'
        ], 422);
    }

    if (Carbon::parse($reset->created_at)->addMinutes(30)->isPast()) {
        return response()->json([
            'message' => 'Le lien de réinitialisation a expiré.'
        ], 422);
    }

    $user = User::where('email', $request->email)->first();

    if (!$user) {
        return response()->json([
            'message' => 'Utilisateur introuvable.'
        ], 404);
    }

    $user->password = Hash::make($request->password);
    $user->save();

    DB::table('password_reset_tokens')
        ->where('email', $request->email)
        ->delete();

    return response()->json([
        'message' => 'Mot de passe réinitialisé avec succès.'
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

Route::get('/applications/{id}/offers', [ApplicationOfferController::class, 'getOffersByApplication']);