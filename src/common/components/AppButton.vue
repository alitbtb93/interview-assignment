<template>
  <button
    @click="submit"
    :disabled="loading || disabled"
    :class="themeClass"
    class="app-button"
  >
    <app-loading v-if="loading" />
    <template v-else>
      {{ label }}
    </template>
  </button>
</template>

<script>
import AppLoading from "@/common/components/AppLoading";

export default {
  name: "AppButton",

  components: {
    AppLoading,
  },

  props: {
    theme: {
      type: String,
      required: false,
      default: "green",
    },
    label: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    loading: {
      type: Boolean,
      required: false,
    },
  },

  methods: {
    submit() {
      this.$emit("submit");
    },
  },

  computed: {
    themeClass() {
      switch (this.theme) {
        case "green":
          return "app-button--green";
        case "red":
          return "app-button--red";
        default:
          return "app-button--green";
      }
    },
  },
};
</script>

<style scoped>
.app-button {
  width: 100%;
  color: white;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  border: none;
  height: 2rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}
.app-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.app-button--green {
  background-color: var(--green);
}
.app-button--green:enabled:hover {
  background-color: var(--dark-green);
}
.app-button--red {
  background-color: var(--red);
}
.app-button--red:enabled:hover {
  background-color: var(--dark-red);
}
</style>
