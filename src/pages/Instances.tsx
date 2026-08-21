import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_URL } from "../api";

type Instance = {
    id: number;
    name: string;
    status: string;
    ip_address: string | null;
    port: number | null;
    proxmox_ctid: number | null;
    created_at: string;
};

function Instances() {
    const navigate = useNavigate();
    const [instances, setInstances] = useState<Instance[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchInstances = async (showLoading = false) => {
        const token = localStorage.getItem("token");

        if (showLoading) {
            setLoading(true);
        }

        try {
            const res = await fetch(`${API_URL}/api/instances`, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error();
            }

            const data = await res.json();

            setInstances(data);
            setError("");
        } catch {
            setError("Impossible de charger vos instances.");
        } finally {
            if (showLoading) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchInstances(true);
    }, []);

    useEffect(() => {
        const hasPendingInstance = instances.some((instance) =>
            ["provisioning", "upgrading", "deleting"].includes(instance.status)
        );

        if (!hasPendingInstance) {
            return;
        }

        const interval = setInterval(() => {
            fetchInstances();
        }, 30000);

        return () => clearInterval(interval);
    }, [instances]);

    function handleDelete(instanceId: number) {
        const confirmDelete = window.confirm(
            "Voulez-vous vraiment supprimer cette instance ?"
        );

        if (!confirmDelete) return;

        const token = localStorage.getItem("token");

        fetch(`${API_URL}/api/instances/${instanceId}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
        
            .then((res) => {
                if (!res.ok) throw new Error();

                setInstances((prevInstances) =>
                    prevInstances.map((instance) =>
                        instance.id === instanceId
                            ? { ...instance, status: "deleting" }
                            : instance
                    )
                );
            })
            .catch(() => {
                alert("Impossible de supprimer cette instance.");
            });
    }

    function getStatusLabel(status: string) {
        switch (status) {
            case "running":
                return "En fonctionnement";

            case "provisioning":
                return "Création en cours";

            case "upgrading":
                return "Modification en cours";

            case "deleting":
                return "Suppression en cours";

            case "error":
                return "Erreur";

            default:
                return status;
        }
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">
                        Mes instances
                    </h1>

                    {loading && (
                        <p className="text-gray-600">Chargement des instances...</p>
                    )}

                    {error && (
                        <p className="text-red-600">{error}</p>
                    )}

                    {!loading && !error && instances.length === 0 && (
                        <div className="bg-white rounded-xl shadow p-8 text-center">
                            <p className="text-gray-600">
                                Vous n'avez aucune instance pour le moment.
                            </p>
                        </div>
                    )}

                    {!loading && !error && instances.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {instances.map((instance) => (
                                <div
                                    key={instance.id}
                                    className="relative bg-white rounded-2xl shadow-md p-6"
                                >
                                    {instance.status === "running" && (
                                        <button
                                            onClick={() => handleDelete(instance.id)}
                                            className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-xl"
                                            title="Supprimer l'instance"
                                        >
                                            🗑️ 
                                        </button>
                                    )}
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                        {instance.name}
                                    </h2>

                                    <p>
                                        <span className="font-semibold">Statut :</span>{" "}
                                        {getStatusLabel(instance.status)}
                                    </p>

                                    <p>
                                        <span className="font-semibold">IP :</span>{" "}
                                        {instance.ip_address ?? "En attente"}
                                    </p>

                                    <p>
                                        <span className="font-semibold">Port :</span>{" "}
                                        {instance.port ?? "En attente"}
                                    </p>

                                    <p className="text-sm text-gray-500 mt-4">
                                        Créée le{" "}
                                        {new Date(instance.created_at).toLocaleDateString("fr-FR")}
                                    </p>

                                    {instance.status === "running" && (
                                        <button
                                            onClick={() =>
                                                navigate(`/instances/${instance.id}/upgrade`)
                                            }
                                            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition"
                                        >
                                            Passer au plan supérieur
                                        </button>
                                    )}

                                    {instance.status === "upgrading" && (
                                        <div className="mt-6 w-full bg-orange-100 text-orange-700 font-semibold py-3 px-4 rounded-lg text-center">
                                            Modification en cours...
                                        </div>
                                    )}

                                    {instance.status === "provisioning" && (
                                        <div className="mt-6 w-full bg-blue-100 text-blue-700 font-semibold py-3 px-4 rounded-lg text-center">
                                            Création en cours...
                                        </div>
                                    )}

                                    {instance.status === "upgrading" && (
                                        <div className="mt-6 w-full bg-orange-100 text-orange-700 font-semibold py-3 px-4 rounded-lg text-center">
                                            Modification en cours...
                                        </div>
                                    )}

                                    {instance.status === "deleting" && (
                                        <div className="mt-6 w-full bg-red-100 text-red-700 font-semibold py-3 px-4 rounded-lg text-center">
                                            Suppression en cours...
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Instances;