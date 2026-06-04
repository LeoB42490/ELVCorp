import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getMe, updateMe } from "../api";
import Footer from "../components/Footer";

type User = {
    id: number;
    nom: string;
    prenom: string;
    email: string;
};

function Profil() {
    const navigate = useNavigate();

    const [user, setUser] = useState<User | null>(null);
    const [form, setForm] = useState({
        nom: "",
        prenom: "",
        email: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        async function loadUser() {
            try {
                const data = await getMe();

                if (data.message === "Unauthenticated.") {
                    localStorage.removeItem("token");
                    navigate("/login");
                    return;
                }

                const currentUser = data.user ?? data;

                setUser(currentUser);
                setForm({
                    nom: currentUser.nom ?? "",
                    prenom: currentUser.prenom ?? "",
                    email: currentUser.email ?? "",
                });
            } catch (err) {
                setError("Impossible de récupérer le profil.");
            } finally {
                setLoading(false);
            }
        }

        loadUser();
    }, [navigate]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const data = await updateMe(form);

            if (data.errors) {
                setError("Certains champs sont invalides.");
                return;
            }

            const updatedUser = data.user ?? data;

            setUser(updatedUser);
            setForm({
                nom: updatedUser.nom ?? "",
                prenom: updatedUser.prenom ?? "",
                email: updatedUser.email ?? "",
            });

            setSuccess("Profil mis à jour avec succès.");
        } catch (err) {
            setError("Impossible de sauvegarder les modifications.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-gray-50 py-10 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                        <div className="bg-blue-600 px-8 py-10">
                            <div className="flex items-center gap-5">
                                <div className="w-20 h-20 rounded-full bg-white text-blue-600 flex items-center justify-center text-4xl font-bold shadow">
                                    {form.prenom.charAt(0)}
                                    {form.nom.charAt(0)}
                                </div>

                                <div>
                                    <h1 className="text-3xl font-bold text-white">
                                        Mon profil
                                    </h1>
                                    <p className="text-blue-100 mt-1">
                                        Gérez vos informations personnelles
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            {loading && (
                                <p className="text-gray-600">
                                    Chargement du profil...
                                </p>
                            )}

                            {error && (
                                <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-700">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="mb-5 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-green-700">
                                    {success}
                                </div>
                            )}

                            {!loading && user && (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nom
                                            </label>
                                            <input
                                                type="text"
                                                name="nom"
                                                value={form.nom}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Prénom
                                            </label>
                                            <input
                                                type="text"
                                                name="prenom"
                                                value={form.prenom}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Adresse email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => navigate("/")}
                                            className="px-5 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                                        >
                                            Annuler
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
                                        >
                                            {saving ? "Sauvegarde..." : "Sauvegarder les modifications"}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default Profil;