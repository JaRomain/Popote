<template>
  <div id="connect">
    <h3>Préparez vous à entrer dans un monde de délices !</h3>
    <br />
    <label>Email</label>
    <input
      type="text"
      name="email"
      class="input"
      placeholder="Votre Email"
      v-model="bodyContent.email"
    /><br /><br />
    <label>Mot De Passe</label>
    <input
      type="password"
      name="mdp"
      class="input"
      placeholder="Votre Mot De Passe"
      v-model="bodyContent.password"
    /><br /><br />
    <button class="btn" @click="login">Connexion</button><br />
    <!--Appel de l'event personnalisé modif-connect lors du click sur le bouton-->
    <button class="btn" @click="$emit('modif-connect')">Inscription</button
    ><br /><br />
  </div>
</template>

<script>
export default {
  name: "Connect",
  data() {
    return {
      bodyContent: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    /*---REQUETE POST/login---*/
    async login() {
      const options = {
        method: "POST", // Verbe
        headers: {
          "Content-Type": "application/json", // En-tête du type de données envoyé
        },
        body: JSON.stringify(this.bodyContent), // Transforme le body en JSON et défini le body de la requête
      };
      //Appel de la requete
      try {
        /* Envoi de la requête */
        const response = await fetch(
          "https://popote-api.osc-fr1.scalingo.io/login",
          options
        );
        /*On stock la réponse (convertit en JSON) dans data*/
        const data = await response.json(); // Lire la réponse au format JSON
        //Stockage du token récupéré dans le localStorage
        localStorage.setItem("token", data.token);

        if (data.success) {
          //Envoie sur la page d'acceuil en cas de succes
          this.$router.replace("/Actu");
        } else {
          alert("Vous n'êtes pas inscrit.");
        }
      } catch (error) {
        /* En cas d'erreur lors de l'exécutino de la requête */
        console.log(error);
        //Affiche une alerte en cas d'erreur
        alert("Votre identifant/mot de passe sont incorrect");
      }
    },
  },
};
</script>

<style>
#connect {
  margin-top: 30px;
  margin-bottom: 10px;
  padding-right: 150px;
  display: flex;
  flex-flow: column wrap;
  align-content: flex-end;
}
input:focus,
button:focus {
  outline: none;
}
.input {
  width: 160px;
  height: 25px;
  margin: auto;
  background-color: #fff3b0;
  border: none;
  border-radius: 5px;
}
label {
  color: #9e2a2b;
}
::placeholder {
  color: #9e2a2b;
  opacity: 35%;
  text-align: center;
}
.btn {
  color: #9e2a2b;
  width: 80px;
  height: 25px;
  margin: auto;
  border-radius: 3px;
  border: none;
  background-color: #fff3b0;
  box-shadow: 0px 5px 0px #e09f3e;
  cursor: pointer;
}
.btn:active {
  background-color: #e8e8e4;
}
</style>
