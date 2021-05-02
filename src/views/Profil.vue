<template>
  <div class="contentProfil">
    <div>
      <button v-if="displaySettingUser" class="btn" @click="modifsetting">
        MODIFIER PROFIL
      </button>
    </div>

    <div class="up">
      <img
        :src="profilInfo.profilePicture"
        alt="photo de profil"
        class="mainProfilPicture"
      />
      <h2>{{ profilInfo.firstname }} {{ profilInfo.lastname }}</h2>
    </div>
    <div class="flex">
      <div class="info">
        <h3>Informations</h3>
        <div class="infoProfil">
          <div>
            <img src="../assets/chef.png" alt="icone loc" />
            <p>{{ cooking }}</p>
          </div>
          <div>
            <img src="../assets/cake.png" alt="icone cake" />
            <p>{{ profilInfo.age }} ans</p>
          </div>
          <div>
            <img src="../assets/mail.png" alt="icone mail" />
            <p>{{ profilInfo.email }}</p>
          </div>
          <br />
        </div>
        <div class="friend"></div>
      </div>
      <div class="postContainer" v-if="setting == false">
        <Posts
          v-for="(value, index) in profilInfo.posts"
          :key="index"
          :profilpic="value.profilePicture"
          :name="value.firstname"
          :lastname="value.lastname"
          :userid="value.userId"
          :content="value.content"
          :postpic="value.image"
          :postid="value._id"
          :listcomment="value.comments"
          :listlike="value.likes"
          :categories="value.category"
          v-on:display-post="userrequest"
        />
      </div>
      <div v-if="setting == true">
        <EditProfil
          @annuler="hideedit"
          :firstname="profilInfo.firstname"
          :lastname="profilInfo.lastname"
          :age="profilInfo.age"
          :email="profilInfo.email"
        />
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import Posts from "../components/Posts.vue";
import EditProfil from "../components/EditProfil.vue";
export default {
  name: "Profil",
  components: {
    Posts,
    EditProfil,
  },
  methods: {
    /*Modificafation de la variable d'affichage*/
    modifsetting() {
      this.setting = true;
    },
    hideedit() {
      this.setting = false;
      this.userrequest();
    },
    /*---REQUETE GET/user/:id, permet d'afficher la view profil d'un user avec son userid
    soit lorsqu'on click sur les membres (view actu), soit si on click sur profil---*/
    async userrequest() {
      const options = {
        methods: "GET",
        headers: {
          Authorization: "bearer " + this.token,
        },
      };
      const response = await fetch(
        `https://popote-api.osc-fr1.scalingo.io/user/${this.url}?id=${this.url}`,
        options
      );
      const data = await response.json();
      console.log("info user");
      console.log(data);

      //Affichage du niveau de cuisine
      this.profilInfo = data;
      if (this.profilInfo.cookingLevel == "beginner") {
        this.cooking = "Plats Surgelés";
      } else if (this.profilInfo.cookingLevel == "intermediate") {
        this.cooking = "Pâtes au beurre";
      } else if (this.profilInfo.cookingLevel == "advanced") {
        this.cooking = "Diner aux chandelles";
      } else {
        this.cooking = "Appelez moi Chef";
      }
    },
    /*---REQUETE GET/user, permet de récuperer les données du user connecté, permet de vérfifier si on est
    sur le profil de la personne connecté pour afficher ou non le bouton de réglage des setting---*/
    async displaySetting() {
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
      this.useridConnected = datauser._id;
      /*Si le user id de la personne connectée est = au userid dans l'url, on modifie la variable d'affichage*/
      if (this.useridConnected == this.url) {
        this.displaySettingUser = true;
      }
    },
  },
  data() {
    return {
      displaySettingUser: false, //Variable d'affichage
      setting: false, //Variable d'affichage
      cooking: "",
      profilInfo: {},
      token: localStorage.getItem("token"), //Récupération du token
      url: this.$route.params.userid, //Récupération du userid dans l'url
      useridConnected: "",
    };
  },
  //On lance les requetes
  mounted() {
    this.userrequest();
    this.displaySetting();
  },
};
</script>

<style scoped>
.contentProfile {
  display: flex;
  flex-wrap: wrap;
}
.up {
  width: 100%;
}
.up img {
  width: 10vw;
}

.info {
  width: 40%;
}
.info .infoProfil {
  text-align: left;
  width: 40%;
  margin-left: auto;
  margin-right: auto;
}
.info .infoProfil img {
  width: 30px;
  margin-right: 20px;
}
.info .infoProfil p {
  display: inline-block;
  position: relative;
  top: -8px;
}
.postContainer {
  width: 50%;
}

.btn {
  width: 100px;
  height: 35px;
  margin-left: 1080px;
  margin-top: 20px;
}
.flex {
  display: flex;
}
.mainProfilPicture {
  border-radius: 50%;
}
</style>
