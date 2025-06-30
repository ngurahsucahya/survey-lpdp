<template>
  <div class="home">
    <img alt="Logo LPDP" src="@/assets/logo_lpdp.png" class="logo" />
    <img alt="Logo IPB" src="@/assets/logo_ipb.jpg" class="logo" />
  </div>

  <div class="form-container">
    <h2>Survei LPDP 2025</h2>

    <form @submit.prevent="submitForm">
      <div v-for="section in groupedFields" :key="section.title">
        <h3>{{ section.title }}</h3>

        <div
          v-for="field in section.questions"
          :key="field.id"
          class="form-group"
        >
          <label>
            <span style="white-space: nowrap">{{ fieldIndex(field) }}. </span>
            <span>{{ field.text }}</span>
          </label>

          <component
            v-if="getComponent(field)"
            :is="getComponent(field)"
            :question="field"
            v-model="answers[field.id]"
          />

          <p v-else style="color: red">
            Tipe komponen tidak dikenali: {{ field.qtype }}
          </p>
        </div>
      </div>

      <button type="submit" class="submit-button">Submit Survei</button>
    </form>
  </div>
</template>

<script>
import ShortTextQuestion from "./questions/ShortTextQuestion.vue";
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion.vue";
import LongTextQuestion from "./questions/LongTextQuestion.vue";
import DropDownQuestion from "./questions/DropDownQuestion.vue";
import CheckBoxQuestion from "./questions/CheckboxQuestion.vue";
import LikertScaleQuestion from "./questions/LikertScaleQuestion.vue";
import TrueFalseQuestion from "./questions/TrueFalseQuestion.vue";
import DualLikertQuestion from "./questions/DualLikertQuestion.vue";

export default {
  components: {
    ShortTextQuestion,
    MultipleChoiceQuestion,
    LongTextQuestion,
    DropDownQuestion,
    CheckBoxQuestion,
    LikertScaleQuestion,
    TrueFalseQuestion,
    DualLikertQuestion,
  },
  data() {
    return {
      formFields: [],
      answers: {},
      sections: [],
    };
  },
  computed: {
    groupedFields() {
      const groups = {};
      this.formFields.forEach((field) => {
        const sectionName =
          this.sections.find((s) => s.id === field.section)?.name ||
          "Tanpa Bagian";
        if (!groups[sectionName]) groups[sectionName] = [];
        groups[sectionName].push(field);
      });
      return Object.keys(groups).map((title) => ({
        title,
        questions: groups[title],
      }));
    },
  },
  async mounted() {
    await this.loadSections();
    await this.loadForm();
  },
  methods: {
    async loadSections() {
      try {
        const res = await fetch("http://localhost:8000/api/sections/");
        const data = await res.json();
        this.sections = data;
      } catch (error) {
        console.error("Gagal mengambil data sections:", error);
        alert("Gagal mengambil daftar bagian dari server.");
      }
    },
    async loadForm() {
      try {
        const res = await fetch("http://localhost:8000/api/questions/");
        const data = await res.json();
        this.formFields = data;

        const newAnswers = {};
        data.forEach((field) => {
          if (field.qtype === "checkbox") {
            newAnswers[field.id] = [];
          } else if (field.qtype === "duallikert") {
            newAnswers[field.id] = { r1: "", r2: "" };
          } else {
            newAnswers[field.id] = "";
          }
        });
        this.answers = newAnswers;
      } catch (error) {
        console.error("Gagal mengambil data pertanyaan:", error);
        alert("Gagal mengambil pertanyaan dari server.");
      }
    },
    getComponent(field) {
      switch (field.qtype) {
        case "shortText":
          return "ShortTextQuestion";
        case "multipleChoice":
          return "MultipleChoiceQuestion";
        case "longText":
          return "LongTextQuestion";
        case "dropdown":
          return "DropDownQuestion";
        case "checkbox":
          return "CheckBoxQuestion";
        case "likert":
          return "LikertScaleQuestion";
        case "trueFalse":
          return "TrueFalseQuestion";
        case "duallikert":
          return "DualLikertQuestion";
        default:
          console.warn("Tipe field tidak dikenali:", field.qtype);
          return null;
      }
    },
    fieldIndex(field) {
      return this.formFields.indexOf(field) + 1;
    },
    async submitForm() {
      try {
        const payload = Object.entries(this.answers).map(
          ([questionId, response]) => ({
            question: parseInt(questionId),
            response,
          })
        );

        const res = await fetch("http://localhost:8000/api/answers/bulk/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          throw new Error("Gagal menyimpan jawaban");
        }

        alert("Jawaban berhasil disimpan ke server!");
      } catch (error) {
        console.error("Submit error:", error);
        alert("Terjadi kesalahan saat menyimpan jawaban.");
      }
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
  padding: 0 15px;
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
  text-align: left;
}

label {
  display: block;
  font-size: 16px;
  color: #333;
  margin-bottom: 8px;
  text-align: left;
}

.form-group {
  margin-bottom: 20px;
  text-align: left;
}

.submit-button {
  background-color: #ed7020;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
}

.submit-button:hover {
  background-color: #ed7020;
}

@media (max-width: 768px) {
  .form-container {
    padding: 10px;
  }
}

::v-deep input[type="text"],
::v-deep textarea,
::v-deep select {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  box-sizing: border-box;
}
</style>
