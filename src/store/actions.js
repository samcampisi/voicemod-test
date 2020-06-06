export default {
  addFavorite: ({ commit }, voice) => {
    commit('appendFavorite', voice);
  },
  removeFavorite: ({ commit }, voiceId) => {
    commit('deleteFavorite', voiceId);
  },
};
