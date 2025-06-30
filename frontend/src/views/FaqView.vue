<template>
  <div class="faq-section">
    <div class="container">
      <h1 class="faq-title">SOME FAQS</h1>
      <p class="faq-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        vestibulum sem vitae laoreet suscipit. Pellentesque velit magna,
        faucibus in justo sit amet, congue ornare lorem.
      </p>

      <div class="faq-container">
        <FaqItem
          v-for="faq in faqs"
          :key="faq.id"
          :id="faq.id"
          :question="faq.question"
          :answer="faq.answer"
          :direction="faq.direction"
          :active-item="activeItem"
          @toggle="toggleItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FaqItem from "@/components/FaqItem.vue";

export default {
  name: "FaqView",
  components: {
    FaqItem,
  },
  data() {
    return {
      activeItem: "",
      faqs: [
        {
          id: "faq1",
          question: "Lorem ipsum dolor sit amet",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vestibulum sem vitae laoreet suscipit. Pellentesque velit magna, faucibus in justo sit amet.",
          direction: "up",
        },
        {
          id: "faq2",
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vestibulum sem vitae laoreet suscipit. Pellentesque velit magna, faucibus in justo sit amet, congue ornare lorem.",
          direction: "up",
        },
        {
          id: "faq3",
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vestibulum sem vitae laoreet suscipit. Pellentesque velit magna, faucibus in justo sit amet, congue ornare lorem.",
          direction: "up",
        },
        {
          id: "faq4",
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          answer:
            "Kami sangat menghargai masukan dan saran dari para awardee untuk pengembangan program LPDP yang lebih baik di masa depan.",
          direction: "down",
        },
        {
          id: "faq5",
          question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          answer:
            "Tim kami siap membantu Anda dengan pertanyaan atau masalah yang Anda hadapi. Jangan ragu untuk menghubungi kami kapan saja.",
          direction: "down",
        },
      ],
    };
  },
  methods: {
    toggleItem(id) {
      this.activeItem = this.activeItem === id ? "" : id;
    },
  },
};
</script>

<style scoped>
.faq-section {
  padding: 60px 0;
  text-align: center;
  background-color: #fffcf4;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.faq-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #000000;
}

.faq-description {
  max-width: 700px;
  margin: 0 auto 40px;
  color: #000000;
  line-height: 1.6;
  font-size: 1.1rem;
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

/* Responsive Styling */
@media (max-width: 768px) {
  .faq-title {
    font-size: 32px;
  }

  .faq-description {
    font-size: 1rem;
    margin-bottom: 30px;
  }

  .faq-container {
    padding: 0 10px;
  }
}

@media (max-width: 480px) {
  .faq-title {
    font-size: 24px;
  }

  .faq-description {
    font-size: 0.95rem;
  }
}
</style>
