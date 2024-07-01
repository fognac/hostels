<script setup>
import { imageViewerEmits } from 'element-plus'
import left from "./layout/left/index.vue"
import TLeft from "./layout/top/TopL.vue"
import Tright from "./layout/top/TopR.vue"
imageViewerEmits
</script>

<template>
  <div class="common-layout" style="margin:0px">
    <el-container>
      <!-- 顶部 -->
      <el-header class="header clearfix">
        <span class="Tleft">
          <TLeft />
        </span>
        <p class="Tright" style="display:inline-block">
          <Tright />
        </p>

      </el-header>
      <!-- 中心面板 -->
      <el-container class="container">
        <!-- 左边导航 -->
        <el-aside width="200px" class="aside">
          <left></left>
        </el-aside>
        <!-- 内容区 -->
        <el-main class="contain">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>


<style scoped>
* {
  margin: 0px;
  padding: 0px;
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

/* 顶部 */
.header {
  width: 100%;
  margin-top: 0;
  height: 80px;
  background-color: #5e5c64;
  margin-bottom: 10px;
  overflow: hidden;
  box-shadow: 2px 2px 10px 2px rgb(195, 195, 195);
}

/* 顶部左边信息 */
.Tleft {
  line-height: 80px;
  margin-left: 30px;
  font-size: 35px;
  color: rgb(255, 255, 255);

}

/* 顶部右边信息 */
.Tright {
  line-height: 80px;
  margin-left: 20px;
  margin-right: 80px;
  float: right;
}

/* 底部内容版区 导航背景*/
.container {
  height: calc(100vh - 110px);
}

/* 侧边栏 */
.aside {
  box-shadow: 2px 2px 10px 2px rgb(195, 195, 195);
  background-color: #5e5c64;
  margin-right: 15px;
  color: white;
}

/* 中心内容样式 */
.contain {
  background-color: #ffffff;
  padding: 20px;
  box-shadow: 2px 2px 10px 2px rgb(195, 195, 195);
}
</style>
