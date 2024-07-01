<template>
    <div style="display: flex;">
        <!-- 饼图 -->
        <div style="height:20%;width:40%;">
            <canvas ref="pieChartCanvas"></canvas>
            <span style="padding-right: 20%;">旅店支出分析</span>
        </div>
        <div style="height:30%;width:55%;">
            <!-- 柱状图 -->
            <canvas ref="barChartCanvas"></canvas>
        </div>
    </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

const pieChartCanvas = ref(null);
const barChartCanvas = ref(null);

onMounted(() => {
    // 饼图数据
    const pieChartData = {
        labels: ['维修', '清洁', '日常生活物品补给', '水电', '工资'],
        datasets: [{
            label: '当月支出',
            data: [18, 13, 15, 12, 42],
            backgroundColor: ['#FFDEAD', '#B0E2FF', '#FFFF00', '#B3EE3A', '#FF6384'],
            hoverOffset: 4
        }]
    };

    // 柱状图数据
    const barChartData = {
        labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
        datasets: [{
            label: '旅店最近6个月收入',
            data: [4600, 3600, 6900, 5500, 4500, 3000],
            backgroundColor: '#36A2EB',
            borderColor: '#36A2EB',
            borderWidth: 1
        }]
    };

    // 创建饼图
    new Chart(pieChartCanvas.value, {
        type: 'pie',
        data: pieChartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => {
                            return `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}%`;
                        }
                    }
                }
            },
            animation: {
                animateScale: true  // 启用缩放动画
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
        }
    });

    // 创建柱状图
    new Chart(barChartCanvas.value, {
        type: 'bar',
        data: barChartData,
        options: {
            responsive: true,
            indexAxis: 'x',
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => {
                            return `收入: ${tooltipItem.raw}`;
                        }
                    }
                }
            }
        }
    });
});
</script>
  
<style scoped>
body {
    padding: 0;
}

.charts-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}
</style>
  