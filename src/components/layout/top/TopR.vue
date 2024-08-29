<template>
    <div>
        <el-row class="block-col-2" style='width: 100px;'>
            <el-col>

                <el-avatar :size="40" class="mr-3" style="margin-top: 20px;" :src="Imgsrc" />
                <el-dropdown trigger="click">
                    <span class="user-name">
                        {{ userID }}
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="DialogVisible = true">个人信息</el-dropdown-item>
                            <el-dropdown-item @click='quit'>
                                退出
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-col>
        </el-row>
        <!-- 修改个人信息 -->
        <el-dialog v-model="DialogVisible" width="450" align-center>
            <!-- 表单 -->
            <el-form :model="form" label-width="auto" clearable>
                <el-form-item label="用户名">
                    <el-input v-model="form.Cusername" type="text" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="form.Cpassword" show-password />
                </el-form-item>
                <el-form-item label="确认密码">
                    <el-input type="password" v-model="form.Cpassword2" show-password />
                </el-form-item>
                <p style="float: right;">
                    <el-button type="primary" @click="ChangeDialogVisible()">
                        确认修改
                    </el-button>
                    <el-button type="primary" @click="cls()">
                        取消
                    </el-button>
                </p>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { logout } from '../../../stores/localServer';

const router = useRouter()
const Imgsrc = ref("../public/a.jpg")
//修改个人信息
const form = reactive({
    Cusername: '',
    Cpassword: '',
    Cpassword2: ''
})
const userID = ref("渔时")
const DialogVisible = ref(false)
const ChangeDialogVisible = () => {
    if (form.Cusername && form.Cpassword && form.Cpassword2) {
        userID.value = form.Cusername
        ElMessage({
            message: '更改个人信息成功',
            type: 'success',
        })
        form.Cusername = ""
        form.Cpassword = ""
        form.Cpassword2 = ""
        DialogVisible.value = false;
    } else {
        ElMessage({
            message: '已取消更改',
            type: 'error',
        })
    }
}
const cls = () => {

    DialogVisible.value = false;
    for (let key in form) {
        form[key] = '';
    }
}
//退出登录
const quit = () => {
    ElMessage.confirm('确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        logout()
        router.push("/login")
    }).catch((err) => {
        console.log(err)
    });

}

</script>
<style scoped>
.block-col-2 .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    padding-top: 20px;
}

.block-col-2 .el-dropdown-link {
    display: flex;
    align-items: center;
}

.user-name {
    line-height: 80px;
    color: rgb(255, 255, 255);
    margin-left: 10px;
    font-size: 18px;
}
</style>
