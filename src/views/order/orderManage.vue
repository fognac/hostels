<!-- ParentComponent.vue -->
<template>
    <div class="box">
        <TopTitle v-model:search="queryInfo.search" :delsBtn="delsBtn" @searchBtn="handleSearch"
            @handleBatchDelete="handleBatchDelete" />
        <TablePage :dataList="dataList" :queryInfo="queryInfo" :total="total" @handleSingleDelete="handleSingleDelete"
            @handleSelectionChange="handleSelectionChange" @handleSelectAll="handleSelectAll"
            @handleCurrentChange="handleCurrentChange" @openEditDialog="openEditDialog" />
        <EditDialog :DialogVisible.sync="DialogVisible" :form="form" @cls="cls" @confirmEdit="confirmEdit" />
    </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from 'vue'
import axios from 'axios';
import { ElMessageBox, ElMessage } from 'element-plus';
import { localStorageService } from "../../assets/api/LocalStroge.js"
import TopTitle from './TopTitle.vue';
import EditDialog from './EditDialog.vue';
import TablePage from './tablePage.vue';

interface User {
    id: number,
    tel: number,
    roomNo: number,
    custName: string,
    price: string,
    times: string,
    states: string
}

const queryInfo = reactive({
    currentPage: 1,
    pagesize: 10,
    search: ''
})

//读取本地数据
const restoreFromLocalStorage = () => {
    const storedData = localStorageService.get('ordersData')
    if (storedData) {
        dataList.value = storedData.orders
        total.value = storedData.total
    }
}

//设置本地缓存
const saveToLocalStorage = (data) => {
    localStorageService.save('ordersData', data)
}

let total = ref(0)
let dataList = ref<User[]>([])
const allData = ref<User[]>([]) // 存储所有数据的全局变量 
const fetchData = async (page?: number) => {
    const curPage = page || queryInfo.currentPage;
    await axios.post('hotel/order/orderAll/', {
        page: curPage,
        pageSize: queryInfo.pagesize
    })
        .then(async (res) => {
            dataList.value = res.data.orders;
            // 更新当前页的数据 
            total.value = res.data.total
            if (dataList.value.length === 0 && page > 1) {
                queryInfo.currentPage -= 1;
                await fetchData(queryInfo.currentPage);
            }
            saveToLocalStorage({
                orders: dataList.value,
                total: total.value
            })
        }).catch(error => console.log("订单数据请求失败" + error))
}

const form = reactive<User>({
    id: null,
    tel: null,
    custName: "",
    roomNo: null,
    price: "",
    times: "",
    states: ""
})

let originalData: User | null = null;
const DialogVisible = ref(false)
let updateId = ref<number | null>(null)// 更新数据的id 

const openEditDialog = (row) => {

    DialogVisible.value = true;  // 打开对话框
    updateId.value = row.id
    originalData = { ...row };// 复制行数据到表单
    Object.assign(form, row);
    console.log(123);


}

//对话框确认操作
const confirmEdit = () => {
    if (!originalData) return;
    const { roomNo, custName, price, times } = form;
    const updatedData = {
        id: updateId.value,
        roomNo: roomNo || originalData.roomNo,
        custName: custName || originalData.custName,
        price: price || originalData.price,
        times: times || originalData.times
    };
    axios.post('hotel/order/update/', updatedData).then((res) => {
        console.log("请求修改的数据:", res.data.orders);
    }).catch(error => {
        ElMessage({
            type: 'error',
            message: '请求出错'
        })
    })
    DialogVisible.value = false;
}

const cls = () => {
    DialogVisible.value = false;
    updateId.value = null;
    originalData = null;
    for (let key in form) {
        form[key] = '';
    }
};

const handleSearch = () => {
    fetchData(queryInfo.currentPage)
}

//删除请求
const handleDelete = (ids: number[]) => {
    ElMessageBox.confirm('是否确认删除选中的项?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定', type: 'warning',
    })
        .then(async () => {
            await axios.post('hotel/order/delete/', { ids })
            try {
                await fetchData(queryInfo.currentPage);
                // 刷新数据
                if (dataList.value.length === 0 && queryInfo.currentPage > 1) {
                    queryInfo.currentPage -= 1;
                    await fetchData(queryInfo.currentPage);
                } ElMessage({
                    type: 'success',
                    message: ids.length > 1 ? '批量删除成功' : '删除成功'
                })
            } catch (error) {
                ElMessage({
                    type: 'error',
                    message: '删除失败'
                })
            }
        }).catch(() => {
            ElMessage({
                type: 'info',
                message: '已取消'
            })
        })
}

//单个删除按钮
const handleSingleDelete = (index: number, row: User) => {
    handleDelete([row.id]);
};

// 批量删除按钮的禁用状态 
let delsBtn = ref(true)
// 当前选中的数据 
const multipleSelection = ref<User[]>([])
//选中状态列表
const handleSelectionChange = (val: User[]) => {
    multipleSelection.value = val; delsBtn.value = multipleSelection.value.length > 0;
}


const handleSelectAll = () => {
    multipleSelection.value = [...allData.value];
    delsBtn.value = multipleSelection.value.length > 0;
}

const handleBatchDelete = () => {
    if (multipleSelection.value.length === 0) {
        ElMessage({
            type: 'warning',
            message: '请选择要删除的项'
        });
        return;
    }
    const ids = multipleSelection.value.map(item => item.id);
    handleDelete(ids);
}

//监视选中项状态
watch(multipleSelection, (newVal) => {
    delsBtn.value = !(newVal.length > 0);
});


const handleCurrentChange = (newVal: number) => {
    queryInfo.currentPage = newVal
    fetchData(newVal)
}

onMounted(() => {
    restoreFromLocalStorage()
    // 如果 localStorage 中没有数据，发起请求 
    if (dataList.value.length === 0) {
        fetchData()
    }
})
</script>

<style spode>
.box {
    height: 100%;
}

.topTitle {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
}

.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.demo-form-inline .el-select {
    --el-select-width: 220px;
}
</style>
