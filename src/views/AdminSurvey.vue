<template>
  <div class="admin-survey">
    <h2>Admin Page</h2>

    <div v-for="(q, index) in questions" :key="q.id" class="question-card">
      <div v-if="!q.saved">
        <input v-model="q.text" placeholder="Tulis pertanyaan" />

        <select v-model="q.type">
          <option value="checkbox">Checkbox</option>
          <option value="truefalse">True/False</option>
          <option value="likert">Likert</option>
        </select>

        <div v-if="q.type === 'checkbox' || q.type === 'likert'">
          <div v-for="(opt, idx) in q.options" :key="idx" class="option-row">
            <input v-model="q.options[idx]" placeholder="Pilihan" />
            <button @click="q.options.splice(idx, 1)">✕</button>
          </div>
          <button class="btn small" @click="q.options.push('')">
            + Tambah Opsi
          </button>
        </div>

        <div class="btn-group">
          <button
            class="btn primary"
            @click="saveQuestion(index)"
            :disabled="!q.text.trim()"
          >
            Simpan
          </button>
        </div>
      </div>

      <div v-else>
        <p>
          <strong>{{ q.text }}</strong> ({{ q.type }})
        </p>

        <ul v-if="q.options.length">
          <li v-for="(opt, i) in q.options" :key="i">{{ opt }}</li>
        </ul>

        <div class="btn-group">
          <button class="btn" @click="editQuestion(index)">Edit</button>
          <button class="btn danger" @click="deleteQuestion(index)">
            Hapus
          </button>
        </div>
      </div>
    </div>

    <div class="btn-group">
      <button class="btn icon" @click="addQuestion">+ Tambah Pertanyaan</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminSurvey",
  data() {
    return {
      questions: [],
    };
  },
  mounted() {
    const saved = localStorage.getItem("surveyQuestions");
    if (saved) this.questions = JSON.parse(saved);
  },
  methods: {
    addQuestion() {
      const newId = Date.now();
      this.questions.push({
        id: newId,
        text: "",
        type: "checkbox",
        options: [],
        saved: false,
      });
    },
    saveQuestion(index) {
      this.questions[index].saved = true;
      this.saveToLocalStorage();
    },
    editQuestion(index) {
      this.questions[index].saved = false;
    },
    deleteQuestion(index) {
      this.questions.splice(index, 1);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      const savedQuestions = this.questions.filter((q) => q.saved);
      localStorage.setItem("surveyQuestions", JSON.stringify(savedQuestions));
    },
  },
};
</script>

<style scoped>
.admin-survey {
  max-width: 700px;
  margin: 40px auto;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.question-card {
  border: 1px solid #ccc;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 10px;
}

.option-row {
  display: flex;
  gap: 10px;
  margin-bottom: 5px;
}

.option-row input {
  flex: 1;
}

.btn-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background-color: #ccc;
  color: white;
  cursor: pointer;
  transition: 0.3s ease;
}

.btn:hover {
  background-color: #999;
}

.btn.primary {
  background-color: #42b983;
}

.btn.primary:hover {
  background-color: #369d6f;
}

.btn.danger {
  background-color: #e74c3c;
}

.btn.icon {
  font-size: 16px;
  padding: 10px 18px;
}

.btn.small {
  font-size: 12px;
  padding: 5px 10px;
  margin-top: 5px;
}
</style>
