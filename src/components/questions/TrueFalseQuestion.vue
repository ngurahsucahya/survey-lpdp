<template>
  <div class="truefalse-question">
    <label class="question-text">{{ question.text }}</label>

    <div class="options-container">
      <label class="option-label radio-option">
        <input
          type="radio"
          :value="true"
          :checked="modelValue === true"
          @change="$emit('update:modelValue', true)"
          class="option-input radio-input"
        />
        <span class="option-text">True</span>
      </label>

      <label class="option-label radio-option">
        <input
          type="radio"
          :value="false"
          :checked="modelValue === false"
          @change="$emit('update:modelValue', false)"
          class="option-input radio-input"
        />
        <span class="option-text">False</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: Object,
    modelValue: Boolean,
  },
};
</script>

<style scoped>
.truefalse-question {
  margin-bottom: 20px;
}

.question-text {
  display: block;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
}

.options-container {
  display: flex;
  gap: 16px;
}

.option-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: #f8f9fa;
  transition: background-color 0.2s;
}

.option-label:hover {
  background-color: #e9ecef;
}

.option-input {
  margin-right: 8px;
  width: 16px;
  height: 16px;
}

.option-text {
  font-size: 0.95rem;
  color: #495057;
}
</style>
