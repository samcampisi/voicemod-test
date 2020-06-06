export default {
  sortVoices: state => {
    return order => {
      let voices = [...state.voices];
      if (order === 'ascending') {
        voices.sort(function(a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      } else if (order === 'descending') {
        voices.sort(function(a, b) {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        });
      }
      return voices;
    };
  },
};
