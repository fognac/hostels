<!-- TopTitle.vue -->
<template>
    <div class="topTitle">
        <el-input v-model="search" style="width: 240px" placeholder="搜索房间号/姓名" clearable size="small" />
        <el-button :icon="Search" type="primary" size="small" round @click='searchBtn'>搜索</el-button>
        <el-button type="danger" :icon="Delete" size="small" round :disabled="delsBtn"
            @click="handleBatchDelete">批量删除</el-button>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { Search, Delete } from '@element-plus/icons-vue'

const props = defineProps({
    search: String,
    delsBtn: Boolean
})
const emit = defineEmits(['update:search', 'searchBtn', 'handleBatchDelete']);

const search = ref(props.search);

const searchBtn = () => {
    emit('update:search', search.value);
    emit('searchBtn');
};

const handleBatchDelete = () => {
    emit('handleBatchDelete')
}
</script>

<style scoped>
.topTitle {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
}
</style>