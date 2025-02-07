<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFirestore, query, collection, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useUserStore } from './../stores/user';
import type { IInterview } from './../Interfaces';

const DB = getFirestore();
const userId = useUserStore().userId;

const interviews = ref<IInterview[]>([]);
const isLoading = ref<boolean>(false);

const getAllInterviews = async <T extends IInterview>(): Promise<T[]> => {
  const endPoint = query(collection(DB, `users/${userId}/interviews`), orderBy('dateCreation', 'asc'));
  const getData = await getDocs(endPoint);
  return getData.docs.map(doc => doc.data() as T);
};

onMounted(async () => {
  const listInervievs: IInterview[] = await getAllInterviews();
  interviews.value = listInervievs;
  console.log(interviews.value);
});
</script>

<template>
  <app-dialog />
  <app-spiner v-if="isLoading" class="spiner" />
  <app-message v-else-if="!isLoading && !interviews.length" severity="info">Нет добавленных собеседований</app-message>
  <div v-else>
    <h1>Список собеседований</h1>
    <app-datatable :value="interviews">
      <app-column field="company" header="Компания"></app-column>
      <app-column field="hrName" header="Имя HR"></app-column>
      <app-column field="vacancyLink" header="Вакансия">
        <template #body="slotProps">
          <a :href="slotProps.data.vacancyLink" target="_blank">{{ slotProps.data.vacancyLink }}</a>
        </template>
      </app-column>
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
              :href="`https://wa.me/${slotProps.data.contactEmail}`"
              target="_blank"
              class="contacts__email"
            >
              <span class="contacts__icon pi pi-envelope"></span>
            </a>
            <a
              v-if="slotProps.data.contactPhone"
              :href="`https://tel:${slotProps.data.contactPhone}`"
              target="_blank"
              class="contacts__phone"
            >
              <span class="contacts__icon pi pi-phone"></span>
            </a>
          </div>
        </template>
      </app-column>
      <app-column>
        <template #body="slotProps">
          <div class="flex gap-2">
            <router-link :to="`/interview/${slotProps.data.id}`">
              <app-button icon="pi pi-pencil" severity="info" />
            </router-link>
            <app-button icon="pi pi-trash" severity="danger" @click="confirmRemoveInterview(slotProps.data.id)" />
          </div>
        </template>
      </app-column>
    </app-datatable>
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
  color: #371777;
}
.contacts__icon {
  font-size: 20px;
}
.spiner {
  display: flex;
  place-items: center;
  height: 70vh;
}
</style>
