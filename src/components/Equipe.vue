<template>
  <div>
    <div id="equipe">
      <div>
        <h2>{{ prenom }}</h2>
        <img id="imge" :src="image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prenom: String,
    image: String,
  },
};
</script>

<style>
#imge {
  width: 150px;
  height: 200px;
}
</style>
