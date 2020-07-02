# Présentation
Réalisation d'un serveur IRC grâce à Node.js / Express.js / Socket.IO.

Ce projet est ma vraie première expérience avec React.js et aussi ma première introduction aux WebSockets notamment avec Socket.IO.

# [Live Demo](https://haonhien-my-irc.herokuapp.com/)



## Cahier des charges

Gestion des utilisateurs
  + Un système de connexion : l’utilisateur de votre site doit pouvoir se connecter en fournissant un nom d’utilisateur.
  + Tous les membres peuvent modifier leurs informations et ajouter des channels.
  + Le membre qui aura créé son channel pourra le supprimer et le modifier.

Gestion des channels
  + Chaque action (création et suppression) sur les channels et changement de pseudo enverra un message global visible sur tous les channels.
  + Un nouvel utilisateur se connectant à un channel devra envoyer un message visible sur ce channel.
  + Un channel devra s’auto supprimer si personne n’y a écrit depuis 2 jours (pour la soutenance mettre
5 minutes).
  + Les membres connectés à un channel devront pouvoir envoyer un message à tous les utilisateurs de
ce channel, et seulement à celui-ci.
  + Le serveur devra maintenir à jour la liste des utilisateurs connectés (les sockets) ainsi que des channels
(avec la listes des personnes connectées).
