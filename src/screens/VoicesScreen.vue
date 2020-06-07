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
        <b-navbar-nav class="ml-auto">
          <div class="dropdown-container">
            <img :src="require(`@/assets/filter.svg`)" class="select-icon" />
            <b-form-select
              id="selected-order"
              v-model="selectedOrder"
              :options="getOrdersList"
              class="dropdown"
              @change="onFieldChange($event, 'selectedOrder')"
            ></b-form-select>
          </div>

          <div class="dropdown-container">
            <img :src="require(`@/assets/order.svg`)" class="select-icon" />
            <b-form-select
              id="selected-category"
              v-model="selectedCategory"
              :options="getTagsList"
              class="dropdown"
              @change="onFieldChange($event, 'selectedCategory')"
            ></b-form-select>
          </div>

          <div
            @click="toggleRandom()"
            class="d-flex justify-content-center align-items-center random-button-container"
          >
            <img
              :src="require(`@/assets/button-random.svg`)"
              :class="['random-button', showRandom && 'random-button-selected']"
            />
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <VoiceList v-if="showRandom" title="Random Voice" :items="[randomItem]" />

    <VoiceList
      v-if="favorites.length"
      title="Favorite Voices"
      :items="favorites"
    />

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
    <div v-else-if="selectedCategory">
      <VoiceList
        :title="selectedCategory"
        :items="filterByTag(selectedCategory)"
      />
    </div>
    <div v-else>
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
      selectedOrder: null,
      selectedCategory: null,
      showRandom: false,
      randomItem: null,
    };
  },
  computed: {
    ...mapState(['voices', 'favorites']),
    ...mapGetters([
      'sortVoices',
      'getRandomVoice',
      'getTagsList',
      'filterByTag',
      'getOrdersList',
    ]),
  },
  methods: {
    search() {
      this.selectedOrder = null;
      this.selectedCategory = null;
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
    resetFields() {
      this.searchQuery = '';
      this.selectedCategory = null;
      this.selectedOrder = null;
    },
    onFieldChange(value, field) {
      this.resetFields();
      this[field] = value;
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
.random-button-container {
  padding-left: 10px;
  padding-right: 10px;
}
.random-button {
  padding: 5px;
}
.random-button-selected {
  background-color: #2ed2ff;
  border-radius: 50%;
}
.dropdown-container {
  display: flex;
  padding-bottom: 15px;
  padding-top: 15px;
}
.dropdown {
  /*container for custom dropdown arrow*/
  -webkit-appearance: none;
  -moz-appearance: window;
  padding: 2px 40px 2px 10px;
  border: none;
  border-radius: 8%;
  background-color: black;
  background-image: url('../assets/select-arrow.svg');
  background-size: 15px 15px;
  background-repeat: no-repeat;
  background-position: 95% center;
  color: #999999;
  min-width: 7vw;
}
.select-icon {
  padding-right: 7px;
  padding-left: 20px;
}
</style>
