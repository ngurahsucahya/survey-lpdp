// views/GuidelineView.vue
<template>
  <div class="guideline-page">
    <div class="main-content">
      <h1 class="guideline-title">GUIDELINE</h1>
      <p class="guideline-description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        vestibulum sem vitae laoreet suscipit. Pellentesque velit magna,
        faucibus in justo sit amet, congue ornare lorem.
      </p>

      <div class="guideline-steps">
        <div
          v-for="(step, index) in guidelineSteps"
          :key="index"
          class="guideline-step"
        >
          <span class="step-number">{{ step.number }}</span>
          <span class="step-title">{{ step.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GuidelineView",
  data() {
    return {
      guidelineSteps: [
        { id: "step1", number: "[01]", title: "Langkah 1: Isi Data Diri" },
        {
          id: "step2",
          number: "[02]",
          title: "Langkah 2: Evaluasi Tahap Pendaftaran",
        },
        {
          id: "step3",
          number: "[03]",
          title: "Langkah 3: Evaluasi Tahap Seleksi",
        },
        {
          id: "step4",
          number: "[04]",
          title: "Langkah 4: Evaluasi Penerimaan Manfaat Beasiswa",
        },
        { id: "step5", number: "[05]", title: "Langkah 5: Penanganan Keluhan" },
        {
          id: "step6",
          number: "[06]",
          title: "Langkah 6: Penilaian Petugas Layanan (CSO)",
        },
        { id: "step7", number: "[07]", title: "Langkah 7: Penilaian Umum" },
        { id: "step8", number: "[08]", title: "Langkah 8: Selesai & Kirim" },
      ],
    };
  },
  methods: {
    navigateToStep(stepId) {
      // Implementasi navigasi ke detail langkah
      this.$router.push({ name: "GuidelineDetail", params: { id: stepId } });
    },
  },
};
</script>

<style scoped>
.guideline-page {
  min-height: calc(
    100vh - 80px - 200px
  ); /* Mengurangi tinggi navbar dan footer */
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 20px;
  text-align: center;
}

.guideline-title {
  font-size: 60px;
  font-weight: 700;
  margin-bottom: 20px;
  text-transform: uppercase;
}

.guideline-description {
  max-width: 800px;
  margin: 0 auto 60px;
  font-size: 16px;
  line-height: 1.6;
}

.guideline-steps {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-top: 50px;
  text-align: left;
}

.guideline-step {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 25px;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.guideline-step:hover {
  transform: translateX(10px);
}

.step-number {
  font-size: 16px;
  color: #666;
  margin-right: 10px;
}

.step-title {
  font-size: 24px;
  font-weight: 600;
}

@media (max-width: 768px) {
  .guideline-title {
    font-size: 40px;
  }

  .step-title {
    font-size: 20px;
  }
}
</style>
