import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { registerUser } from '../api';
import Navbar from "../components/Navbar";
function Inscription() {
    const navigate = useNavigate();
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        const data = await registerUser({
            nom,
            prenom,
            email,
            password,
        });

        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "/";
        } else if (data.errors) {
            const errors = data.errors as Record<string, string[]>;
            const errorsArray = Object.values(errors);
            if (errorsArray.length > 0 && errorsArray[0].length > 0) {
                setError(errorsArray[0][0]);
            }
        } else {
            setError(data.message || "Erreur lors de la connexion");
        }
    }

    return (
    <>
    {/* <!-- Navigation --> */}

    <Navbar />

    {/* <!-- Main Content --> */}
    <section className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
            {/* <!-- Header --> */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Créer un compte</h1>
                <p className="text-gray-600">Rejoignez HostBuster en quelques minutes</p>
            </div>

            {/* <!-- Register Form --> */}
            <form className="space-y-5" onSubmit={handleRegister}>
                {/* <!-- Prénom --> */}
                <div>
                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-900 mb-2">
                        Prénom
                    </label>
                    <input
                        type="text"
                        id="firstname"
                        placeholder="Jean"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        required
                    />
                </div>

                {/* <!-- Nom --> */}
                <div>
                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-900 mb-2">
                        Nom
                    </label>
                    <input
                        type="text"
                        id="lastname"
                        placeholder="Dupont"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        required
                    />
                </div>

                {/* <!-- Email --> */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                        Adresse e-mail
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="vous@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        required
                    />
                </div>

                {/* <!-- Password --> */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        required
                    />
                    <p className="text-xs text-gray-500 mt-1">Au minimum 6 caractères</p>
                </div>

                {/* <!-- Confirm Password --> */}
                <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-900 mb-2">
                        Confirmer le mot de passe
                    </label>
                    <input
                        type="password"
                        id="confirm-password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                        required
                    />
                </div>

                {error && (
                    <p className="text-red-600 text-sm text-center">
                        {error}
                    </p>
                )}

                <button 
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition mt-6 block text-center">
                    Créer mon compte
                </button>
            </form>

            {/* <!-- Login Link --> */}
            <div className="text-center mt-8 pt-8 border-t border-gray-200">
                <p className="text-gray-600 mb-2">Vous avez déjà un compte?</p>
                <button className="text-blue-600 hover:text-blue-700 font-semibold transition" onClick={() => navigate("/login")}>
                    Se connecter
                </button>
            </div>
        </div>
    </section>

    {/* <!-- Footer --> */}
    <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-600">© 2026 HostBuster. Tous droits réservés.</p>
                <div className="flex gap-6 text-sm text-gray-600">
                    {/* @TODO Modifier les lien href */}
                    <a href="#" className="hover:text-blue-600 transition">Contact</a>
                </div>
            </div>
        </div>
    </footer>
        </>
    )
}

export default Inscription