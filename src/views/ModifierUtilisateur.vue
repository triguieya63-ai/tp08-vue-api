<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import FormulaireUtilisateur from "../components/FormulaireUtilisateur.vue";

const props = defineProps({ id: String });
const API = "http://localhost:3000/utilisateurs";
const router = useRouter();

const utilisateur = ref(null);
const erreur = ref("");

onMounted(async () => {
  const reponse = await fetch(API + "/" + props.id);
  if (!reponse.ok) {
    erreur.value = "Utilisateur introuvable.";
    return;
  }
  utilisateur.value = await reponse.json();
});

async function modifier(donnees) {
  // on garde les autres champs (id, actif...) et on remplace nom/prénom
  await fetch(API + "/" + props.id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...utilisateur.value, ...donnees })
  });
  router.push("/");
}
</script>

<template>
  <p v-if="erreur" class="erreur">{{ erreur }}</p>
  <FormulaireUtilisateur
    v-if="utilisateur"
    titre="Modifier un utilisateur"
    :utilisateur="utilisateur"
    @enregistrer="modifier"
  />
</template>

<style scoped>
.erreur { background: #ef4444; color: white; padding: 8px; border-radius: 4px; }
</style>