export default {
  addFavourite: ({ commit }, voice) => {
    commit('appendFavourite', voice);
  },
  removeFavourite: ({ commit }, voiceId) => {
    commit('deleteFavourite', voiceId);
  },
};
