<!-- TableWithPagination.vue -->
<template>
    <div>
        <el-table :data="filterTableData" style="width: 100%; 
        min-height: 500px;" border :default-sort="{ prop: 'roomNo', order: 'descending' }"
            @selection-change="handleSelectionChange" @click="handleSelectAll">
            <el-table-column type="selection" width="50px" align="center" />
            <el-table-column label="姓名" prop="custName" width="100px" align="center" />
            <el-table-column label="性别" prop="sex" width="80px" align="center" />
            <el-table-column label="电话" prop="tel" width="160px" align="center" />
            <el-table-column label="房间号" prop="roomNo" width="90px" align="center" />
            <el-table-column label="应付金额" prop="price" width="90px" align="center" />
            <el-table-column label="实付金额" prop="price" width="90px" align="center" />
            <el-table-column label="状态" prop="states" width="100px" align="center" :filters="[
                { text: '已完成', value: '0' },
                { text: '已支付', value: '1' },
            ]" :filter-method="filterTag" filter-placement="bottom">
                <template #default="scope">
                    <el-tag :type="scope.row.states === '0' ? 'info' : 'success'" disable-transitions>
                        <span v-if="scope.row.states === '0'">已完成</span>
                        <span v-else>已支付</span>
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="预定时间" width="auto" align="center">
                <template #default="scope">
                    <div style="display: flex; align-items: center;justify-content: center;">
                        <span style="margin-left: 10px">{{ scope.row.times }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" width="150px" label="操作">
                <template #default="scope">
                    <el-button size="small" @click="openEditDialog(scope.row)" round>编辑</el-button>
                    <el-button size="small" type="danger" @click="handleSingleDelete(scope.$index, scope.row)"
                        round>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="demo-pagination-block" style="margin-left: 35%;">
            <el-pagination :current-page="queryInfo.currentPage" :page-size="queryInfo.pagesize" small
                layout="total, prev, pager, next, jumper" :total="total" @current-change="handleCurrentChange" />
        </div>

    </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed, ref } from 'vue'

interface User {
    id: number,
    tel: number,
    roomNo: number,
    custName: string,
    price: string,
    times: string,
    states: string
}

const props = defineProps({
    dataList: Array,
    queryInfo: Object,
    total: Number,

})

const emit = defineEmits([
    'handleEdit',
    'handleSingleDelete',
    'handleSelectionChange',
    'handleSelectAll',
    'handleCurrentChange',
    'openEditDialog'
])

const filterTableData = computed(() => {
    const searchTerm = props.queryInfo.search;
    return props.dataList.filter(
        (data: User) =>
            !searchTerm ||
            data.roomNo.toString().includes(searchTerm) || data.custName.includes(searchTerm)
    )
})

//当选择项发生变化时会触发该事件
const handleSelectionChange = (val: User[]) => {
    emit('handleSelectionChange', val)
}

//全选按钮
const handleSelectAll = () => {
    emit('handleSelectAll')
}
const DialogVisible = ref(false)
//编辑按钮
const openEditDialog = (row) => {
    emit('openEditDialog', row)
}

//删除按钮
const handleSingleDelete = (index: number, row: User) => {
    emit('handleSingleDelete', index, row)
}

//多选状态改变
const handleCurrentChange = (newVal: number) => {
    emit('handleCurrentChange', newVal)
}

//状态过滤
const filterTag = (value: string, row: User) => {
    return row.states === value
}


</script>

<style scoped>
.demo-pagination-block {
    margin-left: 35%;
}
</style>