import { useEffect, useState } from "react";
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
    const [instances, setInstances] = useState<Instance[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");

        fetch(`${API_URL}/api/instances`, {
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error();
                }
                return res.json();
            })
            .then((data) => {
                setInstances(data);
            })
            .catch(() => {
                setError("Impossible de charger vos instances.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

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
                                    className="bg-white rounded-2xl shadow-md p-6"
                                >
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                                        {instance.name}
                                    </h2>

                                    <p>
                                        <span className="font-semibold">Statut :</span>{" "}
                                        {instance.status}
                                    </p>

                                    <p>
                                        <span className="font-semibold">IP :</span>{" "}
                                        {instance.ip_address ?? "En attente"}
                                    </p>

                                    <p>
                                        <span className="font-semibold">Port :</span>{" "}
                                        {instance.port ?? "En attente"}
                                    </p>

                                    <p>
                                        <span className="font-semibold">CTID Proxmox :</span>{" "}
                                        {instance.proxmox_ctid ?? "En attente"}
                                    </p>

                                    <p className="text-sm text-gray-500 mt-4">
                                        Créée le{" "}
                                        {new Date(instance.created_at).toLocaleDateString("fr-FR")}
                                    </p>
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