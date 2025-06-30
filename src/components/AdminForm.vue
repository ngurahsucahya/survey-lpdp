<template>
  <div class="form-wrapper">
    <h2>Formulir Survei</h2>

    <!-- Pilih bagian -->
    <select v-model="selectedSection" class="select-field">
      <option disabled value="">Pilih Bagian</option>
      <option v-for="section in sections" :key="section.id" :value="section.id">
        {{ section.name }}
      </option>
      <option value="__new__">+ Buat Bagian Baru</option>
    </select>

    <!-- Input nama bagian baru -->
    <input
      v-if="selectedSection === '__new__'"
      v-model="newSection"
      placeholder="Nama Bagian Baru (misal: Bagian I - Identitas Diri)"
      class="input-field"
    />

    <!-- Input pertanyaan -->
    <input
      v-model="newField.label"
      placeholder="Tulis pertanyaan"
      class="input-field"
    />

    <!-- Pilih tipe pertanyaan -->
    <select v-model="newField.type" class="select-field">
      <option disabled value="">Jenis Jawaban</option>
      <option v-for="type in sortedTypes" :key="type.value" :value="type.value">
        {{ type.label }}
      </option>
    </select>

    <!-- Opsi jika perlu -->
    <div
      v-if="
        ['multipleChoice', 'dropdown', 'checkbox', 'likert'].includes(
          newField.type
        )
      "
    >
      <label>Opsi:</label>
      <div
        v-for="(opt, idx) in newField.options"
        :key="idx"
        class="option-item"
      >
        <input
          v-model="newField.options[idx]"
          placeholder="Tulis opsi..."
          class="input-field"
        />
        <button @click="removeOption(idx)" class="remove-button" title="Hapus">
          Hapus
        </button>
      </div>
      <button @click="addOption" class="add-option-button">Tambah Opsi</button>
    </div>

    <!-- Dual Likert Config -->
    <div v-if="newField.type === 'duallikert'" class="dual-likert-config">
      <label>Label Baris Pertama:</label>
      <input
        v-model="newField.dualConfig.row1Label"
        class="input-field"
        placeholder="Contoh: Tingkat Kepentingan"
      />

      <label>Label Baris Kedua:</label>
      <input
        v-model="newField.dualConfig.row2Label"
        class="input-field"
        placeholder="Contoh: Tingkat Kepuasan"
      />

      <label>Deskripsi Skala (5 item):</label>
      <div
        v-for="(desc, idx) in newField.dualConfig.descriptors"
        :key="idx"
        class="option-item"
      >
        <input
          v-model="newField.dualConfig.descriptors[idx]"
          class="input-field"
          :placeholder="`Deskripsi ${idx + 1}`"
        />
      </div>
    </div>

    <!-- Simpan pertanyaan -->
    <button @click="addField" class="primary-button">
      {{ editMode ? "Perbarui Pertanyaan" : "Simpan Pertanyaan" }}
    </button>

    <hr />

    <!-- Tampilkan daftar pertanyaan -->
    <h3>Daftar Pertanyaan</h3>
    <div v-for="section in groupedFields" :key="section.title">
      <h4>{{ section.title }}</h4>
      <draggable
        v-model="section.questions"
        item-key="id"
        class="draggable-list"
        @end="updateFromGrouped"
      >
        <template #item="{ element, index }">
          <div class="question-item">
            <div class="question-text">
              <div class="question-label">
                {{ index + 1 }}. {{ element.text }}
              </div>
              <div
                v-if="
                  ['multipleChoice', 'checkbox', 'dropdown', 'likert'].includes(
                    element.qtype
                  )
                "
                class="question-options"
              >
                Opsi: {{ element.options.join(", ") }}
              </div>
              <div
                v-if="element.qtype === 'duallikert'"
                class="question-options"
              >
                Dual Likert: {{ element.dual_config?.row1Label }} /
                {{ element.dual_config?.row2Label }}
              </div>
            </div>
            <div class="question-actions">
              <button @click="editField(element)" class="add-option-button">
                Edit
              </button>
              <button @click="removeField(element.id)" class="remove-button">
                Hapus
              </button>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import draggable from "vuedraggable";

const API_BASE = "http://127.0.0.1:8000/api/questions/";

