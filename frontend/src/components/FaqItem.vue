<template>
  <div class="faq-item" :class="{ active: isActive }">
    <div class="faq-question" @click="toggleActive">
      <span>{{ question }}</span>
      <svg
        class="arrow"
        :class="arrowClass"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline :points="arrowDirection"></polyline>
      </svg>
    </div>
    <div class="faq-answer">
      {{ answer }}
    </div>
  </div>
</template>

<script>
export default {
  name: "FaqItem",
  props: {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      default: "up",
      validator: (value) => ["up", "down"].includes(value),
    },
    activeItem: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    isActive() {
      return this.activeItem === this.id;
    },
    arrowClass() {
      return {
        "arrow-up": this.direction === "up",
        "arrow-down": this.direction === "down",
      };
    },
    arrowDirection() {
      return this.direction === "up" ? "18 15 12 9 6 15" : "6 9 12 15 18 9";
    },
  },
  methods: {
    toggleActive() {
      this.$emit("toggle", this.id);
    },
  },
};
</script>

<style scoped>
.faq-item {
  background-color: #ed722e;
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.faq-question {
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  color: #ffffff;
  font-weight: 700;
  font-size: 1.1rem;
  transition: background-color 0.3s;
}

.faq-question:hover {
  background-color: #e06726;
}

.faq-answer {
  padding: 0 24px 0 40px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  color: #ffffff;
  font-size: 1rem;
  line-height: 1.6;
}

.faq-item.active .faq-answer {
  padding: 0 24px 20px 40px;
  max-height: 300px;
}

.arrow {
  width: 24px;
  height: 24px;
  transition: transform 0.3s;
}

.faq-item.active .arrow-up,
.faq-item.active .arrow-down {
  transform: rotate(180deg);
}

/* Responsive Design */
@media (max-width: 768px) {
  .faq-question {
    padding: 16px 20px;
    font-size: 1rem;
  }

  .faq-answer {
    padding: 0 20px 0 30px;
    font-size: 0.95rem;
  }

  .faq-item.active .faq-answer {
    padding: 0 20px 20px 30px;
  }

  .arrow {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 480px) {
  .faq-question {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.95rem;
  }

  .faq-answer {
    padding: 0 16px 0 24px;
    font-size: 0.9rem;
  }

  .faq-item.active .faq-answer {
    padding: 0 16px 20px 24px;
  }

  .arrow {
    align-self: flex-end;
  }
}
</style>
