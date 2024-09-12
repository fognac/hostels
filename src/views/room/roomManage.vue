<template>
    <div class='box'>
        <div class='topTitle'>
            <el-input v-model="search" style="width: 240px" placeholder="搜索房间号/姓名" clearable size="small" />
            <el-button :icon="Search" type="primary" size="small" round>搜索</el-button>
            <el-button type="primary" :icon="Edit" size="small" round @click='add'>新增</el-button>
        </div>
        <!-- 表单 -->
        <el-table :data="filterTableData" style="width: 100%  ;min-height: 500px;" border
            :default-sort="{ prop: 'roomNo', order: 'ascending' }">
            <el-table-column label="房号" prop="roomNo" sortable align="center" />
            <el-table-column label="类型" prop="kind" align="center" />
            <el-table-column label="价格" prop="price" sortable align="center" />
            <el-table-column label="设施" align="center">
                <template #default="scope">
                    <el-tag>{{ scope.row.facility }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作">

                <!-- 按钮 -->
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)" round>编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"
                        round>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="demo-pagination-block" style="margin-left: 35%;">
            <el-pagination :current-page="queryInfo.currentpage" :page-size="queryInfo.pagesize" small
                layout="total, prev, pager, next, jumper" :total="total" @current-change="handleCurrentChange" />
        </div>
        <!-- 修改弹窗 -->
        <el-dialog v-model="DialogVisible" title="修改数据" width="450" align-center>
            <el-form :model="form" label-width="auto" clearable>
                <el-form-item label="房间号">
                    <el-input type="text" v-model="form.roomNo" />
                </el-form-item>
                <el-form-item label="类型">
                    <el-input type="text" v-model="form.kind" />
                </el-form-item>
                <el-form-item label="价格">
                    <el-input type="text" v-model="form.price" />
                </el-form-item>
                <el-form-item label="设施">
                    <el-input type="text" v-model="form.facility" />
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
        <!-- 新增弹窗 -->
        <el-dialog v-model="addDialogVisible" title="新增数据" width="450" align-center>
            <el-form :model="form" label-width="auto" clearable ref="addForm" :rules="rules">
                <el-form-item label="房间号">
                    <el-input type="text" v-model="form.roomNo" />
                </el-form-item>
                <el-form-item label="类型">
                    <el-input type="text" v-model="form.kind" />
                </el-form-item>
                <el-form-item label="价格">
                    <el-input type="text" v-model="form.price" />
                </el-form-item>
                <el-form-item label="设施">
                    <el-input type="text" v-model="form.facility" />
                </el-form-item>
            </el-form>
            <template #footer>
                <el-button type="primary" @click=addDialog()>
                    确认
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
import { ElMessageBox, ElMessage, FormRules } from 'element-plus';
import { Search, Edit } from '@element-plus/icons-vue'
import { localStorageService } from "../../assets/api/LocalStroge.js"

let total = ref(0)
//数据接口
interface User {
    id: number,
    roomNo: number
    kind: string
    price: string
    photo: string
    facility: string
}

const queryInfo = reactive({
    currentpage: 1, // 当前页码
    pagesize: 10 // 每页显示条数
})

onMounted(() => {
    restoreFromLocalStorage() // 从 localStorage 恢复数据
    if (dataList.value.length === 0) {
        fetchData() // 如果 localStorage 中没有数据，发起请求
    }
})

// 从 localStorage 恢复数据
const restoreFromLocalStorage = () => {
    const storedData = localStorageService.get('roomsData')
    if (storedData) {
        dataList.value = storedData.rooms
        total.value = storedData.total
    }
}

// 保存数据到 localStorage
const saveToLocalStorage = (data) => {
    localStorageService.save('roomsData', data)
}

let dataList = ref([]);//空数组接受data数据
const fetchData = (page?: number) => {
    // 如果没有指定页码，则使用当前页码
    const curPage = page || queryInfo.currentpage;
    axios.post('hotel/room/roomAll/', { page: curPage, pageSize: queryInfo.pagesize }).
        then((res) => {
            dataList.value = res.data.rooms
            total.value = res.data.total
            saveToLocalStorage(res.data)
        }).catch(error => console.log("房间数据请求失败" + error))
}


// 实现列表搜索 无搜索状态显示所有数据
let search = ref('')
const filterTableData = computed(() =>
    dataList.value.filter(
        (data) =>
            !search.value ||
            data.roomNo.includes(search.value)
    )
)

const form = reactive({
    id: '',
    roomNo: '',
    kind: '',
    price: '',
    photo: '',
    facility: ''
})

const rules = reactive<FormRules<typeof form>>(
    {
        roomNo: [
            { required: true, message: '请输入房间号', trigger: 'blur' }
        ],
        kind: [
            { required: true, message: '请输入类型', trigger: 'blur' }
        ],
        price: [
            { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        facility: [
            { required: true, message: '请输入设施', trigger: 'blur' }
        ]
    })

//新增数据
let addDialogVisible = ref(false)
const add = () => {
    Object.keys(form).forEach(key => {
        form[key] = '';
    });
    addDialogVisible.value = true;
}
let addForm = ref(null)
const addDialog = () => {
    if (addForm.value) {
        addForm.value.validate((valid) => {
            if (valid) {
                axios.post('hotel/room/addRoom', form)
                    .then(res => {
                        // 请求成功处理逻辑
                        fetchData()
                        addDialogVisible.value = false
                    })
                    .catch(error => {
                        console.error(error)
                        ElMessage.error("新增失败")
                    });
            }
        });
    }
}

//编辑按钮
let originalData: User | null = null;
let DialogVisible = ref(false)
let updateId = ref<number | null>(null);//更新数据的id
const handleEdit = (index: number, row: User) => {
    DialogVisible.value = true;
    updateId.value = row.id
    // 保存原始数据
    originalData = { ...row };
    // 填充表单数据，逐个属性赋值
    form.id = row.id.toString();
    form.roomNo = row.roomNo.toString();
    form.kind = row.kind;
    form.price = row.price;
    form.facility = row.facility;
}

//修改数据
const ChangeDialogVisible = () => {
    if (!originalData) return;
    const { roomNo, kind, price, facility } = form;
    // 保留未修改的原始数据
    const updatedData = {
        id: updateId.value,
        roomNo: roomNo || originalData.roomNo,
        kind: kind || originalData.kind,
        price: price || originalData.price,
        facility: facility || originalData.facility
    };
    axios.post('hotel/room/update/', updatedData).then((res) => {
        console.log(res.data.rooms);
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
        axios.post('hotel/room/delete/', { id: row.id }).then((res) => {
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

// 监听 页码值 改变
const handleCurrentChange = (newVal: number) => {
    queryInfo.currentpage = newVal
    fetchData()
}

</script>

<style spode>
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

/* 按钮 */
.header-toolbar {
    display: flex;
    align-items: center;
}

.header-toolbar .el-button {
    margin-right: 10px;
}
</style>