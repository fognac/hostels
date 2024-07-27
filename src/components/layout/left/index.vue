<template>
    <div class="leftNav">
        <el-col :span="12">
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="rgb(255,255,255,0)"
                active-text-color="yellow" router text-color="#fff" unique-opened>
                <!-- 图书采编管理：包括图书的采购、编目、分类、入库等流程管理 -->
                <el-sub-menu index="1" style="border-bottom: 1px;">
                    <template #title>
                        <el-icon>
                            <location />
                        </el-icon>
                        <span>入住管理</span>
                    </template>
                    <el-menu-item index="orderManage">预定信息</el-menu-item>
                    <el-menu-item index="roomManage">房间信息</el-menu-item>

                </el-sub-menu>
                <!--借阅管理：处理读者的借阅请求，包括借书、还书、续借、预约等操作-->
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>旅店信息</span>
                    </template>
                    <el-menu-item index="ioBook">基础信息</el-menu-item>
                    <el-menu-item index="reservation">222</el-menu-item>
                </el-sub-menu>
                <!-- 报表统计：生成借阅情况统计报表、图书流通情况报表、读者借阅排行榜等，为图书馆管理者提供数据支持 -->
                <el-menu-item index="report">
                    <el-icon>
                        <document />
                    </el-icon>
                    <span>报表统计</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </div>
    <div>
    </div>
</template>


<script lang="ts" setup>
</script>
<style scoped>
.leftNav {
    position: relative;
    color: white;
}

/* 控制整个导航宽 */
.el-menu-vertical-demo {
    width: 200px;
    border-collapse: collapse;
    color: white;
}

/* 二级导航 */
.el-icon {
    property: initial;
}
</style>
