<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Échec du déploiement</title>
</head>
<body style="margin:0;padding:0;background:#f5f7fb;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;padding:40px 0;">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,.08);">

<tr>
<td style="background:#dc2626;color:white;padding:25px;text-align:center;">
<h1 style="margin:0;">HostBuster</h1>
<p style="margin-top:10px;font-size:18px;">
❌ Échec du déploiement de votre instance
</p>
</td>
</tr>

<tr>
<td style="padding:35px;color:#333;line-height:1.7;">

<p>Bonjour <strong>{{ $instance->user->prenom ?? $instance->user->nom ?? '' }}</strong>,</p>

<p>
Nous sommes désolés, mais une erreur est survenue lors du déploiement de votre instance.
Le service n'a donc pas pu être créé correctement.
</p>

<table width="100%" cellpadding="10" cellspacing="0" style="margin:30px 0;border-collapse:collapse;border:1px solid #e5e7eb;">

<tr style="background:#f9fafb;">
<td><strong>Nom de l'instance</strong></td>
<td>{{ $instance->name }}</td>
</tr>

<tr>
<td><strong>Statut</strong></td>
<td style="color:#dc2626;font-weight:bold;">
Erreur de déploiement
</td>
</tr>

<tr style="background:#f9fafb;">
<td><strong>Date de la demande</strong></td>
<td>{{ optional($instance->created_at)->format('d/m/Y à H:i') }}</td>
</tr>

</table>

<div style="background:#fef2f2;border-left:5px solid #dc2626;padding:18px;margin:25px 0;">
<strong>Que faire maintenant ?</strong>

<ul style="margin-top:10px;">
<li>Réessayez dans quelques minutes.</li>
<li>Si le problème persiste, contactez notre support.</li>
<li>Précisez le nom de votre instance afin de faciliter son diagnostic.</li>
</ul>
</div>

<p>
Notre équipe reste disponible pour vous accompagner.
</p>

<p>
Merci de votre confiance,<br>
<strong>L'équipe HostBuster</strong>
</p>

</td>
</tr>

<tr>
<td style="background:#f3f4f6;padding:20px;text-align:center;font-size:13px;color:#666;">
© {{ date('Y') }} HostBuster<br>
Cet e-mail a été envoyé automatiquement, merci de ne pas y répondre.
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>