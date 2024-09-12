<template>
    <div class='box'>
        <div class='topTitle'>
            <el-input v-model="search" style="width: 240px" placeholder="搜索房间号/姓名" clearable size="small" />
            <el-button :icon="Search" type="primary" size="small" round>搜索</el-button>
            <el-button type="danger" :icon="Delete" size="small" round :disabled="delsBtn"
                @click='handleBatchDelete'>批量删除</el-button>
        </div>
        <!-- 表单 -->
        <el-table :data="filterTableData" style="width: 100% ;min-height: 500px;" border
            :default-sort="{ prop: 'roomNo', order: 'descending' }" @selection-change="handleSelectionChange"
            @click=handleSelectAll>
            <el-table-column type="selection" width="50px" align="center" />
            <el-table-column label="姓名" prop="custName" width="100px" align="center" />
            <el-table-column label="性别" prop="sex" width="80px" align="center" />
            <el-table-column label="电话" prop="tel" width="160px" align="center" />
            <el-table-column label="房间号" prop="roomNo" width="90px" align="center" />
            <el-table-column label="应付金额" prop="price" width="90px" align="center" />
            <el-table-column label="实付金额" prop="price" width="90px" align="center" />
            <el-table-column label="状态" prop="states" width="100px" align="center" :filters="[
                { text: '已完成', value: '0' },
                { text: '未完成', value: '1' },
            ]" :filter-method="filterTag" filter-placement="bottom">
                <template #default="scope">
                    <el-tag :type="scope.row.states === '0' ? 'info' : 'success'" disable-transitions> <span
                            v-if="scope.row.states === '0'">已完成</span>
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
                <!-- 按钮 -->
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)" round>编辑</el-button>
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
        <!-- 修改弹窗 -->
        <el-dialog v-model="DialogVisible" title="修改数据" width="450" align-center>
            <el-form :model="form" label-width="auto" clearable>
                <el-form-item label="姓名">
                    <el-input type="text" v-model="form.custName" />
                </el-form-item>
                <el-form-item label="房间号">
                    <el-input type="text" v-model="form.roomNo" />
                </el-form-item>
                <el-form-item label="支付金额">
                    <el-input type="text" v-model="form.price" />
                </el-form-item>
                <el-form-item label="预定时间">
                    <el-input type="text" v-model="form.times" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" @click=ChangeDialogVisible()>
                    确认修改
                </el-button>
                <el-button @click=cls()>
                    取消
                </el-button>
            </template>
        </el-dialog>

    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, onMounted, watch } from 'vue'
import axios from 'axios';
import { ElMessageBox, ElMessage } from 'element-plus';
import { Search, Delete } from '@element-plus/icons-vue'
import { localStorageService } from "../../assets/api/LocalStroge.js"

//数据接口
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
    pagesize: 10
})

// 从 localStorage 恢复数据
const restoreFromLocalStorage = () => {
    const storedData = localStorageService.get('ordersData')
    if (storedData) {
        dataList.value = storedData.orders
        total.value = storedData.total
    }
}

// 保存数据到 localStorage
const saveToLocalStorage = (data) => {
    localStorageService.save('ordersData', data)
}

//请求数据
let total = ref(0)
let dataList = ref([]);//空数组接受data数据
const allData = ref<User[]>([]); // 存储所有数据的全局变量
const fetchData = async (page?: number) => {
    // 如果没有指定页码，则使用当前页码
    const curPage = page || queryInfo.currentPage;
    await axios.post('hotel/order/orderAll/', { page: curPage, pageSize: queryInfo.pagesize }).
        then(async (res) => {

            dataList.value = res.data.orders; // 更新当前页的数据   
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

// 实现列表搜索 无搜索状态显示所有数据
let search = ref('')
const filterTableData = computed(() =>
    dataList.value.filter(
        (data) =>
            !search.value ||
            data.roomNo.includes(search.value) || data.custName.includes(search.value)
    )
)

// 初始化数据
onMounted(() => {
    restoreFromLocalStorage() // 从 localStorage 恢复数据
    if (dataList.value.length === 0) {
        fetchData() // 如果 localStorage 中没有数据，发起请求
    }
})

const form = reactive({
    id: "",
    tel: "",
    custName: "",
    roomNo: "",
    price: "",
    times: "",
    states: ""
})

let originalData: User | null = null;
let DialogVisible = ref(false)
let updateId = ref<number | null>(null);//更新数据的id
//编辑按钮
const handleEdit = (index: number, row: User) => {
    DialogVisible.value = true;
    updateId.value = row.id
    // 保存原始数据
    originalData = { ...row };
    // 填充表单数据，逐个属性赋值。
    form.id = row.id.toString();
    form.roomNo = row.roomNo.toString();
    form.custName = row.custName;
    form.price = row.price;
    form.times = row.times;
}

//修改框
const ChangeDialogVisible = () => {
    if (!originalData) return;
    const { roomNo, custName, price, times } = form;
    // 保留未修改的原始数据
    const updatedData = {
        id: updateId.value,
        roomNo: roomNo || originalData.roomNo,
        custName: custName || originalData.custName,
        price: price || originalData.price,
        times: times || originalData.times
    };

    axios.post('hotel/order/update/', updatedData).then((res) => {
        console.log("请求修改的数据:");
        console.log(res.data.orders);
        DialogVisible.value = false
        fetchData()
    }).catch(error => console.log("请求出错" + error))
}

//取消按钮
let cls = () => {
    DialogVisible.value = false
    for (let key in form) {
        form[key] = '';
    }
    originalData = null;
}
// 删除数据
const handleDelete = (ids: number[]) => {
    ElMessageBox.confirm('是否确认删除选中的项?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning',
    }).then(async () => {
        await axios.post('hotel/order/delete/', { ids })
        try {
            await fetchData(queryInfo.currentPage);  // 刷新数据
            // 如果当前页数据为空，调整到上一页
            if (dataList.value.length === 0 && queryInfo.currentPage > 1) {
                queryInfo.currentPage -= 1;
                await fetchData(queryInfo.currentPage);
            }
            ElMessage({
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

// 单项删除
const handleSingleDelete = (index: number, row: User) => {
    handleDelete([row.id]);
};

//全选删除
let delsBtn = ref(true);//批量删除按钮禁用状态
const multipleSelection = ref<User[]>([])//当前选中的数据
const handleSelectionChange = (val: User[]) => {
    multipleSelection.value = val;
    delsBtn.value = multipleSelection.value.length > 0;
}

// 全选功能
const handleSelectAll = () => {
    multipleSelection.value = [...allData.value];
    delsBtn.value = multipleSelection.value.length > 0;
};

// 批量删除按钮事件
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
};

watch(multipleSelection, (newVal) => {
    delsBtn.value = !(newVal.length > 0);
});

//表单过滤
const filterTag = (value: string, row: User) => {
    return row.states === value
}

// 监听 页码值 改变
const handleCurrentChange = (newVal: number) => {
    queryInfo.currentPage = newVal
    fetchData(newVal)
}
</script>

<style>
.box {
    background-color: white;
    height: 100%;
}

.topTitle {
    width: 100%;
    height: 50px;
    left: 10px;
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