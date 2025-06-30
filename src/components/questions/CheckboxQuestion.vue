<template>
  <div>
    <div v-for="option in question.options" :key="option">
      <input
        type="checkbox"
        :value="option"
        :checked="modelValue.includes(option)"
        @change="toggleOption(option)"
      />
      {{ option }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    toggleOption(option) {
      const newValue = [...this.modelValue];
      const index = newValue.indexOf(option);
      if (index === -1) {
        newValue.push(option);
      } else {
        newValue.splice(index, 1);
      }
      this.$emit("update:modelValue", newValue);
    },
  },
};
</script>
