import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { forgotPassword } from "../api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
function MotDePasseOublie() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const data = await forgotPassword({ email });

            setMessage(
                data.message ??
                "Si cette adresse correspond à un compte, un lien de réinitialisation a été envoyé."
            );
        } catch (exception: any) {
            if (exception.status === 422) {
                const emailError = exception.data?.errors?.email?.[0];

                setError(
                    emailError ??
                    "L’adresse e-mail renseignée n’est pas valide."
                );
            } else {
                setError(
                    exception.data?.message ??
                    "Erreur lors de la demande de réinitialisation du mot de passe."
                );
            }
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
                        <div className="mb-4 flex justify-center">
                            <div className="text-4xl">🔐</div>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mot de passe oublié?</h1>
                        <p className="text-gray-600">Pas de problème! Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.</p>
                    </div>

                    {/* <!-- Reset Form --> */}
                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
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

                        {message && <p className="text-green-600">{message}</p>}
                        {error && <p className="text-red-600">{error}</p>}

                        {/* <!-- Submit Button --> */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition block text-center"
                        >
                            Envoyer le lien de réinitialisation
                        </button>
                    </form>

                    {/* <!-- Info Box --> */}
                    <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <span className="font-semibold">Note:</span> Vérifiez votre dossier spam si vous ne recevez pas l'e-mail dans les quelques minutes.
                        </p>
                    </div>

                    {/* <!-- Back to Login --> */}
                    <div className="text-center mt-8 pt-8 border-t border-gray-200">
                        <p className="text-gray-600 mb-2">Vous vous souvenez de votre mot de passe?</p>
                        <button className="text-blue-600 hover:text-blue-700 font-semibold transition" onClick={() => navigate("/login")}>
                            Retour à la connexion
                        </button>
                    </div>
                </div>
            </section>

            {/* <!-- Footer --> */}
            <Footer />
        </>
    );
}

export default MotDePasseOublie