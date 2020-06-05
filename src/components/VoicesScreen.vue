<template>
  <div class="home-view-container">
    <h1>Voices</h1>

    <b-container class="bv-example-row col-xs-12" fluid="sm">
      <b-row>
        <b-col v-for="voice in voices" :key="voice.name" class="col-6 col-md-2">
          <div class="item-container">
            <img
              class="icon"
              :class="[
                selected && voice.name === selected.name && 'icon-selected',
              ]"
              :src="require(`@/assets/${voice.icon}`)"
              @click="selectVoice(voice)"
            />

            <p class="icon-text">{{ voice.name }}</p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "voices",
  data() {
    return {
      selected: null,
    };
  },
  computed: {
    ...mapState(["voices", "favorites"]),
  },
  methods: {
    selectVoice(voice) {
      this.selected = voice;
    },
  },
};
</script>

<style scoped>
.home-view-container {
  background-color: black;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
.item-container {
  margin: 15;
}
.icon {
  background-color: #ededed;
  border-radius: 50%;
  border: 5px solid transparent;
}
.icon:hover {
  background-color: lightblue;
  cursor: pointer;
}
.icon-selected {
  border: 5px solid #2ed2ff;
}
.icon-text {
  margin-top: 5px;
  font-size: 15px;
  font-weight: 600;
  color: #ededed;
  text-align: center;
}
</style>
