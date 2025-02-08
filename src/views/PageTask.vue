<script setup lang="ts">
import { ref } from 'vue';

const result = ref('');
</script>

<template>
  <div class="content-interview">
    <app-card>
      <template #title>
        <h2 class="form-title">Детали собеседования</h2>
      </template>
      <template #content>
        <label class="form-label">
          Компания
          <app-input-text class="form-input" type="text" />
        </label>
        <label class="form-label">
          Описание вакансии (ссылка)
          <app-input-text class="form-input" type="text" />
        </label>
        <label class="form-label">
          Контакт (имя)
          <app-input-text class="form-input" type="text" />
        </label>
        <label class="form-label">
          Telegram HR
          <app-input-text class="form-input" type="text" />
        </label>
        <label class="form-label">
          Email HR
          <app-input-text class="form-input" type="email" />
        </label>
        <label class="form-label">
          Телефон HR
          <app-input-text class="form-input" type="tel" />
        </label>
        <div class="flex-row">
          <label class="form-label">
            ЗП min
            <app-input-number class="form-input" type="number" />
          </label>
          <label class="form-label">
            ЗП max
            <app-input-number class="form-input" type="number" />
          </label>
        </div>
        <app-button label="Добавить этап" type="button" icon="pi pi-plus" severity="secondary"></app-button>
        <div class="interview-stage">
          <label class="form-label">
            Этап собеса
            <app-input-text class="form-input" type="text" placeholder="Лайв кодинг" />
          </label>
          <label class="form-label">
            Дата собеса
            <app-datepicker class="form-input" dateFormat="dd.mm.yy" />
          </label>
          <label class="form-label">
            Заметки
            <app-textarea class="form-input form-textarea" rows="7" type="tel" />
          </label>
          <app-button label="Удалить этап" type="button" severity="danger"></app-button>
          <div class="flex-row btns">
            <label class="form-label form-label--col">
              <app-radio v-model="result" name="result" value="fuckshit" />
              Пролёт
            </label>
            <label class="form-label form-label--col">
              <app-radio v-model="result" name="result" value="eboy" />
              Оффер
            </label>
            <app-button label="Сохранить" type="button" severity="secondary"></app-button>
          </div>
        </div>
      </template>
    </app-card>
  </div>
</template>

<style scoped>
.content-interview {
  max-width: 600px;
  margin: auto;
}
.interview-stage {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 10px;
  margin: 10px 0;
}
.form-title {
  margin-bottom: 10px;
  font-size: 24px;
  text-align: center;
}
.form-label {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 16px;
  color: var(--color-lable);
}
.form-label--col {
  flex-direction: row;
  width: auto;
}
.form-input {
  width: 100%;
  margin-bottom: 12px;
}

.form-textarea {
  resize: none;
}
.flex-row {
  display: flex;
  gap: 10px;
}
.btns {
  margin: 15px 0;
  gap: 25px;
  align-items: center;
}
</style>
