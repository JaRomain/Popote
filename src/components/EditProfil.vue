<template>
  <div id="edit">
    <h2 class="titleSetting">Modifier mon Profil</h2>
    <br />
    <label>Prénom</label><br />
    <input
      type="text"
      name="prenom"
      class="input"
      :placeholder="firstname"
      v-model="bodyContent.firstname"
    /><br /><br />
    <label>Nom</label>
    <br />
    <input
      type="text"
      name="nom"
      class="input"
      :placeholder="lastname"
      v-model="bodyContent.lastname"
    /><br />
    <br />
    <label>Photo de profil</label><br />
    <input
      type="text"
      name="prenom"
      class="input"
      placeholder="Lien vers une photo"
      v-model="bodyContent.profilePicture"
    /><br /><br />
    <label>Age</label><br />
    <input
      type="text"
      name="loc"
      class="input"
      :placeholder="age"
      v-model="bodyContent.age"
    />
    <br />
    <br />
    <label>Mail</label><br />
    <input
      type="mail"
      name="mail"
      class="input"
      :placeholder="email"
      v-model="bodyContent.email"
    />
    <br />
    <br />

    <label for="niveau-select">Niveau en Cuisine</label><br />
    <select
      name="niveau"
      id="niveau-select"
      v-model="bodyContent.cookingLevel"
      class="input select"
    >
      <option value="" disabled>--Choisissez Votre Niveau en Cuisine--</option>
      <option value="beginner">Plats Surgelés</option>
      <option value="intermediate">Pâtes au beurre</option>
      <option value="advanced">Diner aux chandelles</option>
      <option value="expert">Appelez moi Chef</option>
    </select>
    <br />
    <br />
    <button class="btn btnSetting" @click="editProfil">VALIDER</button>
    <br />
    <button class="btn btnSetting" @click="$emit('annuler')">ANNULER</button>
    <br />
  </div>
</template>
''
<script>
export default {
  name: "EditProfil",
  props: {
    firstname: String,
    lastname: String,
    age: Number,
    email: String,
  },
  data() {
    return {
      bodyContent: {
        firstname: "",
        lastname: "",
        profilePicture: "",
        age: "",
        email: "",
        cookingLevel: "",
      },
      token: localStorage.getItem("token"), //Récupération du token
    };
  },
  methods: {
    async editProfil() {
      const options = {
        method: "PUT", // Verbe
        headers: {
          "Content-Type": "application/json", // En-tête du type de données envoyé
          Authorization: "bearer " + this.token,
        },
        body: JSON.stringify(this.bodyContent), // Transforme le body en JSON et défini le body de la requête
      };
      console.log(options);
      try {
        /* Envoi de la requête */
        const response = await fetch(
          "https://popote-api.osc-fr1.scalingo.io/user",
          options
        );

        const data = await response.json(); // Lire la réponse au format JSON

        //Debug et confirmation
        console.log("Si true, c'est OK");
        console.log(data.success);
        console.log(data);

        //Event personnaliser pour modifier le boolean et cacher les réglages
        this.$emit("annuler");
      } catch (error) {
        /* En cas d'erreur lors de l'exécutino de la requête */
        console.log(error);
      }
    },
  },
};
</script>

<style>
.titleSetting {
  margin-top: 5%;
}
.btnSetting {
  margin-top: 5%;
  margin-bottom: 5%;
}
.select {
  width: 100%;
  color: #9e2a2b;
}
</style>
