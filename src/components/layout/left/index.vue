<template>
    <div class="leftNav">
        <el-col :span="12">
            <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="rgb(255,255,255,0)"
                active-text-color="yellow" router text-color="#fff" unique-opened>
                <!-- 入住管理：包括订单和房源的管理 -->
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
                <!--旅店管理：操作旅店的基本信息等操作-->
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>旅店信息</span>
                    </template>
                    <el-menu-item index="ioBook">
                        <span>iobook</span>
                    </el-menu-item>
                    <el-menu-item index="reservation">222</el-menu-item>
                </el-sub-menu>
                <!-- 报表统计：旅店各项经营数据，及收支情况 -->
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
