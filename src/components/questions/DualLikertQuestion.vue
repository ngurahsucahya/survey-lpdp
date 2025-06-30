<template>
  <div v-if="question.dual_config">
    <table class="likert-table">
      <thead>
        <tr>
          <th></th>
          <th
            v-for="(desc, i) in question.dual_config.descriptors"
            :key="'head-' + i"
          >
            {{ desc }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ question.dual_config.row1Label }}</td>
          <td
            v-for="(desc, i) in question.dual_config.descriptors"
            :key="'r1-' + i"
          >
            <input
              type="radio"
              :name="`${question.id}-r1`"
              :value="i + 1"
              v-model="localValue.r1"
            />
          </td>
        </tr>
        <tr>
          <td>{{ question.dual_config.row2Label }}</td>
          <td
            v-for="(desc, i) in question.dual_config.descriptors"
            :key="'r2-' + i"
          >
            <input
              type="radio"
              :name="`${question.id}-r2`"
              :value="i + 1"
              v-model="localValue.r2"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div v-else>
    <p style="color: red">Konfigurasi Dual Likert tidak tersedia.</p>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      required: true,
    },
    modelValue: {
      type: Object,
      default: () => ({ r1: "", r2: "" }),
    },
  },
  computed: {
    localValue: {
      get() {
        return this.modelValue || { r1: "", r2: "" };
      },
      set(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
};
</script>

<style scoped>
.likert-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.likert-table th,
.likert-table td {
  border: 1px solid #ccc;
  text-align: center;
  padding: 6px;
}

.likert-table th {
  background-color: #f2f2f2;
}
</style>
