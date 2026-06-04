import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Support() {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        console.log({
            subject,
            message
        });

        // Appel API ici
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
                            Une question ou un problème ? Notre équipe est là pour vous aider.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sujet
                                </label>

                                <input
                                    type="text"
                                    value={subject}
                                    onChange={(e) => setSubject(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ex : Impossible d'accéder à mon instance Minecraft"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>

                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={10}
                                    className="w-full border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Décrivez votre problème en détail..."
                                    required
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                                >
                                    Envoyer la demande
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