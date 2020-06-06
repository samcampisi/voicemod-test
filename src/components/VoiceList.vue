<template>
  <b-container class="bv-example-row" fluid="sm">
    <div
      class="d-flex flex-row justify-content-center align-items-center title-container"
    >
      <h5 class="section-title">{{ title.toUpperCase() }}</h5>
      <div class="flex-grow-1 section-line"></div>
    </div>
    <b-row>
      <b-col
        v-for="(voice, index) in items"
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
              @click="toggleSelectedVoice(voice)"
            />

            <transition name="fade">
              <div
                class="favorite-container"
                v-show="hovering === index"
                @click="toggleFavorite(voice)"
              >
                <img
                  :src="
                    isFavorite(voice)
                      ? require(`@/assets/voice-favourite.svg`)
                      : require(`@/assets/voice-favourite-off.svg`)
                  "
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
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'voice-list',
  props: {
    title: String,
    items: Array,
  },
  data() {
    return {
      selected: null,
      hovering: null,
    };
  },
  computed: {
    ...mapState(['voices', 'favorites']),
  },
  methods: {
    ...mapActions(['addFavorite', 'removeFavorite']),
    toggleSelectedVoice(voice) {
      if (this.selected && this.selected.name === voice.name) {
        this.selected = null;
      } else {
        this.selected = voice;
      }
      this.hovering = null;
    },
    toggleFavorite(voice) {
      if (this.isFavorite(voice)) {
        this.removeFavorite(voice.name);
      } else {
        this.addFavorite(voice);
      }
    },
    isFavorite(voice) {
      return this.favorites.some(item => item.name === voice.name);
    },
  },
};
</script>

<style scoped>
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
.title-container {
  padding: 2%;
}
.section-title {
  font-weight: bold;
  margin-right: 15px;
  color: #999999;
}
.section-line {
  background-color: #505050;
  height: 1px;
}
</style>