export default {
  components: { draggable },
  data() {
    return {
      formFields: [],
      selectedSection: "",
      newSection: "",
      newField: { label: "", type: "", options: [], dualConfig: null },
      editingId: null,
      sections: [],
      types: [
        { value: "shortText", label: "Short Text" },
        { value: "multipleChoice", label: "Multiple Choice" },
        { value: "longText", label: "Long Text" },
        { value: "dropdown", label: "Dropdown" },
        { value: "checkbox", label: "Checkbox" },
        { value: "likert", label: "Likert Scale" },
        { value: "trueFalse", label: "True / False" },
        { value: "duallikert", label: "Dual Likert Scale" },
      ],
    };
  },
  watch: {
    "newField.type"(val) {
      if (val === "duallikert") {
        this.newField.dualConfig = {
          row1Label: "Tingkat Kepentingan",
          row2Label: "Tingkat Kepuasan",
          descriptors: [
            "Sangat Tidak Penting",
            "Tidak Penting",
            "Cukup Penting",
            "Penting",
            "Sangat Penting",
          ],
        };
      } else {
        this.newField.dualConfig = null;
      }
    },
  },
  computed: {
    sortedTypes() {
      return [...this.types].sort((a, b) =>
        a.label.localeCompare(b.label, undefined, { sensitivity: "base" })
      );
    },
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
    editMode() {
      return this.editingId !== null;
    },
  },
  async mounted() {
    await this.fetchSections();
    await this.fetchQuestions();
  },
  methods: {
    async fetchSections() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/sections/");
        this.sections = res.data;
      } catch (err) {
        console.error("Gagal mengambil sections:", err);
      }
    },
    async fetchQuestions() {
      try {
        const res = await axios.get(API_BASE);
        this.formFields = res.data;
      } catch (err) {
        console.error("Gagal mengambil pertanyaan:", err);
      }
    },
    addOption() {
      this.newField.options.push("");
    },
    removeOption(index) {
      this.newField.options.splice(index, 1);
    },
    async addField() {
      if (!this.newField.label || !this.newField.type) {
        return alert("Pertanyaan dan jenis harus diisi!");
      }

      if (
        ["multipleChoice", "dropdown", "checkbox", "likert"].includes(
          this.newField.type
        ) &&
        this.newField.options.filter((o) => o.trim() !== "").length === 0
      ) {
        return alert("Opsi harus diisi!");
      }

      let sectionId = this.selectedSection;

      if (sectionId === "__new__") {
        if (!this.newSection.trim()) {
          alert("Nama bagian baru tidak boleh kosong!");
          return;
        }

        try {
          const res = await axios.post(
            "http://localhost:8000/api/sections/",
            { name: this.newSection.trim() },
            { headers: { "Content-Type": "application/json" } }
          );
          sectionId = res.data.id;
          this.selectedSection = sectionId;
          await this.fetchSections();
        } catch (e) {
          console.error("Gagal menambahkan section baru:", e);
          alert("Gagal menambahkan section baru");
          return;
        }
      }

      const payload = {
        section: sectionId,
        text: this.newField.label,
        qtype: this.newField.type,
      };

      if (
        ["multipleChoice", "dropdown", "checkbox", "likert"].includes(
          this.newField.type
        )
      ) {
        payload.options = this.newField.options.filter((o) => o.trim() !== "");
      } else if (this.newField.type === "duallikert") {
        payload.dual_config = this.newField.dualConfig;
      }

      try {
        if (this.editMode) {
          await axios.put(`${API_BASE}${this.editingId}/`, payload);
        } else {
          await axios.post(API_BASE, payload);
        }
        await this.fetchQuestions();
      } catch (err) {
        console.error("Gagal menyimpan pertanyaan:", err);
        alert("Gagal menyimpan pertanyaan");
      }

      this.newField = { label: "", type: "", options: [], dualConfig: null };
      this.newSection = "";
      this.selectedSection = "";
      this.editingId = null;
    },
    async removeField(id) {
      try {
        await axios.delete(`${API_BASE}${id}/`);
        await this.fetchQuestions();
      } catch (err) {
        console.error("Gagal menghapus:", err);
      }
    },
    editField(field) {
      this.newField = {
        label: field.text,
        type: field.qtype,
        options: [...(field.options || [])],
        dualConfig: field.dual_config
          ? { ...field.dual_config }
          : {
              row1Label: "Tingkat Kepentingan",
              row2Label: "Tingkat Kepuasan",
              descriptors: [
                "Sangat Tidak Penting",
                "Tidak Penting",
                "Cukup Penting",
                "Penting",
                "Sangat Penting",
              ],
            },
      };
      this.selectedSection =
        this.sections.find((s) => s.id === field.section)?.id || "";
      this.editingId = field.id;
    },
    updateFromGrouped() {
      this.formFields = this.groupedFields.flatMap((g) => g.questions);
    },
  },
};
</script>

<style scoped>
/* (Style tetap sesuai versi sebelumnya) */
</style>

<style scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 600px;
  margin: auto;
}
.input-field,
.select-field {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.option-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.primary-button,
.add-option-button,
.remove-button {
  padding: 6px 10px;
  margin-top: 6px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}
.primary-button {
  background-color: #ed7020;
  color: white;
}
.add-option-button {
  background-color: #2196f3;
  color: white;
}
.remove-button {
  background-color: #f44336;
  color: white;
}
.draggable-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.question-item {
  padding: 10px;
  background: #f9f9f9;
  border-left: 4px solid #ed7020;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  text-align: left;
}
.question-text {
  flex-grow: 1;
}
.question-label {
  font-size: 15px;
  margin-bottom: 4px;
}
.question-options {
  font-size: 13px;
  color: #555;
}
.question-actions {
  display: flex;
  gap: 6px;
  margin-left: 12px;
  align-items: center;
  flex-shrink: 0;
}
</style>
