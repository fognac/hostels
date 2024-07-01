<template>
    <div>
        <!-- 表单 -->
        <el-table :data="filterTableData" style="width: 100%  ;min-height: 600px;"
            :default-sort="{ prop: 'roomNo  ', order: 'descending' }">
            <el-table-column label="姓名" prop="custName" />
            <el-table-column label="性别" prop="sex" />
            <el-table-column label="电话" prop="tel" />
            <el-table-column label="支付金额" prop="price" />
            <el-table-column label="房号" prop="roomNo" sortable />
            <!-- <el-table-column label="预定时间" prop="times" > -->
            <el-table-column label="预定时间" sortable>
                <template #default="scope">
                    <div style="display: flex; align-items: center">
                        <el-icon>
                            <timer />
                        </el-icon>
                        <span style="margin-left: 10px">{{ scope.row.times }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="right">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="搜索客户/房间号" />
                </template>
                <!-- 按钮 -->
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="demo-pagination-block" style="margin-left: 35%;">
            <el-pagination :current-page="queryInfo.currentpage" :page-size="queryInfo.pagesize" small="small"
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
import { computed, reactive, ref, onMounted } from 'vue'
import axios from 'axios';
import { ElMessageBox, ElMessage } from 'element-plus';

const total = ref(0)
//数据接口
interface User {
    id: number,
    tel: number
    roomNo: number
    custName: string
    price: string
    times: string
}

const queryInfo = reactive({
    query: '', // 查询参数
    currentpage: 1, // 当前页码
    pagesize: 8 // 每页显示条数
})

const dataList = ref([]);//空数组接受data数据
const fetchData = (page?: number) => {
    console.log("发送");
    // 如果没有指定页码，则使用当前页码
    const curPage = page || queryInfo.currentpage;
    // 发送HTTP请求，实际上会被Mock拦截并返回模拟数据
    axios.post("/order/orderAll/", { page: curPage, pageSize: queryInfo.pagesize }).
        then((res) => {
            dataList.value = res.data.orders
            //实时数据个数
            total.value = res.data.total
        }).catch(error => console.log("房间数据请求失败" + error))
}

// 实现列表搜索 无搜索状态显示所有数据
const search = ref('')
const filterTableData = computed(() =>
    dataList.value.filter(
        (data) =>
            !search.value ||
            data.roomNo.includes(search.value) || data.custName.includes(search.value)
    )
)


const form = reactive({
    id: "",
    tel: "",
    custName: "",
    roomNo: "",
    price: "",
    times: ""
})

let originalData: User | null = null;
const DialogVisible = ref(false)
const updateId = ref<number | null>(null);//更新数据的id
//编辑按钮
const handleEdit = (index: number, row: User) => {
    DialogVisible.value = true;
    updateId.value = row.id
    // 保存原始数据
    originalData = { ...row };
    // 填充表单数据，逐个属性赋值
    form.id = row.id.toString();
    form.roomNo = row.roomNo.toString();
    form.custName = row.custName;
    form.price = row.price;
    form.times = row.times;
}

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

    axios.post('/order/update/', updatedData).then((res) => {
        console.log("请求修改的数据:");
        console.log(res.data.orders);
        DialogVisible.value = false
        fetchData()
    }).catch(error => console.log("请求出错" + error))
}

//取消按钮
const cls = () => {
    DialogVisible.value = false
    for (let key in form) {
        form[key] = '';
    }
    originalData = null;
}
//删除数据
const handleDelete = (index: number, row: User) => {
    ElMessageBox.confirm('是否确认删除?', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',

        type: 'warning',
    }).then(() => {
        axios.post('/order/delete/', { id: row.id }).then((res) => {
            fetchData();
            ElMessage({
                type: 'success',
                message: '删除成功'
            })
        })
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '已取消'
        })
    })
}

onMounted(() => {
    fetchData()
})


// 监听 页码值 改变
const handleCurrentChange = (newVal: number) => {
    queryInfo.currentpage = newVal
    fetchData()
}


</script>

<style>
.demo-form-inline .el-input {
    --el-input-width: 220px;
}

.demo-form-inline .el-select {
    --el-select-width: 220px;
}
</style>