<template>
  <div class="survey-container">
    <div class="survey-header">
      <h2 class="survey-title">Survey LPDP</h2>
      <p class="survey-description">
        We value your feedback. Please take a moment to complete this survey.
      </p>
    </div>

    <div class="questions-container">
      <div
        v-for="(q, index) in questions"
        :key="q.id"
        class="question-card"
        :class="{ 'last-question': index === questions.length - 1 }"
      >
        <div class="question-header">
          <span class="question-number">Q{{ index + 1 }}.</span>
          <h3 class="question-text">{{ q.text }}</h3>
        </div>

        <component
          :is="questionComponent(q.type)"
          :question="q"
          @update-answer="updateAnswer"
          class="question-component"
        />
      </div>
    </div>

    <div class="survey-footer">
      <button
        @click="submitSurvey"
        class="submit-button"
        :disabled="!isFormValid"
      >
        Submit Survey
      </button>
      <p v-if="!isFormValid" class="completion-message">
        Please answer all questions before submitting.
      </p>
    </div>
  </div>
</template>

<script>
import CheckboxQuestion from "@/components/questions/CheckboxQuestion.vue";
import TrueFalseQuestion from "@/components/questions/TrueFalseQuestion.vue";
import LikertScaleQuestion from "@/components/questions/LikertScaleQuestion.vue";

export default {
  components: {
    CheckboxQuestion,
    TrueFalseQuestion,
    LikertScaleQuestion,
  },
  data() {
    return {
      questions: [],
      answers: {},
    };
  },
  mounted() {
    const saved = localStorage.getItem("surveyQuestions");
    if (saved) this.questions = JSON.parse(saved);
  },
  computed: {
    isFormValid() {
      return (
        this.questions.length === Object.keys(this.answers).length &&
        Object.values(this.answers).every((a) => a.isValid !== false)
      );
    },
  },
  methods: {
    questionComponent(type) {
      return {
        checkbox: "CheckboxQuestion",
        truefalse: "TrueFalseQuestion",
        likert: "LikertScaleQuestion",
      }[type];
    },
    updateAnswer({ id, answer }) {
      this.answers = {
        ...this.answers,
        [id]: answer,
      };
    },
    submitSurvey() {
      console.log("Survey Answers:", this.answers);
      alert("Thank you for completing our survey!");
      this.answers = {};
    },
  },
};
</script>

<style scoped>
.survey-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
}

.survey-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eaeaea;
}

.survey-title {
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.survey-description {
  color: #7f8c8d;
  font-size: 1rem;
}

.questions-container {
  margin-bottom: 2rem;
}

.question-card {
  background: white;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.question-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.question-card.last-question {
  margin-bottom: 0;
}

.question-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
}

.question-number {
  font-weight: bold;
  color: #369d6f;
  margin-right: 0.5rem;
  font-size: 1.1rem;
}

.question-text {
  color: #34495e;
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.4;
}

.question-component {
  margin-left: 1.8rem;
}

.survey-footer {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #eaeaea;
}

.submit-button {
  background-color: #369d6f;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 500;
}

.submit-button:hover {
  background-color: #369d6f;
}

.submit-button:disabled {
  background-color: #bdc3c7;
  cursor: not-allowed;
}

.completion-message {
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .survey-container {
    padding: 1rem;
  }

  .question-header {
    flex-direction: column;
  }

  .question-number {
    margin-bottom: 0.3rem;
  }

  .question-component {
    margin-left: 0;
  }
}
</style>
