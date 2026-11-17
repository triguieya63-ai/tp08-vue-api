<script setup>
import { reactive, ref } from "vue";

const props = defineProps({
  titre: String,
  utilisateur: { type: Object, default: () => ({ nom: "", prenom: "" }) }
});
const emit = defineEmits(["enregistrer"]);

// copie locale : on ne modifie jamais la prop
const form = reactive({ nom: props.utilisateur.nom, prenom: props.utilisateur.prenom });
const erreur = ref("");

function valider() {
  if (!form.nom.trim() || !form.prenom.trim()) {
    erreur.value = "Le nom et le prénom sont obligatoires.";
    return;
  }
  emit("enregistrer", { nom: form.nom.trim(), prenom: form.prenom.trim() });
}
</script>

<template>
  <div class="carte">
    <RouterLink to="/" class="retour">← Retour à la liste</RouterLink>
    <h2>{{ titre }}</h2>

    <form @submit.prevent="valider">
      <label for="nom">Nom</label>
      <input id="nom" v-model="form.nom">

      <label for="prenom">Prénom</label>
      <input id="prenom" v-model="form.prenom">

      <p v-if="erreur" class="erreur">{{ erreur }}</p>

      <div class="boutons">
        <RouterLink to="/" class="btn">Annuler</RouterLink>
        <button class="btn btn-primaire">Enregistrer</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.carte { max-width: 420px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,.1); }
.retour { font-size: 13px; color: #2563eb; text-decoration: none; }
h2 { margin: 8px 0 16px; }
label { display: block; font-weight: bold; font-size: 13px; margin-top: 12px; }
input { width: 100%; padding: 8px; margin-top: 4px; box-sizing: border-box; }
.boutons { display: flex; justify-content: flex-end; gap: 8px; margin-top: 16px; }
.btn { padding: 6px 14px; border-radius: 4px; font-size: 13px; text-decoration: none; border: 1px solid #ccc; background: white; color: #111; cursor: pointer; }
.btn-primaire { background: #2563eb; color: white; border-color: #2563eb; }
.erreur { background: #ef4444; color: white; padding: 8px; border-radius: 4px; }
</style>