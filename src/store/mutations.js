export default {
  appendFavourite: (state, voice) => {
    state.favourites.push(voice);
  },
  deleteFavourite: (state, voiceId) => {
    const index = state.favourites.findIndex(voice => voice.name === voiceId);
    if (index !== -1) {
      state.favourites.splice(index, 1);
    }
  },
};
