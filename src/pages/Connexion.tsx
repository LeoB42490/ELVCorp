import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';

function Connexion() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!email || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        if (password.length < 6) {
            setError("Le mot de passe doit contenir au moins 6 caractères.");
            return;
        }

        try {
            setLoading(true);
            const data = await loginUser({
                email,
                password
            });
            console.log(data);
            if (data.token) {
                localStorage.setItem("token", data.token);
                navigate("/");
            } else {
                setError(data.message || "Erreur lors de la connexion");
            }
        } catch (err) {
            console.log(err);
            setError("Impossible de contacter le serveur.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />

            {/* <!-- Main Content --> */}
            <section className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                    {/* <!-- Header --> */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Connexion</h1>
                        <p className="text-gray-600">Accédez à votre compte HostBuster</p>
                    </div>

                    {/* <!-- Login Form --> */}
                    <form className="space-y-6" onSubmit={handleLogin}>
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
                        </div>

                        {/* <!-- Remember & Forgot --> */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-600" />
                                <span className="text-sm text-gray-600">Se souvenir de moi</span>
                            </label>
                            <button
                                type="button"
                                className="text-sm text-blue-600 hover:text-blue-700 transition" onClick={() => navigate("/mot-de-passe-oublie")}>
                                Mot de passe oublié?
                            </button>
                        </div>
                        {error && (
                            <p className="text-red-600 text-sm text-center">
                                {error}
                            </p>
                        )}

                        {success && (
                            <p className="text-green-600 text-sm text-center">
                                {success}
                            </p>
                        )}
                        {/* <!-- Login Button --> */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition block text-center"
                        >
                            {loading ? "Connexion..." : "Se connecter"}
                        </button> {/* TODO Mettre vérification password avant bouton Se connecter et dire sibon password ou non */}
                    </form>
                    {/* <!-- Register Link --> */}
                    <div className="text-center mt-8 pt-8 border-t border-gray-200">
                        <p className="text-gray-600 mb-2">Vous n'avez pas de compte?</p>
                        <button className="text-blue-600 hover:text-blue-700 font-semibold transition" onClick={() => navigate("/register")}>
                            Créer un compte maintenant
                        </button>
                    </div>
                </div>
            </section>

            {/* <!-- Footer --> */}
            <Footer />
        </>
    )
}

export default Connexion