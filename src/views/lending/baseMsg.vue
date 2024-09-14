<template>
    <div class="box">
        <div class="title-container">
            <p>旅店基础信息</p>
        </div>
        <div class="content-container">
            <div class="form-container">
                <el-form ref="hostelForm" :model="form" :rules="rules" label-width="120px" @submit.prevent="submitForm">
                    <el-form-item label="旅店名称" prop="hName">
                        <el-input v-model="form.hName" style="width: 200px" placeholder="请输入旅店名称" size="small"
                            :readonly="!editable" />
                    </el-form-item>
                    <el-form-item label="店长" prop="pName">
                        <el-input v-model="form.pName" style="width: 200px" placeholder="请输入店长姓名" size="small"
                            :readonly="!editable" />
                    </el-form-item>
                    <el-form-item label="区域" prop="around">
                        <el-select v-model="form.around" filterable placeholder="请选择" style="width: 200px"
                            :disabled="!editable">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="旅店描述" prop="detailMsg">
                        <el-input v-model="form.detailMsg" style="width: 240px;" :autosize="{ minRows: 1, maxRows: 3 }"
                            type="textarea" placeholder="请输入旅店描述" :readonly="!editable" />
                    </el-form-item>
                    <el-form-item label="旅店类型" prop="radios">
                        <el-radio-group v-model="form.radios" :disabled="!editable">
                            <el-radio :label="1">酒店</el-radio>
                            <el-radio :label="2">民宿</el-radio>
                            <el-radio :label="3">旅店</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="tel">
                        <el-input v-model="form.tel" style="width: 200px" placeholder="请输入联系电话" size="small"
                            :readonly="!editable" />
                    </el-form-item>
                    <el-form-item label="详细地址" prop="address">
                        <el-input v-model="form.address" style="width: 240px" :rows="2" type="textarea"
                            placeholder="请输入详细地址" :readonly="!editable" />
                    </el-form-item>
                    <el-form-item>
                        <el-button v-if="!editable" type="primary" @click="toggleEditable" round>编辑</el-button>
                        <template v-else>
                            <el-button type="primary" @click="submitForm" round>确认修改</el-button>
                            <el-button @click="resetForm" round>取消</el-button>
                        </template>
                    </el-form-item>
                </el-form>
            </div>
            <div class="image-upload-container">
                <p style='text-align: center;'>旅店宣传照片</p>
                <el-upload class="image-uploader" action="http://localhost:5173/baseMsg" :on-remove="handleRemove"
                    :before-remove="beforeRemove" :limit="4" :on-exceed="handleExceed" v-model:file-list="imageList"
                    list-type="picture-card" v-if="imageList.length < 5" :on-success="onSuccess"
                    :on-progress='onprogress'>
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'
import { useHostelMsgStore } from '@/stores/hostelMsg'

const store = useHostelMsgStore()
const hostelForm = ref(null)
const form = reactive(store.formData)
const imageList = ref([{
    url: "../../../public/pic/oip1.jpg"
}
])

const loadImageUrls = () => {
    const storedImageUrls = localStorage.getItem('hostelImageUrls')
    if (storedImageUrls) {
        imageList.value = JSON.parse(storedImageUrls)
    }
}

// 加载表单数据
onMounted(() => {
    store.loadFormData()
    loadImageUrls()
})

const saveImageUrls = () => {
    localStorage.setItem('hostelImageUrls', JSON.stringify(imageList.value));
}

const rules = reactive({
    hName: [
        { required: true, message: '请输入旅店名称', trigger: 'blur' },
    ],
    pName: [
        { required: true, message: '请输入店长姓名', trigger: 'blur' },
    ],
    around: [
        { required: true, message: '请选择区域', trigger: 'change' },
    ],
    detailMsg: [
        { required: true, message: '请输入旅店描述', trigger: 'blur' },
    ],
    radios: [
        { required: true, message: '请选择旅店类型', trigger: 'change' },
    ],
    tel: [
        { required: true, message: '请输入联系电话', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '联系电话格式不正确', trigger: 'blur' },
    ],
    address: [
        { required: true, message: '请输入详细地址', trigger: 'blur' },
    ],
})

const options = ref([
    { value: 'Option1', label: '雨花区' },
    { value: 'Option2', label: '天锡区' },
    { value: 'Option3', label: '开福区' },
    { value: 'Option4', label: '岳麓区' },
    { value: 'Option5', label: '南市' },
])

const editable = ref(false); // 控制表单是否可编辑

const toggleEditable = () => {
    editable.value = !editable.value
}

const submitForm = () => {
    if (hostelForm.value) {
        hostelForm.value.validate((valid) => {
            if (valid) {
                console.log('提交表单', form);
                store.saveFormData(form);
                editable.value = false;
            }
        })
    }
}

const resetForm = () => {
    editable.value = false;
    store.resetFormData();
    localStorage.removeItem('hostelImageUrls');

}

const beforeRemove = () => {
    return confirm('确定要删除吗?');
}

const handleRemove = (uploadFile, uploadFiles) => {
    console.log(uploadFile.raw.uid, uploadFiles[0])
    console.log("imgList:" + imageList.value.length)
}

const handleExceed = () => {
    alert(`上传文件达到上限`);
}


//无效函数
const onSuccess = (file) => {
    console.log('上传成功');
    imageList.value.push(file);
    saveImageUrls();
}

// 监听图片变化并更新本地存储
watch(imageList, () => {
    saveImageUrls()
}, { deep: true })
</script>

<style scoped>
.box {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: white;
}

.title-container {
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.content-container {
    display: flex;
    flex: 1;
    justify-content: space-between;
}

.form-container {
    flex: 1;
    padding-right: 20px;
    width: 45%;
}

.image-upload-container {
    flex-basis: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.uploaded-images {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 10px;
    justify-content: center;
}

.uploaded-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin: 5px;
}

.el-textarea .el-input__inner {
    resize: none;
    overflow: auto;
    max-height: 72px;
    min-height: 32px;
    padding: 4px;
    line-height: 24px;
}
</style>
