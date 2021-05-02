<template>
  <div id="app">
    <div id="content">
      <div id="nav">
        <img src="./assets/logopopote.png" alt="logo" id="logonetwork" />
        <div id="contentright">
          <!--Routes qui se présente sous différentes façon 
          (router link : route habituelles / <p> pour pouvoir ajouter des conditions d'accès aux views)-->
          <router-link to="/Actu" class="link">
            <img src="./assets/maison.png" alt="logo maison" />
          </router-link>
          <router-link to="/" class="link">Connexion</router-link>
          <p @click="profilAccess" class="link">Profil</p>
          <p @click="disconection" class="link">Deconnexion</p>
        </div>
      </div>
      <!--Router-view, affiche la views de la route sur laquelle on a cliqué-->
      <router-view />
      <footer>
        <router-link to="/About">About</router-link>
        &copy;Team Popote
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //Récupération du token stocké dans le localstorage
      token: localStorage.getItem("token"),
    };
  },
  methods: {
    profilAccess() {
      this.token = localStorage.getItem("token");
      /*Condition sur le lien vers le profil, si pas de token,
      pas accès aux différents profils*/
      if (this.token == "null" || this.token == undefined) {
        console.log("le token est null ou pas de token !");
        console.log(this.token);
        alert("Vous devez être connecté pour acceder à votre profil.");
        this.$router.push("/");
      } else {
        this.userrequest();
      }
    },
    async userrequest() {
      //Requete pour récuperer le userid
      let token = localStorage.getItem("token");
      const responseuser = await fetch(
        "https://popote-api.osc-fr1.scalingo.io/user",
        { methods: "GET", headers: { Authorization: "bearer " + token } }
      );
      const datauser = await responseuser.json();
      /*console.log("info user pour CONNECT");
      console.log(datauser);
      console.log("je suis id");
      console.log(datauser._id);*/
      let userid = datauser._id;
      //Si on a le token, on peut aller sur le profil
      this.$router.push(`/Profil/${userid}`);
    },
    /*La deconnexion se fait en retirant le token du local storage
    comme ça les différentes requêtes qui en ont besoin ne peuvent plus fonctionner*/
    disconection() {
      localStorage.setItem("token", null);
      this.token = localStorage.getItem("token");
      //Renvoie sur la page d'acceuil lorsqu'on se déconnecte
      this.$router.push("/");
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fff3b0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
#content {
  background: linear-gradient(white, white, #faf6e0);
  width: 95vw;
  height: 90vh;
  border-radius: 50px;
  box-shadow: 10px 10px 10px #ebbe7c;
  overflow: scroll;
}
#nav {
  width: 100%;
  box-shadow: 10px 10px 10px #f7f5ef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.link {
  font-weight: bold;
  color: #2c3e50;
  cursor: pointer;
  display: inline-block;
  word-spacing: normal;
  margin-right: 35px;
  text-decoration: none;
}

#nav img {
  width: 40px;
}

#nav #logonetwork {
  width: 150px;
  margin-left: 40px;
  margin-top: 15px;
}

#nav #contentleft {
  width: 10%;
  text-align: left;
}

#nav #contentright {
  text-align: right;
  margin-right: 40px;
  display: flex;
  align-items: center;
}

footer {
  display: flex;
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-around;
}
.click {
  cursor: pointer;
}
textarea,
textarea::placeholder {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
