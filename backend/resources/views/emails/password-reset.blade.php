<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Réinitialisation de votre mot de passe</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 0;">
<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 5px 15px rgba(0,0,0,.08);">

<tr>
<td style="background:#2563eb;padding:30px;text-align:center;">
<h1 style="margin:0;color:white;font-size:30px;">
⚡ HostBuster
</h1>
<p style="margin-top:8px;color:#dbeafe;font-size:15px;">
Plateforme d'hébergement d'applications
</p>
</td>
</tr>

<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#111827;">
Réinitialisation du mot de passe
</h2>

<p style="font-size:16px;color:#4b5563;line-height:1.7;">
Bonjour,
</p>

<p style="font-size:16px;color:#4b5563;line-height:1.7;">
Vous avez demandé la réinitialisation du mot de passe de votre compte
HostBuster.
</p>

<p style="font-size:16px;color:#4b5563;line-height:1.7;">
Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe.
</p>

<div style="text-align:center;margin:40px 0;">
<a href="{{ $url }}"
style="
background:#2563eb;
color:white;
text-decoration:none;
padding:16px 34px;
border-radius:8px;
font-weight:bold;
display:inline-block;
">
Réinitialiser mon mot de passe
</a>
</div>

<p style="font-size:15px;color:#6b7280;">
Ce lien expirera dans
<strong>{{ config('auth.passwords.users.expire') }} minutes</strong>.
</p>

<p style="font-size:15px;color:#6b7280;">
Si vous n'êtes pas à l'origine de cette demande,
vous pouvez simplement ignorer cet e-mail.
</p>

<hr style="border:none;border-top:1px solid #e5e7eb;margin:35px 0;">

<p style="font-size:13px;color:#9ca3af;">
Si le bouton ne fonctionne pas, copiez-collez ce lien dans votre navigateur :
</p>

<p style="word-break:break-all;font-size:13px;color:#2563eb;">
{{ $url }}
</p>

</td>
</tr>

<tr>
<td style="background:#f9fafb;padding:20px;text-align:center;font-size:13px;color:#9ca3af;">
© {{ date('Y') }} HostBuster — Tous droits réservés.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>