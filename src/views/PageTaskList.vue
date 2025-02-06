<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFirestore, query, collection, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useUserStore } from './../stores/user';
import type { IInterview } from './../Interfaces';

const DB = getFirestore();
const userId = useUserStore().userId;

const interviews = ref<IInterview[]>([]);
const isLoading = ref<boolean>(true);

const getAllInterviews = async <T extends IInterview>(): Promise<T[]> => {
  const endPoint = query(collection(DB, `users/${userId}/interviews`), orderBy('dateCreation', 'asc'));
  const getData = await getDocs(endPoint);
  return getData.docs.map(doc => doc.data() as T);
};

onMounted(async () => {
  const listInervievs: IInterview[] = await getAllInterviews();
  interviews.value = listInervievs;
});
</script>

<template></template>
<style></style>
