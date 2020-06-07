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
  getRandomVoice: state => {
    return () => state.voices[Math.floor(Math.random() * state.voices.length)];
  },
  getTagsList: state => {
    // Get all the categories by taking just the tags field for every voice
    const allCategories = state.voices.map(item => item.tags).flat();
    // Remove repetitions with a set
    const uniqueCategories = new Set(allCategories);
    // Format the categories so that they have a name starting with uppercase to look better
    const formattedCategories = Array.from(uniqueCategories).map(item => ({
      value: item,
      text: `${item[0].toUpperCase()}${item.substr(1)}`,
    }));
    return [{ value: null, text: 'All' }, ...formattedCategories];
  },
  filterByTag: state => {
    return tag => {
      return state.voices.filter(item => item.tags.some(t => t === tag));
    };
  },
  getOrdersList: () => [
    { value: null, text: 'All' },
    { value: 'ascending', text: 'Ascending Order' },
    { value: 'descending', text: 'Descending Order' },
  ],
};
