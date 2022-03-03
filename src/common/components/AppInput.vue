<template>
  <div class="app-input">
    <span v-if="label" class="app-input__heading">{{ label }}</span>
    <input
      class="app-input__input"
      :type="type"
      :min="min"
      :max="max"
      v-model="content"
      @input="emitInput($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "AppInput",

  props: {
    type: {
      type: String,
      required: true,
      default: "text",
    },
    value: {
      type: [String, Number],
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    min: {
      type: Number,
      required: false,
    },
    max: {
      type: Number,
      required: false,
    },
  },

  data() {
    return {
      content: this.value,
    };
  },

  watch: {
    value(newValue) {
      this.content = newValue;
    },
  },

  methods: {
    emitInput(value) {
      if ((this.max || this.max === 0) && parseInt(value) > this.max) {
        this.content = this.max;
        return;
      }
      if ((this.min || this.min === 0) && parseInt(value) < this.min) {
        this.content = this.min;
        return;
      }
      this.$emit("input", value);
    },
  },
};
</script>

<style scoped>
.app-input {
  display: flex;
  flex-direction: column;
}
.app-input__heading {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}
.app-input__input {
  border-radius: 0.25rem;
  border: solid 1px var(--silver);
  height: 2rem;
  padding: 0 0.5rem;
}
.app-input__input:focus {
  outline: none;
}
</style>
