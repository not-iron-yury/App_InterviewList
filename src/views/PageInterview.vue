<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '../stores/user';
import { getFirestore, getDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import type { IInterview, IInterviewStage } from '../Interfaces';

const DB = getFirestore();
const userStore = useUserStore();
const route = useRoute();

const interview = ref<IInterview>();
const isLoading = ref<boolean>(false);

const docref = doc(DB, `users/${userStore.userId}/interviews`, route.params.id as string);

const getData = async (): Promise<void> => {
  try {
    isLoading.value = true;
    const docSnap = await getDoc(docref);

    if (docSnap.exists()) {
      const data = docSnap.data() as IInterview;
      if (data.stages?.length) {
        data.stages = data.stages.map((stage: IInterviewStage) => {
          if (stage.date && stage.date instanceof Timestamp) {
            return {
              ...stage,
              date: stage.date.toDate(),
            };
          }
          return stage;
        });
      }
      interview.value = data;
    }
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const addStage = (): void => {
  if (interview.value) {
    interview.value.stages.push({ name: '', descr: '', date: null });
  }
};

const delStage = (index: number): void => {
  if (interview.value?.stages) {
    interview.value.stages.splice(index, 1);
  }
};

const saveData = async (): Promise<void> => {
  try {
    isLoading.value = true;
    await updateDoc(docref, { ...interview.value });
  } catch (err) {
    console.error(err);
  } finally {
    await getData();
  }
};

// const formatDate = (date: Date | string): string => {
//   if (typeof date === 'string') return '';

//   return `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()}.`;
// };

//const saveDateStage = (index: number) => {
//   if (interview.value) {
//     const date = interview.value.stages[index].date;
//     interview.value.stages[index].date = formatDate(date);
//   }
// };

onMounted(async () => await getData());
</script>

<template>
  <app-spiner class="spiner" v-if="isLoading" />
  <div class="content-interview" v-else-if="interview?.id && !isLoading">
    <app-card>
      <template #title>
        <h2 class="form-title">Компания {{ interview.company }}</h2>
      </template>
      <template #content>
        <label class="form-label">
          Компания
          <app-input-text class="form-input" type="text" v-model="interview.company" />
        </label>
        <label class="form-label">
          Описание вакансии (ссылка)
          <app-input-text class="form-input" type="text" v-model="interview.vacancyLink" />
        </label>
        <label class="form-label">
          Контакт (имя)
          <app-input-text class="form-input" type="text" v-model="interview.hrName" />
        </label>
        <label class="form-label">
          Telegram HR
          <app-input-text class="form-input" type="text" v-model="interview.contactTelegram" />
        </label>
        <label class="form-label">
          Email HR
          <app-input-text class="form-input" type="email" v-model="interview.contactEmail" />
        </label>
        <label class="form-label">
          Телефон HR
          <app-input-text class="form-input" type="tel" v-model="interview.contactPhone" />
        </label>
        <div class="flex-row">
          <label class="form-label">
            ЗП min
            <app-input-number class="form-input" type="number" v-model="interview.salaryMin" />
          </label>
          <label class="form-label">
            ЗП max
            <app-input-number class="form-input" type="number" v-model="interview.salaryMax" />
          </label>
        </div>
        <app-button label="Добавить этап" type="button" icon="pi pi-plus" severity="secondary" @click="addStage" />

        <!-- ЭТАПЫ СОБЕСЕДОВАНИЯ -->

        <template v-if="interview.stages">
          <div class="interview-stage" v-for="(stage, indx) in interview.stages" :key="indx">
            <label class="form-label">
              Этап собеса # {{ indx + 1 }}
              <app-input-text class="form-input" placeholder="Первый этап" v-model="stage.name" />
            </label>
            <label class="form-label">
              Дата собеса
              <app-datepicker class="form-input" dateFormat="dd.mm.yy" v-model="stage.date" />
            </label>
            <label class="form-label">
              Заметки
              <app-textarea class="form-input form-textarea" rows="7" type="tel" v-model="stage.descr" />
            </label>
            <app-button label="Удалить этап" type="button" severity="danger" @click="delStage(indx)" />
          </div>
        </template>
        <div class="flex-row btns">
          <label class="form-label form-label--col">
            <app-radio v-model="interview!.result" name="result" value="fuckshit" />
            Пролёт
          </label>
          <label class="form-label form-label--col">
            <app-radio v-model="interview!.result" name="result" value="eboy" />
            Оффер
          </label>
          <app-button label="Сохранить" type="button" severity="secondary" @click="saveData" />
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
.spiner {
  display: flex;
  place-items: center;
  height: 70vh;
}
</style>
