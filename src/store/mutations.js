export default {
  appendFavorite: (state, voice) => {
    state.favorites.push(voice);
  },
  deleteFavorite: (state, voiceId) => {
    const index = state.favorites.findIndex(voice => voice.name === voiceId);
    if (index !== -1) {
      state.favorites.splice(index, 1);
    }
  },
};
