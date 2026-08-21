// const { hostname, protocol } = window.location;
// export const API_URL = `${protocol}//${
//   hostname.startsWith('[') ? hostname : hostname.includes(':') ? `[${hostname}]` : hostname
// }:8080`;
//export const API_URL = window.location.origin;

export const API_URL = "";

export async function registerUser(data: {
    nom: string,
    prenom: string,
    email: string,
    password: string;
}) {
    const response = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(data),
    });
    const text = await response.text();
    if(!text) {
        return {
            message: "Réponse vide du serveur"
        };
    }
    return JSON.parse(text);
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/api/login`, { //TODO mettre vrai adresse IP
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function getMe() {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${API_URL}/api/me`, {
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    return response.json();
}

export async function updateMe(data: {
    nom: string;
    prenom: string;
    email: string;
}) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/api/me`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

export async function forgotPassword(data: {
    email: string;
}) {
    const response = await fetch("/api/mot-de-passe-oublie", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            email: data.email,
            frontend_url: window.location.origin,
        }),
    });

    const result = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            data: result,
        };
    }

    return result;
}

export async function resetPassword(data: {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
}) {
    const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        throw {
            status: response.status,
            data: result,
        };
    }

    return result;
}

export async function getInstanceUpgrades(instanceId: number) {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/api/instances/${instanceId}/upgrades`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ??
            "Impossible de récupérer les offres disponibles."
        );
    }

    return data;
}

export async function upgradeInstance(
    instanceId: number,
    applicationOfferId: number
) {
    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/api/instances/${instanceId}/upgrade`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                application_offer_id: applicationOfferId,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ??
            "Impossible de modifier cette instance."
        );
    }

    return data;
}

export async function deleteMe() {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/api/me`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    return response.json();
}