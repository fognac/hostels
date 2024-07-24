<template>
   <div>
        <!-- 表单 -->
        <el-table :data="filterTableData" style="width: 100%  ;min-height: 600px;"
            :default-sort="{ prop: 'roomNo  ', order: 'descending' }">
            <el-table-column label={{filterTableData.name}} prop="custName" />
            <el-table-column label={{filterTableData.sex}} prop="sex" />
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

<script setup>

</script>
<style lang="less" scoped>
</style>
