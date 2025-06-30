<template>
  <div class="home">
    <img alt="Logo LPDP" src="@/assets/logo_lpdp.png" class="logo" />
    <img alt="Logo IPB" src="@/assets/logo_ipb.jpg" class="logo" />
  </div>
  <div class="form-wrapper">
    <h2>Formulir Survei</h2>
    <input
      v-model="newField.label"
      placeholder="Tulis pertanyaan"
      class="input-field"
    />

    <select v-model="newField.type" class="select-field">
      <option disabled value="">Jenis Jawaban</option>
      <option value="shortText">Short Text</option>
      <option value="multipleChoice">Multiple Choice</option>
      <option value="longText">Long Text</option>
      <option value="dropdown">Dropdown</option>
    </select>

    <div
      v-if="newField.type === 'multipleChoice' || newField.type === 'dropdown'"
    >
      <label> Opsi: </label>
      <div
        v-for="(opt, index) in newField.options"
        :key="index"
        class="option-item"
      >
        <input
          v-model="newField.options[index]"
          placeholder="Tulis opsi..."
          class="input-field"
        />
        <button @click="removeField(index)" class="remove-button" title="Hapus">
          <i class="fas fa-trash"></i>
        </button>
      </div>
      <button @click="addOption" class="add-option-button">Tambah Opsi</button>
    </div>

    <br />

    <button @click="addField" class="primary-button">Simpan Pertanyaan</button>

    <hr />

    <h3>Daftar Pertanyaan</h3>
    <ul>
      <li
        v-for="(field, index) in formFields"
        :key="index"
        class="question-item"
      >
        {{ index + 1 }}. {{ field.label }} - ({{ field.type }})
        <button @click="removeField(index)" class="remove-button">Hapus</button>
      </li>
    </ul>

    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      formFields: [],
      newField: {
        label: "",
        type: "",
        model: "",
        options: [],
      },
    };
  },
  mounted() {
    const savedFormFields =
      JSON.parse(localStorage.getItem("formFields")) || [];
    this.formFields = savedFormFields;
  },
  methods: {
    addOption() {
      this.newField.options.push("");
    },
    removeOption(index) {
      this.newField.options.splice(index, 1);
    },
    addField() {
      if (!this.newField.label || !this.newField.type) {
        return alert("Pertanyaan dan jenis pertanyaan harus diisi!");
      }

      const modelName = this.newField.label.toLowerCase().replace(/\s+/g, "_");

      const newField = {
        id: Date.now(),
        label: this.newField.label,
        type: this.newField.type,
        model: modelName,
        options:
          this.newField.type === "shortText" ||
          this.newField.type === "longText"
            ? []
            : [...this.newField.options],
      };

      this.formFields.push(newField);
      localStorage.setItem("formFields", JSON.stringify(this.formFields));

      this.newField = {
        label: "",
        type: "",
        model: "",
        options: [],
      };
    },
    removeField(index) {
      this.formFields.splice(index, 1);
      localStorage.setItem("formFields", JSON.stringify(this.formFields));
    },
  },
};
</script>

<style scoped>
.form-wrapper {
  font-family: "Montserrat", sans-serif;
  background-color: #ffffff;
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
h3 {
  color: #333;
  font-size: 20px;
  margin-bottom: 15px;
}

.input-field,
.select-field {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.option-item {
  display: flex;
  gap: 10px;
  margin-bottom: 8px;
}

.primary-button,
.add-option-button,
.remove-button {
  margin-top: 1px;
  padding: 10px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.primary-button:hover,
.add-option-button:hover,
.remove-button:hover {
  background-color: #45a049;
}

.remove-button {
  background-color: #e74c3c;
}

.remove-button:hover {
  background-color: #c0392b;
}

ul {
  list-style: none;
  padding-left: 0;
}

.question-item {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
