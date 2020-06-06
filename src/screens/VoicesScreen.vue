<template>
  <div class="home-view-container col-12">
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
      class="nav-container col-12 col-lg-6 mx-auto"
    >
      <b-nav-form class="search-container">
        <img :src="require(`@/assets/search.svg`)" />
        <b-form-input
          size="sm"
          class="mr-sm-2 search-input"
          name="search-query"
          v-model="searchQuery"
        ></b-form-input>
        <img
          :src="require(`@/assets/search-close.svg`)"
          @click="resetSearch()"
          class="cancel-button"
        />
      </b-nav-form>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-form-select
            v-model="selectedOrder"
            :options="orderOptions"
          ></b-form-select>

          <b-nav-item
            @click="toggleRandom()"
            :class="[showRandom && 'random-button-selected']"
            ><img :src="require(`@/assets/button-random.svg`)"
          /></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <VoiceList v-if="showRandom" title="Random Voice" :items="[randomItem]" />
    <div v-if="searchQuery.length">
      <VoiceList :title="`Results for ${searchQuery}`" :items="search()" />
    </div>
    <div
      v-else-if="
        selectedOrder === 'ascending' || selectedOrder === 'descending'
      "
    >
      <VoiceList
        :title="`In ${selectedOrder} order`"
        :items="sortVoices(selectedOrder)"
      />
    </div>
    <div v-if="!searchQuery.length">
      <VoiceList
        v-if="favorites.length"
        title="Favorite Voices"
        :items="favorites"
      />
      <VoiceList title="Pro Voices" :items="voices" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import VoiceList from '../components/VoiceList.vue';

export default {
  name: 'voices',
  components: {
    VoiceList,
  },
  data() {
    return {
      searchQuery: '',
      selectedOrder: 'all',
      orderOptions: [
        { value: 'all', text: 'All' },
        { value: 'ascending', text: 'Ascending Order' },
        { value: 'descending', text: 'Descending Order' },
      ],
      showRandom: false,
      randomItem: null,
    };
  },
  computed: {
    ...mapState(['voices', 'favorites']),
    ...mapGetters(['sortVoices', 'getRandomVoice']),
  },
  methods: {
    search() {
      this.selectedOrder = 'all';
      return this.voices.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    },
    resetSearch() {
      this.searchQuery = '';
    },
    toggleRandom() {
      if (!this.showRandom) {
        this.randomItem = this.getRandomVoice();
      } else {
        this.randomItem = null;
      }
      this.showRandom = !this.showRandom;
    },
  },
};
</script>

<style scoped>
.home-view-container {
  background-color: #1b1b1b;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  min-height: 100vh;
}
.bg-info {
  background-color: #1b1b1b !important;
}
.search-container {
  background-color: black;
  border-radius: 20px;
  padding: 5px 15px 5px 5px;
}
.search-input {
  background-color: black;
  border: 0;
  color: #999999 !important;
}
.search-input:focus {
  background-color: black;
  border: 0;
}
.cancel-button:hover {
  cursor: pointer;
}
.random-button-selected {
  background-color: #2ed2ff;
  border-radius: 50%;
}
</style>
