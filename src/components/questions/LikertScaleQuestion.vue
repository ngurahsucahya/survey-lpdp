<template>
  <div>
    <!-- Dual Likert Mode -->
    <div v-if="isDual && hasDescriptors">
      <div>
        <label>{{ row1Label }}</label>
        <div>
          <label v-for="n in 5" :key="'imp-' + n">
            <input
              type="radio"
              :value="n"
              :checked="modelValue?.importance === n"
              @change="update('importance', n)"
            />
            {{ n }}
          </label>
        </div>
      </div>

      <div>
        <label>{{ row2Label }}</label>
        <div>
          <label v-for="n in 5" :key="'sat-' + n">
            <input
              type="radio"
              :value="n"
              :checked="modelValue?.satisfaction === n"
              @change="update('satisfaction', n)"
            />
            {{ n }}
          </label>
        </div>
      </div>
    </div>

    <!-- Jika dual_config tidak lengkap -->
    <p v-else-if="isDual && !hasDescriptors" style="color: red">
      Konfigurasi dual_config tidak lengkap (harus 5 deskriptor).
    </p>

    <!-- Single Likert Mode -->
    <div v-else>
      <div>
        <label v-for="i in 5" :key="i">
          <input
            type="radio"
            :value="i"
            :checked="modelValue?.scale === i"
            @change="updateScale(i)"
          />
          {{ i }}
        </label>
      </div>
      <textarea
        :value="modelValue?.suggestion || ''"
        @input="updateSuggestion($event.target.value)"
        placeholder="Tambahkan saran..."
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "LikertQuestionCombined",
  props: {
    question: Object,
    modelValue: Object,
  },
  computed: {
    isDual() {
      return this.question?.dual_config !== undefined;
    },
    hasDescriptors() {
      return (
        this.question.dual_config &&
        Array.isArray(this.question.dual_config.descriptors) &&
        this.question.dual_config.descriptors.length === 5
      );
    },
    row1Label() {
      return this.question.dual_config?.row1Label || "Tingkat Kepentingan";
    },
    row2Label() {
      return this.question.dual_config?.row2Label || "Tingkat Kepuasan";
    },
  },
  methods: {
    // Untuk dual likert
    update(key, value) {
      const current = this.modelValue || {};
      const updated = {
        ...current,
        [key]: value,
        isValid:
          (key === "importance"
            ? value !== null
            : current.importance !== undefined &&
              current.importance !== null) &&
          (key === "satisfaction"
            ? value !== null
            : current.satisfaction !== undefined &&
              current.satisfaction !== null),
      };
      this.$emit("update:modelValue", updated);
    },

    // Untuk single likert
    updateScale(newScale) {
      const suggestion = this.modelValue?.suggestion || "";
      const isValid =
        newScale !== 1 || (newScale === 1 && suggestion.trim() !== "");
      this.$emit("update:modelValue", {
        scale: newScale,
        suggestion,
        isValid,
      });
    },
    updateSuggestion(newSuggestion) {
      const scale = this.modelValue?.scale ?? null;
      const isValid =
        scale !== 1 || (scale === 1 && newSuggestion.trim() !== "");
      this.$emit("update:modelValue", {
        scale,
        suggestion: newSuggestion,
        isValid,
      });
    },
  },
};
</script>
