<script setup lang="ts">
import { computed, ref } from 'vue';
import type { IInterview } from './../Interfaces';

const company = ref<string>('');
const vacancyLink = ref<string>('');
const hrName = ref<string>('');
const contactTelegram = ref<string>('');
const contactEmail = ref<string>('');
const contactPhone = ref<string>('');
const loading = ref<boolean>(false);

const disabledSaveButton = computed<boolean>(() => {
  return !(company.value && vacancyLink.value && hrName.value);
});

const addNewInterview = () => {
  const payload: IInterview = {
    id: Date.now(),
    company: company.value,
    vacancyLink: vacancyLink.value,
    hrName: hrName.value,
    contactTelegram: contactTelegram.value,
    contactEmail: contactEmail.value,
    contactPhone: contactPhone.value,
    dateCreation: new Date(),
  };
  console.log(payload);
};
</script>

<template>
  <div class="content-interview">
    <app-card>
      <template #title>
        <h2 class="form-title">Новое собеседование</h2>
      </template>
      <template #content>
        <label class="form-label">
          Компания
          <app-input-text class="form-input" v-model="company" />
        </label>
        <label class="form-label">
          Описание вакансии (ссылка)
          <app-input-text class="form-input" v-model="vacancyLink" />
        </label>
        <label class="form-label">
          Контакт (имя)
          <app-input-text class="form-input" v-model="hrName" />
        </label>
        <label class="form-label">
          Telegram HR
          <app-input-text class="form-input" v-model="contactTelegram" />
        </label>
        <label class="form-label">
          Email HR
          <app-input-text class="form-input" v-model="contactEmail" />
        </label>
        <label class="form-label">
          Телефон HR
          <app-input-text class="form-input" v-model="contactPhone" />
        </label>
        <app-button
          class="form-btn"
          @click="addNewInterview"
          label="Создать собеседование"
          :disabled="disabledSaveButton"
          :loading="loading"
        ></app-button>
      </template>
    </app-card>
  </div>
</template>

<style scoped>
.input {
  width: 100%;
}
.content-interview {
  max-width: 600px;
  margin: auto;
}
.form-title {
  margin-bottom: 10px;
  font-size: 24px;
  text-align: center;
}
.form-label {
  display: grid;
  gap: 4px;
  font-size: 16px;
  color: var(--color-lable);
}

.form-input {
  width: 100%;
  margin-bottom: 12px;
}
</style>
