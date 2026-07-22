import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_URL } from "../api";

type ValidationErrors = {
    subject?: string[];
    message?: string[];
};

function Support() {
    const navigate = useNavigate();

    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [validationErrors, setValidationErrors] =
        useState<ValidationErrors>({});

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);
        setSuccessMessage("");
        setErrorMessage("");
        setValidationErrors({});

        const token = localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/support`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },

                body: JSON.stringify({
                    subject,
                    message,
                }),
            });

            const data = await response.json();

            if (response.status === 401) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            if (response.status === 422) {
                setValidationErrors(data.errors ?? {});
                setErrorMessage(
                    data.message ??
                    "Certaines informations ne sont pas valides."
                );

                return;
            }

            if (!response.ok) {
                throw new Error(
                    data.message ??
                    "Une erreur est survenue pendant l'envoi."
                );
            }

            setSuccessMessage(
                data.message ??
                "Votre demande a bien été envoyée au support."
            );

            setSubject("");
            setMessage("");
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage(
                    "Impossible de contacter le serveur."
                );
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 py-12">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="bg-white rounded-xl shadow-lg p-10">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">
                            Centre de support
                        </h1>

                        <p className="text-gray-600 mb-8">
                            Une question ou un problème ? Notre équipe est là
                            pour vous aider.
                        </p>

                        {successMessage && (
                            <div
                                className="
                                    mb-6
                                    rounded-lg
                                    border
                                    border-green-200
                                    bg-green-50
                                    px-5
                                    py-4
                                    text-green-800
                                "
                            >
                                {successMessage}
                            </div>
                        )}

                        {errorMessage && (
                            <div
                                className="
                                    mb-6
                                    rounded-lg
                                    border
                                    border-red-200
                                    bg-red-50
                                    px-5
                                    py-4
                                    text-red-800
                                "
                            >
                                {errorMessage}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                            noValidate
                        >
                            <div>
                                <label
                                    htmlFor="subject"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-700
                                        mb-2
                                    "
                                >
                                    Sujet
                                </label>

                                <input
                                    id="subject"
                                    type="text"
                                    value={subject}
                                    onChange={(e) =>
                                        setSubject(e.target.value)
                                    }
                                    minLength={5}
                                    maxLength={150}
                                    className={`
                                        w-full
                                        border
                                        rounded-lg
                                        p-4
                                        focus:ring-2
                                        focus:ring-blue-500
                                        focus:border-blue-500
                                        ${
                                            validationErrors.subject
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }
                                    `}
                                    placeholder="Ex : Impossible d'accéder à mon instance Minecraft"
                                    disabled={loading}
                                    required
                                />

                                {validationErrors.subject && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {validationErrors.subject[0]}
                                    </p>
                                )}

                                <p className="mt-2 text-sm text-gray-500">
                                    {subject.length}/150 caractères
                                </p>
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-gray-700
                                        mb-2
                                    "
                                >
                                    Message
                                </label>

                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(e.target.value)
                                    }
                                    rows={10}
                                    minLength={10}
                                    maxLength={5000}
                                    className={`
                                        w-full
                                        border
                                        rounded-lg
                                        p-4
                                        focus:ring-2
                                        focus:ring-blue-500
                                        focus:border-blue-500
                                        resize-y
                                        ${
                                            validationErrors.message
                                                ? "border-red-500"
                                                : "border-gray-300"
                                        }
                                    `}
                                    placeholder="Décrivez votre problème en détail..."
                                    disabled={loading}
                                    required
                                />

                                {validationErrors.message && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {validationErrors.message[0]}
                                    </p>
                                )}

                                <p className="mt-2 text-sm text-gray-500">
                                    {message.length}/5000 caractères
                                </p>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                        bg-blue-600
                                        text-white
                                        px-8
                                        py-3
                                        rounded-lg
                                        font-medium
                                        hover:bg-blue-700
                                        transition
                                        disabled:bg-blue-300
                                        disabled:cursor-not-allowed
                                    "
                                >
                                    {loading
                                        ? "Envoi en cours..."
                                        : "Envoyer la demande"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Support;