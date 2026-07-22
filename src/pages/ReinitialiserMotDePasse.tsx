import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type ValidationErrors = Record<string, string[]>;

type ApiError = {
    status?: number;
    data?: {
        message?: string;
        errors?: ValidationErrors;
    };
};

function ReinitialiserMotDePasse() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token") ?? "";
    const initialEmail = searchParams.get("email") ?? "";

    const [email, setEmail] = useState(initialEmail);
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [errors, setErrors] = useState<ValidationErrors>({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setErrors({});
        setError("");

        if (!token) {
            setError(
                "Le lien de réinitialisation est incomplet ou invalide."
            );
            return;
        }

        setLoading(true);

        try {
            const data = await resetPassword({
                token,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            navigate("/login", {
                replace: true,
                state: {
                    message:
                        data.message ??
                        "Votre mot de passe a bien été modifié.",
                },
            });
        } catch (exception) {
            const apiError = exception as ApiError;

            if (apiError.status === 422) {
                setErrors(apiError.data?.errors ?? {});
                setError(
                    apiError.data?.message ??
                        "Certaines informations ne sont pas valides."
                );
            } else {
                setError(
                    apiError.data?.message ??
                        "Une erreur est survenue pendant la réinitialisation."
                );
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />

            <section className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50">
                <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                    <div className="text-center mb-8">
                        <div className="text-4xl mb-4">🔑</div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Nouveau mot de passe
                        </h1>

                        <p className="text-gray-600">
                            Choisissez un nouveau mot de passe pour votre
                            compte.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        noValidate
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-900 mb-2"
                            >
                                Adresse e-mail
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                autoComplete="email"
                            />

                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.email[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-900 mb-2"
                            >
                                Nouveau mot de passe
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                                    errors.password
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                autoComplete="new-password"
                            />

                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600">
                                    {errors.password[0]}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-900 mb-2"
                            >
                                Confirmer le mot de passe
                            </label>

                            <input
                                id="password_confirmation"
                                type="password"
                                value={passwordConfirmation}
                                onChange={(e) =>
                                    setPasswordConfirmation(e.target.value)
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                                autoComplete="new-password"
                            />
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !token}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
                        >
                            {loading
                                ? "Modification en cours..."
                                : "Modifier mon mot de passe"}
                        </button>
                    </form>

                    <div className="text-center mt-8 pt-8 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => navigate("/login")}
                            className="text-blue-600 hover:text-blue-700 font-semibold"
                        >
                            Retour à la connexion
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}

export default ReinitialiserMotDePasse;