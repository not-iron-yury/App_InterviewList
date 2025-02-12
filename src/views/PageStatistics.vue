<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFirestore, query, collection, orderBy, getDocs } from 'firebase/firestore';
import { useUserStore } from '../stores/user';
import type { IInterview } from '../Interfaces';

const DB = getFirestore();
const userId = useUserStore().userId;
const interviews = ref<IInterview[]>([]);
const chartData = ref();

const getAllInterviews = async <T extends IInterview>(): Promise<T[]> => {
  const endPoint = query(collection(DB, `users/${userId}/interviews`), orderBy('dateCreation', 'asc'));
  const getData = await getDocs(endPoint);
  return getData.docs.map(doc => doc.data() as T);
};

const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);

  const resultLabels: Array<string> = ['eboy', 'fuckshit', 'in process'];
  const resultsData: Array<number> = [0, 0, 0];

  interviews.value.forEach((interview: IInterview) => {
    if (interview.result === resultLabels[0]) {
      resultsData[0]++;
    } else if (interview.result === resultLabels[1]) {
      resultsData[1]++;
    } else {
      resultsData[2]++;
    }
  });

  return {
    labels: resultLabels,
    datasets: [
      {
        data: resultsData,
        backgroundColor: [
          documentStyle.getPropertyValue('--p-green-500'),
          documentStyle.getPropertyValue('--p-rose-500'),
          documentStyle.getPropertyValue('--p-gray-500'),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue('--p-green-500'),
          documentStyle.getPropertyValue('--p-rose-500'),
          documentStyle.getPropertyValue('--p-gray-500'),
        ],
      },
    ],
  };
};

onMounted(async () => {
  interviews.value = await getAllInterviews();
  chartData.value = setChartData();
});
</script>

<template>
  <h1 class="title">Статистика упешного успеха</h1>
  <div class="wrapper-chart">
    <app-chart type="doughnut" :data="chartData" class="chart" />
  </div>
</template>

<style scoped>
.wrapper-chart {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.chart {
  max-width: 30vw;
  width: 100%;
}
</style>
