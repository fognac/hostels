<!-- EditDialog.vue -->
<template>
    <el-dialog :visible.sync="DialogVisible" title="修改数据" width="450" align-center>
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
            <el-button @click="cls">取消</el-button>
            <el-button type="primary" @click="confirmEdit">确认修改</el-button>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue'
import axios from 'axios';
import { ElMessage } from 'element-plus';

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
    DialogVisible: Boolean,
    form: Object
})

const emit = defineEmits(['cls', 'confirmEdit'])

let originalData: User | null = null;
const updateId = ref<number | null>(null);

//对话框确认操作
const confirmEdit = () => {
    console.log("确认对话框")
    if (!originalData) return;
    const { roomNo, custName, price, times } = props.form;
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
    emit('confirmEdit');
}

const cls = () => {
    emit('cls')

}
</script>

<style scoped></style>