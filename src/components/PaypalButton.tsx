import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useRef, useState } from "react";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";

type PayPalButtonProps = {
    applicationId: number;
    offerId: number;
    instanceName: string;
    onSuccess?: () => void;
};
//, onSuccess
function PayPalButton({ applicationId, offerId, instanceName}: PayPalButtonProps) {
    const token = localStorage.getItem("token");
    const localOrderId = useRef<number | null>(null);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    return (
        <>
        <PayPalScriptProvider
            options={{
                clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
                currency: "EUR",
            }}
        >
            <PayPalButtons
                createOrder={async () => {
                    setError("");

                    if (!instanceName.trim()) {
                        setError("Veuillez renseigner un nom pour votre instance.");
                        throw new Error("Nom d'instance manquant");
                    }
                
                    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(instanceName)) {
                        setError(
                            "Le nom de l'instance doit contenir uniquement des lettres minuscules, des chiffres et des tirets."
                        );
                        throw new Error("Nom d'instance invalide");
                    }

                    const response = await fetch(`${API_URL}/api/orders`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify({
                            application_id: applicationId,
                            offer_id: offerId,
                            instance_name: instanceName
                        }),
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        if (data.errors?.instance_name?.[0]) {
                            setError(data.errors.instance_name[0]);
                        } else {
                            setError(data.message || "Erreur lors de la création de la commande.");
                        }
                        throw new Error(data.errors?.instance_name?.[0] || data.message || "Erreur création commande");
                    }

                    localOrderId.current = data.order_id;

                    return data.paypal_order_id;
                }}
                onApprove={async () => {
                    if (!localOrderId.current) {
                        setError("Commande introuvable");
                        return;
                    }

                    const response = await fetch(`${API_URL}/api/orders/${localOrderId.current}/capture`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                    const result = await response.json();

                    if (!response.ok) {
                        setError(result.message || "Erreur paiement");
                        return;
                    }

                    // alert("Paiement validé !");
                    // onSuccess?.();
                    navigate("/instances");
                }}
            />
        </PayPalScriptProvider>
        {error && (
            <div className="mt-3 rounded-lg border border-red-300 bg-red-50 px-4 py-3">
                <p className="text-sm text-red-700">
                    {error}
                </p>
            </div>
        )}
        </>
    );
}

export default PayPalButton;