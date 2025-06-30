<template>
  <div>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      rows="4"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
    modelValue: String,
  },
};
</script>
