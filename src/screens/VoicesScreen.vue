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

          <b-nav-item href="#"
            ><img :src="require(`@/assets/button-random.svg`)"
          /></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div v-if="!searchQuery.length">
      <VoiceList
        v-if="favorites.length"
        title="Favorite Voices"
        :items="favorites"
      />
      <VoiceList title="Pro Voices" :items="voices" />
    </div>
    <div v-if="searchQuery.length">
      <VoiceList :title="`Results for ${searchQuery}`" :items="search()" />
    </div>
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
      searchQuery: '',
      selectedOrder: 'all',
      orderOptions: [
        { value: 'all', text: 'All' },
        { value: 'ascending', text: 'Ascending Order' },
        { value: 'descending', text: 'Descending Order' },
      ],
    };
  },
  computed: {
    ...mapState(['voices', 'favorites']),
  },
  methods: {
    search() {
      return this.voices.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    },
    resetSearch() {
      this.searchQuery = '';
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
</style>
