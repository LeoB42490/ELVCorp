import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
type Offer = {
    id: number;
    name: string;
    cpu: number;
    ram_mb: number;
    storage_gb: number;
    price: number;
};

type Application = {
    id: number;
    name: string;
    description: string;
};

function Offers() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [application, setApplication] = useState<Application | null>(null);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`/api/applications/${id}/offers`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Erreur lors du chargement des offres");
                }
                return res.json();
            })
            .then((data) => {
                setApplication(data.application);
                setOffers(data.offers);
            })
            .catch(() => {
                setError("Impossible de charger les offres.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const handlePayment = (offerId: number) => {
        navigate(`/payment/${id}/${offerId}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-gray-600">Chargement des offres...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-red-600">{error}</p>
            </div>
        );
    }

    return (

        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <button
                        onClick={() => navigate("/")}
                        className="mb-8 text-blue-600 hover:underline"
                    >
                        ← Retour à l'accueil
                    </button>

                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900">
                            Offres pour {application?.name}
                        </h1>

                        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
                            {application?.description}
                        </p>
                    </div>

                    {offers.length === 0 ? (
                        <p className="text-center text-gray-600">
                            Aucune offre disponible pour cette application.
                        </p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {offers.map((offer) => (
                                <div
                                    key={offer.id}
                                    className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition"
                                >
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                            {offer.name}
                                        </h2>

                                        <p className="text-3xl font-bold text-blue-600 mb-6">
                                            {Number(offer.price).toFixed(2)}€{" "}
                                            <span className="text-sm font-normal text-gray-500">
                                                / mois
                                            </span>
                                        </p>

                                        <ul className="space-y-3 text-gray-700 mb-8">
                                            <li>CPU : {offer.cpu} vCPU</li>
                                            <li>RAM : {offer.ram_mb / 1024} Go</li>
                                            <li>Stockage : {offer.storage_gb} Go</li>
                                        </ul>
                                    </div>

                                    <button
                                        onClick={() => handlePayment(offer.id)}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
                                    >
                                        Payer {Number(offer.price).toFixed(2)}€
                                    </button>
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

export default Offers;
