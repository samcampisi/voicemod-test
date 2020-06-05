<template>
  <div class="home-view-container">
    <h1>Voices</h1>

    <b-container class="bv-example-row" fluid="sm">
      <b-row>
        <b-col
          v-for="(voice, index) in voices"
          :key="voice.name"
          class="col-6 col-md-3 col-lg-2 d-flex justify-content-center column-container"
        >
          <div
            class="item-container"
            @mouseover="hovering = index"
            @mouseout="hovering = null"
          >
            <div>
              <img
                class="icon"
                :class="[
                  selected && voice.name === selected.name && 'icon-selected',
                ]"
                :src="require(`@/assets/${voice.icon}`)"
                @click="selectVoice(voice)"
              />

              <transition name="fade">
                <div
                  class="favorite-container"
                  v-show="hovering === index"
                  @click="addFavorite(voice)"
                >
                  <img
                    :src="require(`@/assets/voice-favourite.svg`)"
                    class="favorite-icon"
                  />
                </div>
              </transition>
            </div>

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
      hovering: null,
    };
  },
  computed: {
    ...mapState(["voices", "favorites"]),
  },
  methods: {
    selectVoice(voice) {
      this.selected = voice;
      this.hovering = null;
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
.column-container {
  padding-top: 10px;
}
.item-container:hover {
  cursor: pointer;
}
.icon {
  background-color: #d2d2d2;
  border-radius: 50%;
  width: 110px;
  height: 110px;
  position: relative;
  z-index: 1;
}
.icon-selected {
  background-color: #2ed2ff;
}
.icon-text {
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
  color: #c5c5c5;
  text-align: center;
}
.favorite-container {
  position: absolute;
  width: 55px;
  height: 55px;
  background-color: #f6f6f6;
  z-index: 0;
  top: 5px;
  right: 5px;
  border-radius: 50%;
}
.favorite-icon {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 25px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
