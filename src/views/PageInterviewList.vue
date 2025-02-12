<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFirestore, query, collection, orderBy, getDocs, deleteDoc, doc, where } from 'firebase/firestore';
import { useUserStore } from '../stores/user';
import type { IInterview } from '../Interfaces';
import { useRouter } from 'vue-router';
import { useConfirm } from 'primevue/useconfirm';

const confirm = useConfirm();
const router = useRouter();
const DB = getFirestore();
const userId = useUserStore().userId;

const interviews = ref<IInterview[]>([]);
const isLoading = ref<boolean>(true);
const resultFilteringType = ref<string>('');

const getAllInterviews = async <T extends IInterview>(isFilter?: boolean): Promise<T[]> => {
  let endPoint;

  if (isFilter) {
    endPoint = query(
      collection(DB, `users/${userId}/interviews`),
      orderBy('dateCreation', 'asc'),
      where('result', '==', resultFilteringType.value)
    );
  } else {
    endPoint = query(collection(DB, `users/${userId}/interviews`), orderBy('dateCreation', 'asc'));
  }
  const getData = await getDocs(endPoint);
  return getData.docs.map(doc => doc.data() as T);
};

onMounted(async () => {
  interviews.value = await getAllInterviews();
  isLoading.value = false;
});

const confirmRemoveInterview = async (id: string): Promise<void> => {
  confirm.require({
    header: 'Квесчен',
    message: 'Саня ты в порядке?',
    acceptLabel: 'Да',
    acceptClass: 'p-button-danger',
    acceptIcon: 'pi pi-thumbs-up',
    accept: async () => {
      try {
        isLoading.value = true;
        await deleteDoc(doc(DB, `users/${userId}/interviews`, id));
        interviews.value = await getAllInterviews();
      } catch (err) {
        console.error(err);
      } finally {
        isLoading.value = false;
      }
    },
    rejectLabel: 'Нет',
    rejectClass: 'p-button-secondary',
    rejectIcon: 'pi pi-thumbs-down',
  });
};

const editingInterview = (id: string): void => {
  router.push(`/list/${id}`);
};

const filterResult = async (): Promise<void> => {
  interviews.value = await getAllInterviews(true);
  isLoading.value = false;
};

const resetFilteringType = async (): Promise<void> => {
  resultFilteringType.value = '';
  interviews.value = await getAllInterviews();
  isLoading.value = false;
};
</script>

<template>
  <app-dialog />
  <app-spiner v-if="isLoading" class="spiner" />
  <app-message v-else-if="!isLoading && !interviews.length" severity="info">Нет добавленных собеседований</app-message>
  <div v-else>
    <h1 class="title">Список интревью</h1>
    <div class="flex-row btns">
      <label class="form-label form-label--col">
        <app-radio v-model="resultFilteringType" name="result" value="eboy" @change="filterResult" />
        eboy
      </label>
      <label class="form-label form-label--col">
        <app-radio v-model="resultFilteringType" name="result" value="fuckshit" @change="filterResult" />
        fuckshit
      </label>
      <app-button
        class="btn-small"
        type="button"
        severity="secondary"
        @click="resetFilteringType"
        :disabled="resultFilteringType === '' ? true : false"
      >
        <i class="pi pi-refresh"></i>
      </app-button>
    </div>
    <app-data-table :value="interviews" stripedRows>
      <app-column field="company" header="Компания"></app-column>
      <app-column field="vacancyLink" header="Вакансия">
        <template #body="slotProps">
          <a :href="slotProps.data.vacancyLink" target="_blank"
            >link
            <i class="pi pi-external-link" />
          </a>
        </template>
      </app-column>
      <app-column field="hrName" header="Имя HR"></app-column>
      <app-column header="Контакты">
        <template #body="slotProps">
          <div class="contacts">
            <a
              v-if="slotProps.data.contactTelegram"
              :href="`https://t.me/${slotProps.data.contactTelegram}`"
              target="_blank"
              class="contacts__telegram"
            >
              <span class="contacts__icon pi pi-telegram"></span>
            </a>
            <a
              v-if="slotProps.data.contactEmail"
              :href="`mailto:${slotProps.data.contactEmail}`"
              target="_blank"
              class="contacts__email"
            >
              <span class="contacts__icon pi pi-envelope"></span>
            </a>
            <a
              v-if="slotProps.data.contactPhone"
              :href="`tel:${slotProps.data.contactPhone}`"
              target="_blank"
              class="contacts__phone"
            >
              <span class="contacts__icon pi pi-phone"></span>
            </a>
          </div>
        </template>
      </app-column>
      <app-column header="Вилка">
        <template #body="slotProps">
          <span v-if="!slotProps.data.salaryMin">нет данных</span>
          <span v-else>{{ slotProps.data.salaryMin }} - {{ slotProps.data.salaryMax }}</span>
        </template>
      </app-column>
      <app-column header="Этапы">
        <template #body="slotProps">
          <span v-if="!slotProps.data.stages">0</span>
          <div v-else class="interview-stages">
            <app-badge
              v-for="(stage, i) in slotProps.data.stages"
              :key="i"
              :value="i + 1"
              rounded
              v-tooltip.top="stage.name"
              class="stage-item"
            />
          </div>
        </template>
      </app-column>
      <app-column header="Результат">
        <template #body="slotProps">
          <span v-if="!slotProps.data.result">нет данных</span>
          <span v-else>
            <app-badge :severity="slotProps.data.result === 'eboy' ? 'success' : 'danger'">
              {{ slotProps.data.result }}
            </app-badge>
          </span>
        </template>
      </app-column>
      <app-column>
        <template #body="slotProps">
          <div class="buttons">
            <app-button icon="pi pi-pen-to-square" @click="editingInterview(slotProps.data.id)" />
            <app-button icon="pi pi-trash" severity="danger" @click="confirmRemoveInterview(slotProps.data.id)" />
          </div>
        </template>
      </app-column>
    </app-data-table>
  </div>
</template>
<style scoped>
.contacts {
  display: flex;
  align-items: center;
  gap: 20px;
}
.contacts__telegram {
  color: #0088cc;
}
.contacts__email {
  color: #25c7d3;
}
.contacts__phone {
  color: #db0bca;
}
.contacts__icon {
  font-size: 20px;
}
.spiner {
  display: flex;
  place-items: center;
  height: 70vh;
}
.buttons {
  display: flex;
  gap: 12px;
}
.interview-stages {
  display: flex;
  gap: 4px;
}
.stage-item {
  cursor: default;
}
</style>
