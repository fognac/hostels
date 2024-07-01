<script lang="ts" setup>
import { reactive, ref } from "vue"
import { ElMessage, FormInstance, FormRules } from "element-plus"
import { useLoginStore } from "../../stores/index.js"
import { useRouter } from "vue-router"
import { login } from '../../stores/localServer';

const store = useLoginStore()
const ruleFormRef = ref<FormInstance>()
const rgtFormRef = ref<FormInstance>()
const router = useRouter()

const ruleForm = reactive({
  user: "",
  pass: "",
  pass2: "",
})

//二次密码校验
const pass2Valid = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("不能为空"))
  } else {
    if (store.registForm(ruleForm.pass, value)) {
      callback()
    }
    callback(new Error("两次密码不一致"))
  }
}

//表单数据验证规则
const rules = reactive<FormRules<typeof ruleForm>>({
  user: [
    {
      required: true,
      message: "用户名不能为空",
      trigger: "blur",
    },
  ],

  pass: [
    {
      required: true,
      message: "请输入6-16字母`数字组合密码",
      pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/,
      trigger: "blur",
    },
  ],
  pass2: [
    {
      validator: pass2Valid,
      trigger: "blur",
    },
  ],
})

//表单切换
const changForm = ref(true)
const goRegist = () => {
  changForm.value = false

}

// 登录验证
const timer = ref(null)
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  login()
  formEl.validate((valid) => {
    valid = store.subLogin(ruleForm.user, ruleForm.pass)
    if (valid) {
      ElMessage.success("登陆成功")
      router.push("/orderManage")
    } else {
      ElMessage.error("登陆信息错误")
      //3秒后清除表单验证信息
      timer.value = setTimeout(() => {
        formEl.resetFields()
      }, 3000)
      return false
    }
  })
}

//注册验证
const register = (formEl: FormInstance | undefined) => {
  if (timer.value) clearInterval(timer.value)
  console.log("123" + timer)
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      ElMessage.success("注册成功")
      //清除表单数据
      Object.keys(ruleForm).forEach((key) => {
        delete ruleForm[key]
      })
      changForm.value = true
    } else {
      ElMessage.error("注册失败")
      //3秒后清除表单验证信息
      timer.value = setTimeout(() => {
        formEl.resetFields()
      }, 3000)
      return false
    }
  })
}

//返回登录界面
const toLogin = () => {
  changForm.value = true
}
</script>

<template>
  <div class="box">
    <div class="content">
      <span class="icon" v-show="!changForm" @click="toLogin()">
        <el-icon>
          <ArrowLeft />
        </el-icon>返回登录
      </span>
      <div class="forms">
        <!--登录表单-->
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="65px" class="demo-ruleForm"
          :hide-required-asterisk="true" autocomplete="true" v-if="changForm">
          <el-form-item label="用户名" prop="user">
            <el-input v-model="ruleForm.user" type="text" autocomplete="off" placeholder="admin" />
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input v-model="ruleForm.pass" type="password" autocomplete="off" placeholder="a123456" show-password />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
            <el-button @click="goRegist()">注册</el-button>
          </el-form-item>
        </el-form>

        <!--注册表单-->
        <el-form ref="rgtFormRef" :model="ruleForm" :rules="rules" label-width="70px" class="demo-ruleForm"
          :hide-required-asterisk="true" v-else>
          <el-form-item label="用户名" prop="user" class='textcol'>
            <el-input v-model="ruleForm.user" type="text" />
          </el-form-item>
          <el-form-item label="密码" prop="pass" style='color: white;'>
            <el-input v-model="ruleForm.pass" type="password" />
          </el-form-item>
          <el-form-item label="确认密码" prop="pass2" class='textcol'>
            <el-input v-model="ruleForm.pass2" type="password" id="passEsg" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="register(rgtFormRef)" class="rgsbtn">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
body,
html {
  padding: 0;
  margin: 0;
}


.el-form-item__label {
  color: #ffffff;
}

/* 表单模板样式 */
.content {
  width: 400px;
  height: 270px;
  position: absolute;
  /* top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto; */
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 2px 5px rgb(230, 228, 228);

}

.icon {
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  font-size: 12px;
}

.forms {
  position: relative;
}

.box {
  background-color: rgb(168, 168, 168);
  height: calc(100vh - 16px);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
}
</style>
