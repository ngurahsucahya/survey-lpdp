<template>
  <div class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">SURVEI BEASISWA LPDP</h1>
        <button class="cta-button">ISI SEKARANG</button>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stats-container">
        <!-- Left Side - Statistics -->
        <div class="stats-left">
          <div class="participation-section">
            <h2 class="section-title">TINGKAT PARTISIPASI</h2>
            <p class="date-info">per 31 December 2024</p>

            <div class="stat-item">
              <div class="summary-value">14.065</div>
              <div class="stat-label">Total Responden</div>
            </div>

            <div class="stat-item">
              <div class="summary-value">2.789</div>
              <div class="stat-label">Penerima Beasiswa</div>
            </div>
          </div>
        </div>

        <!-- Right Side - Survey Information -->
        <div class="stats-right">
          <h2 class="survey-title">
            SURVEI KEPUASAN PUBLIK ATAS LAYANAN BEASISWA LPDP TAHUN 2024
          </h2>

          <p class="survey-description">
            Selamat bergabung dalam Survei Kepuasan Publik terhadap Layanan LPDP
            Tahun 2024.
          </p>

          <p class="survey-description">
            LPDP bekerja sama dengan Institut Pertanian Bogor (IPB)
            menyelenggarakan survei ini guna mengevaluasi kualitas layanan
            beasiswa yang Saudara terima pada tahun 2024. Partisipasi dan
            masukan dari Saudara sangat kami harapai sebagai bahan perbaikan dan
            pengembangan layanan LPDP ke depan.
          </p>

          <p class="survey-description">
            Kami mohon Saudara mengisi survei ini secara objektif berdasarkan
            pengalaman pribadi dalam berinteraksi dengan unit layanan beasiswa
            LPDP.
          </p>

          <p class="survey-description">
            Kami menjamin kerahasiaan identitas dan data yang Saudara berikan.
            Seluruh data akan dianalisis secara agregat semata-mata untuk
            keperluan evaluasi. Atas perhatian dan partisipasi Saudara, kami
            ucapkan terima kasih.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  methods: {
    // Method untuk handle klik tombol survei
    handleSurveyClick() {
      // Logic untuk redirect ke halaman survei
      this.$router.push("/survey");
    },
  },
};
</script>

<style scoped>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Hero Section */
.hero-section {
  background: url("@/assets/hero.png") center/cover no-repeat;
  height: 100vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  padding-bottom: 80px;
}

.hero-content {
  text-align: center;
  z-index: 2;
  position: relative;
}

.hero-title {
  font-size: 4rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  letter-spacing: 2px;
}

.cta-button {
  background-color: #ed722e;
  color: #ffffff;
  border: 2px solid #ffffff;
  padding: 10px 30px;
  font-size: 1.2rem;
  font-weight: semibold;
  cursor: pointer;
  border-radius: 50px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.cta-button:hover {
  background-color: #d65a1a;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(237, 114, 46, 0.3);
}

/* Stats Section */
.stats-section {
  flex: 1;
  display: flex;
  min-height: 600px;
}

.stats-container {
  display: flex;
  width: 100%;
  min-height: 100%;
}

.stats-left {
  background: linear-gradient(144deg, #2050a5 50%, #1c4999 50%);
  color: white;
  padding: 50px 70px;
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stats-right {
  color: white;
  background-color: #2b2b2b;
  padding: 50px 70px;
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.section-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.date-info {
  font-size: 1rem;
  margin-bottom: 40px;
  opacity: 0.9;
}

.stat-item {
  margin-bottom: 40px;
}

.summary-value {
  font-size: 6rem;
  font-weight: 700;
  margin-top: -0.25rem;
  margin-bottom: -0.25rem;
  transition: all 0.5s ease;
}

.stat-label {
  font-size: 1.2rem;
  font-weight: 500;
}

.survey-title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 30px;
  line-height: 1.3;
}

.survey-description {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 20px;
  text-align: justify;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .stats-container {
    flex-direction: column;
  }

  .stats-left,
  .stats-right {
    padding: 40px 20px;
  }

  .survey-title {
    font-size: 1.4rem;
  }

  .nav-menu {
    gap: 15px;
  }

  .nav-link {
    font-size: 14px;
  }

  .social-icons {
    flex-wrap: wrap;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .cta-button {
    padding: 12px 30px;
    font-size: 1rem;
  }

  .stats-left,
  .stats-right {
    padding: 30px 15px;
  }
}
@media (max-width: 768px) {
  .hero-section {
    padding-bottom: 60px;
    height: auto;
    min-height: 80vh;
  }

  .hero-title {
    font-size: 2.5rem;
    padding: 0 20px;
  }

  .cta-button {
    padding: 10px 20px;
    font-size: 1rem;
  }

  .stats-container {
    flex-direction: column;
  }

  .stats-left,
  .stats-right {
    padding: 40px 25px;
    flex: 1 1 100%;
  }

  .summary-value {
    font-size: 3.5rem;
  }

  .survey-title {
    font-size: 1.4rem;
  }

  .survey-description {
    font-size: 0.95rem;
    text-align: justify;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .cta-button {
    padding: 10px 18px;
    font-size: 0.95rem;
    width: 80%;
  }

  .summary-value {
    font-size: 2.8rem;
  }

  .stat-label {
    font-size: 1rem;
  }

  .survey-title {
    font-size: 1.2rem;
    line-height: 1.4;
  }

  .survey-description {
    font-size: 0.9rem;
    margin-bottom: 15px;
  }

  .stats-left,
  .stats-right {
    padding: 30px 15px;
  }
}
</style>
