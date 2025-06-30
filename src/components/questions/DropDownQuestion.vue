<template>
  <div>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option disabled value="">-- Pilih --</option>
      <option
        v-for="(option, index) in question.options"
        :key="index"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "DropDownQuestion",
  props: {
    question: Object,
    modelValue: [String, Number],
  },
};
</script>
