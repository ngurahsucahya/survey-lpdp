<template>
  <div class="home">
    <img alt="Logo LPDP" src="@/assets/logo_lpdp.png" class="logo" />
    <img alt="Logo IPB" src="@/assets/logo_ipb.jpg" class="logo" />
  </div>
  <div class="form-container">
    <h2>Survei LPDP 2025</h2>

    <form @submit.prevent="submitForm">
      <div v-for="(field, index) in formFields" :key="index" class="form-group">
        <label>{{ index + 1 }}. {{ field.label }}</label>

        <!-- Short Text -->
        <div v-if="field.type === 'shortText'">
          <input
            v-model="answers[field.model]"
            type="text"
            :placeholder="' ' + field.label"
            class="input-field"
          />
        </div>

        <!-- Multiple Choice -->
        <div v-if="field.type === 'multipleChoice'">
          <div
            v-for="(option, optIndex) in field.options"
            :key="optIndex"
            class="option"
          >
            <input
              type="radio"
              :name="field.model"
              :value="option"
              v-model="answers[field.model]"
              class="radio-button"
            />
            {{ option }}
          </div>
        </div>

        <!-- Long Text -->
        <div v-if="field.type === 'longText'">
          <textarea
            v-model="answers[field.model]"
            :placeholder="'' + field.label"
            class="textarea-field"
          ></textarea>
        </div>

        <!-- Dropdown -->
        <div v-if="field.type === 'dropdown'">
          <select v-model="answers[field.model]" class="select-field">
            <option
              v-for="(option, optIndex) in [...field.options].sort()"
              :key="optIndex"
              :value="option"
            >
              {{ option }}
            </option>
          </select>
        </div>
      </div>

      <button type="submit" class="submit-button">Submit Survei</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formFields: [],
      answers: {},
    };
  },
  mounted() {
    const savedFormFields =
      JSON.parse(localStorage.getItem("formFields")) || [];
    this.formFields = savedFormFields;

    // Inisialisasi jawaban default
    this.formFields.forEach((field) => {
      this.answers[field.model] = "";
    });
  },
  methods: {
    submitForm() {
      console.log("Jawaban:", this.answers);
      alert("Jawaban berhasil dikirim!");
    },
  },
};
</script>

<style scoped>
.form-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  margin: 20px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-top: 15px;
}

.home {
  text-align: center;
  padding: 0px 15px;
}

.logo {
  max-width: 400px;
  margin: 20px;
  height: 100px;
}

h2 {
  color: #333;
  font-size: 20px;
  margin-bottom: 15px;
  margin-top: 3px;
}

label {
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
}

.input-field,
.textarea-field,
.select-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 14px;
  box-sizing: border-box;
}

.textarea-field {
  height: 150px;
  resize: vertical;
}

.option {
  margin: 5px 0;
}

.radio-button {
  margin-right: 8px;
}

.submit-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

.submit-button:hover {
  background-color: #45a049;
}

@media (max-width: 768px) {
  .form-container {
    padding: 10px;
  }
}
</style>
