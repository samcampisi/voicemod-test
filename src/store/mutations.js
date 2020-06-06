export default {
  appendFavorite: (state, voice) => {
    state.favorites.set(voice.name, voice);
  },
  deleteFavorite: (state, voiceId) => {
    state.favorites.delete(voiceId);
  },
};
