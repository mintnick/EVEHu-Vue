<script setup>
import { ref } from 'vue';
import { Line } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, plugins, scales, Filler } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, plugins, scales, Filler)

const props = defineProps({
  trendData: Array,
})
const labels = ref([])
const mc_trend_data = ref()
const loading = ref(true)

const chart_options = {
  animation: true,
  resonsize: true,
  fill: true,
  backgroundColor: 'rgba(75, 192, 192, 0.2)',
  layout: {
    padding: 10,
  },
  elements: {
    line: {
      borderColor: 'white',
      borderWidth: 3,
    },
    point: {
      backgroundColor: '#2ecc71',
      radius: 8,
      hoverRadius: 12,
    }
  },
  scales: {
    x: {
      ticks: {
        color: 'white',
      },
      display: false,
    },
    y: {
      min: 0,
      ticks: {
        color: 'white',
        maxTicksLimit: 5,
      }
    }
  },

  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: '一周内人数',
      color: 'white',
      font: { size: 18, family: "WenKai, sans-serif", },
    },
    tooltip: {
      enabled: true,
      titleAlign: 'center',
      bodyAlign: 'center',
      titleFont: { size: 14 },
      bodyFont: { size: 14 },
      displayColors: false,
    },
    filler: {

    },
  }
}

try {
  for (let i = 6; i > 0; i--)
    labels.value.push(`${i}天前`)
  labels.value.push('今天')

  mc_trend_data.value = {
    labels: labels.value,
    datasets: [{
      data: props['trendData'],
      tension: 0.1,
    }]
  }
} finally {
  loading.value = false
}
</script>

<template>
  <Line v-if="!loading" id="trend-chart" :data="mc_trend_data" :options="chart_options"
    style="background-color: rgba(0,0,0,0.7);" />
</template>

<style lang="css" scoped>
#trend-chart {
  max-height: 200px !important;
  max-width: 800px !important;
}
</style>