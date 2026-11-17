<script setup>
import { ref, computed, onMounted } from "vue";

const API = "http://localhost:3000/utilisateurs";

const utilisateurs = ref([]);
const erreur = ref("");
const recherche = ref("");   // Partie 2
const filtre = ref("tous");  // Partie 4 : tous | actifs | inactifs

// GET : récupérer les utilisateurs
async function charger() {
  try {
    const reponse = await fetch(API);
    if (!reponse.ok) throw new Error("HTTP " + reponse.status);
    utilisateurs.value = await reponse.json();
  } catch (e) {
    erreur.value = "Impossible de charger les utilisateurs.";
  }
}

// Partie 3 : inverser l'état et sauvegarder dans l'API
async function basculer(u) {
  erreur.value = "";
  try {
    const reponse = await fetch(API + "/" + u.id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actif: !u.actif })
    });
    if (!reponse.ok) throw new Error("HTTP " + reponse.status);
    u.actif = !u.actif;   // on met à jour l'affichage seulement si l'API a accepté
  } catch (e) {
    erreur.value = "Impossible de modifier l'état.";
  }
}

// Parties 2 + 4 : liste affichée = recherche ET filtre d'état
const utilisateursAffiches = computed(() => {
  const texte = recherche.value.trim().toLowerCase();

  return utilisateurs.value.filter(u => {
    const correspondTexte =
      u.nom.toLowerCase().includes(texte) ||
      u.prenom.toLowerCase().includes(texte);   // texte vide : tout passe

    const correspondEtat =
      filtre.value === "tous" ||
      (filtre.value === "actifs" && u.actif) ||
      (filtre.value === "inactifs" && !u.actif);

    return correspondTexte && correspondEtat;
  });
});

onMounted(charger);
</script>

<template>
  <div class="carte">
    <div class="entete">
      <div>
        <h2>Liste des utilisateurs</h2>
        <p class="aide">Gérez les comptes utilisateurs de l'application.</p>
      </div>
      <RouterLink to="/ajouter" class="btn btn-primaire">+ Ajouter un utilisateur</RouterLink>
    </div>

    <div class="outils">
      <input v-model="recherche" placeholder="Rechercher par nom ou prénom">
      <select v-model="filtre">
        <option value="tous">Tous</option>
        <option value="actifs">Actifs</option>
        <option value="inactifs">Inactifs</option>
      </select>
    </div>

    <p v-if="erreur" class="erreur">{{ erreur }}</p>

    <table>
      <thead>
        <tr>
          <th>Identifiant</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>État</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="u in utilisateursAffiches" :key="u.id">
          <td>{{ u.id }}</td>
          <td>{{ u.nom }}</td>
          <td>{{ u.prenom }}</td>
          <td>
            <span class="badge" :class="u.actif ? 'badge-actif' : 'badge-inactif'">
              ● {{ u.actif ? "Actif" : "Inactif" }}
            </span>
          </td>
          <td class="actions">
            <button class="btn" :class="u.actif ? 'btn-supprimer' : 'btn-modifier'" @click="basculer(u)">
              {{ u.actif ? "Désactiver" : "Activer" }}
            </button>
            <RouterLink :to="'/modifier/' + u.id" class="btn btn-modifier">Modifier</RouterLink>
            <RouterLink :to="'/supprimer/' + u.id" class="btn btn-supprimer">Supprimer</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="utilisateursAffiches.length === 0 && !erreur">Aucun utilisateur trouvé.</p>
  </div>
</template>

<style scoped>
.carte { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,.1); }
.entete { display: flex; justify-content: space-between; align-items: flex-start; }
h2 { margin: 0; }
.aide { color: #666; font-size: 14px; margin: 4px 0 16px; }
.outils { display: flex; gap: 8px; margin-bottom: 12px; }
.outils input { flex: 1; padding: 8px; }
.outils select { padding: 8px; }
table { width: 100%; border-collapse: collapse; }
th, td { text-align: left; padding: 10px; border-bottom: 1px solid #eee; }
th { font-size: 13px; color: #555; }
.actions { display: flex; gap: 8px; }
.btn { padding: 6px 12px; border-radius: 4px; font-size: 13px; text-decoration: none; border: 1px solid #ccc; cursor: pointer; background: white; }
.btn-primaire { background: #2563eb; color: white; border-color: #2563eb; }
.btn-modifier { color: #2563eb; border-color: #2563eb; }
.btn-supprimer { color: #dc2626; border-color: #dc2626; }
.badge { padding: 2px 10px; border-radius: 999px; font-size: 12px; font-weight: bold; }
.badge-actif { background: #dcfce7; color: #15803d; }
.badge-inactif { background: #e5e7eb; color: #4b5563; }
.erreur { background: #ef4444; color: white; padding: 8px; border-radius: 4px; }
</style>