// Route::post('/register', function (Request $request) {
//     if (!$request->nom || !$request->prenom || !$request->email || !$request->password) {
//         return response()->json([
//             'message' => 'Tous les champs sont obligatoires.'
//         ], 422);
//     }

//     if (!filter_var($request->email, FILTER_VALIDATE_EMAIL)) {
//         return response()->json([
//             'message' => 'L’adresse e-mail n’est pas valide.'
//         ], 422);
//     }

//     if (strlen($request->password) < 6) {
//         return response()->json([
//             'message' => 'Le mot de passe doit contenir au moins 6 caractères.'
//         ], 422);
//     }

//     if (User::where('email', $request->email)->exists()) {
//         return response()->json([
//             'message' => 'Cette adresse e-mail est déjà utilisée.'
//         ], 422);
//     }
//
//     $user = User::create([
//         'nom' => $request->nom,
//         'prenom' => $request->prenom,
//         'email' => $request->email,
//         'password' => Hash::make($request->password),
//     ]);

//     $token = $user->createToken('api-token')->plainTextToken;

//     return response()->json([
//         'message' => 'Compte créé avec succès',
//         'user' => $user,
//         'token' => $token,
//     ], 201);
// });