import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useRef } from "react";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";

type PayPalButtonProps = {
    applicationId: number;
    offerId: number;
    onSuccess?: () => void;
};
//, onSuccess
function PayPalButton({ applicationId, offerId}: PayPalButtonProps) {
    const token = localStorage.getItem("token");
    const localOrderId = useRef<number | null>(null);
    const navigate = useNavigate();

    return (
        <PayPalScriptProvider
            options={{
                clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
                currency: "EUR",
            }}
        >
            <PayPalButtons
                createOrder={async () => {
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
                        }),
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.message || "Erreur création commande");
                    }

                    localOrderId.current = data.order_id;

                    return data.paypal_order_id;
                }}
                onApprove={async () => {
                    if (!localOrderId.current) {
                        alert("Commande introuvable");
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
                        alert(result.message || "Erreur paiement");
                        return;
                    }

                    // alert("Paiement validé !");
                    // onSuccess?.();
                    navigate("/instances");
                }}
            />
        </PayPalScriptProvider>
    );
}

export default PayPalButton;