<template>
  <div>
    <div class="memberContent" @click="userProfil">
      <img :src="profilePicture" />
      <p>{{ firstname }} {{ lastname }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Users",
  props: {
    firstname: String,
    lastname: String,
    userid: String,
    profilePicture: String,
  },
  methods: {
    userProfil() {
      /*On va sur la route qui mène au profil du user sur lequel on click */
      this.$router.push(`/Profil/${this.userid}`);
    },
  },
};
</script>

<style>
.memberContent {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.memberContent img {
  width: 40px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
