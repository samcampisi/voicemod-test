<template>
  <div class="home-view-container">
    <h1>Voices</h1>
    <VoiceList
      v-if="favorites.length"
      title="Favorite Voices"
      :items="favorites"
    />
    <VoiceList title="Pro Voices" :items="voices" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VoiceList from '../components/VoiceList.vue';

export default {
  name: 'voices',
  components: {
    VoiceList,
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
  methods: {},
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
</style>
