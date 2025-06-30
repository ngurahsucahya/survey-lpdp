<template>
  <div>
    <div v-for="(option, index) in question.options" :key="index">
      <label>
        <input
          type="radio"
          :name="'question-' + question.id"
          :value="option"
          :checked="modelValue === option"
          @change="$emit('update:modelValue', option)"
        />
        {{ option }}
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultipleChoiceQuestion",
  props: {
    question: Object,
    modelValue: [String, Number],
  },
};
</script>
