<template>
  <div class="home-view-container">
    <h1>Voices</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "voices",
  data() {
    return {};
  },
  computed: {
    ...mapState(["voices", "favorites"]),
  },
  methods: {},
};
</script>
