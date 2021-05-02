<template>
  <div id="inscription">
    <h3>Rejoignez la communauté Popote !</h3>
    <br />
    <label>Nom</label><br />
    <input
      type="text"
      name="nom"
      class="input"
      placeholder="Votre Nom"
      v-model="bodyContent.lastname"
    /><br /><br />
    <label>Prénom</label><br />
    <input
      type="text"
      name="prenom"
      class="input"
      placeholder="Votre Prénom"
      v-model="bodyContent.firstname"
    /><br /><br />
    <label>Mot De Passe</label><br />
    <input
      type="password"
      name="mdp"
      class="input"
      placeholder="Votre Mot De Passe"
      v-model="bodyContent.password"
    /><br /><br />
    <label>Email</label><br />
    <input
      type="text"
      name="email"
      class="input"
      placeholder="Votre Email"
      v-model="bodyContent.email"
    /><br /><br />
    <button class="btn" @click="call">Valider</button><br /><br /><br />
    <!--Appel de l'event personnalisé modif-ins lors du click sur le bouton-->
    <button class="btn" @click="$emit('modif-ins')">Retour</button>
  </div>
</template>

<script>
export default {
  name: "Inscription",
  data() {
    return {
      bodyContent: {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    call() {
      this.$emit("modif-ins");
      this.registerUser();
    },
    /*---REQUETE POST/login---*/
    async registerUser() {
      //Contenu de la requête
      const options = {
        method: "POST", // Verbe
        headers: {
          "Content-Type": "application/json", // En-tête du type de données envoyé
        },
        body: JSON.stringify(this.bodyContent), // Transforme le body en JSON et défini le body de la requête
      };
      //Appel de la requête
      try {
        /* Envoi de la requête */
        const response = await fetch(
          "https://popote-api.osc-fr1.scalingo.io/register",
          options
        );
        const data = await response.json(); // Lire la réponse au format JSON
        //Debbug
        console.log("Si true, c'est OK");
        console.log(data.success);
        console.log(data);
      } catch (error) {
        /* En cas d'erreur lors de l'exécutino de la requête */
        console.log(error);
      }
    },
  },
};
</script>

<style>
#inscription {
  padding-right: 150px;
  margin-top: 30px;
}
</style>
