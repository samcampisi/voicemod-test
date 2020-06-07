import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';
import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'voicemod-app',
  storage: window.localStorage,
});

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  plugins: [vuexPersist.plugin],
  modules: {},
});
