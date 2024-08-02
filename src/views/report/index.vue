<template>
    <div class='contain'>
        <div class='top'>
            <div class="topLeft">
                <div>
                    <div class='msg'>♥阅览量1234</div>
                </div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
            </div>
            <div class="topRight">
                <el-carousel height="100%" autoplay>
                    <el-carousel-item>
                        <img src="../../../public/pic/item1.jpg" alt="carousel image"
                            style="width: 10px; height: 100px;">
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <div class='bottom'>
            <!-- 第一个盒子 -->
            <div>
                <span class="title" style='color:black;'>经营事项</span>
                <div style="height: 80%; max-width: 80%;">
                    <el-steps direction="vertical" :active="2">
                        <el-step title="6.17维修检查" />
                        <el-step title="7.2卫生" />
                        <el-step title="7.30更换洗漱用品" />
                        <el-step title="8.30更换洗漱用品" />
                    </el-steps>
                </div>
            </div>
            <!-- 第二个盒子 -->
            <div>
                <div class="title"><span>最新评价</span><span class='refrush'><el-icon color='#ccc'>
                            <Refresh />
                        </el-icon></span></div>
                <div class='comments'>
                    <div>
                        <img src='../../../public/a.jpg'><i>id</i>
                        <span>评论1</span>
                    </div>
                    <div><img src='../../../public/a.jpg'><i>id</i>
                        <span>评论1</span>
                    </div>
                    <div> <img src='../../../public/a.jpg'><i>id</i>
                        <span>评论1</span>
                    </div>

                </div>
            </div>
            <!-- 第三个盒子 -->
            <div>
                <div>用户统计<span>统计最近7日数据</span></div>
                <div>123</div>
            </div>
        </div>
    </div>


</template>

<script setup>
import { ref } from 'vue'
const pic = ref({
    list: [
        { index: 1, src: " ../../../public/pic/item1.jpg" },
        { index: 2, src: "../../../public/pic/item2.jpg" }, {
            index: 3, src: "../../../public/pic/item3.jpg"
        }]
}) </script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 内容区 */
.contain {
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 16px;
    flex-direction: column;
    border-radius: 2%;
}

/* 上半部分 */
.top {
    display: flex;
    height: 50%;
    width: 100%;
}

.topLeft {
    display: flex;
    width: 40%;
    flex-wrap: wrap;
    gap: 10px;
}


/* 四宫格 */
.topLeft div {
    border-radius: 2%;
    background-color: rgb(255, 255, 255);
    width: calc(50% - 5px);
    height: calc(50% - 5px);
    display: flex;
    justify-content: center;
    align-items: center;
}

.msg {
    width: 100%;
    height: 100%;
}

.topRight {
    border: 1px solid red;
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
}

/* 下半部分 */
.bottom {
    height: 50%;
    display: flex;
    gap: 10px;
    padding-top: 10px;
}

/* 三个盒子 */
.bottom>div {
    width: calc(33.33% - 5px);
    height: 100%;
    display: flex;
    padding: 15px;
    border-radius: 2%;
    flex-wrap: wrap;
    background-color: white;
    vertical-align: top;
}


.bottom>div .title {
    position: relative;
    height: 20px;
    width: 100%;
}

.refrush {
    float: right;
}

.comments {
    width: 100%;
    height: 230px;
    overflow: auto;

}

.comments div {
    padding: 10px;
    /* 增加内边距 */
    width: 100%;
    height: auto;
    display: flex;
    /* 使用 flex 布局 */
    justify-content: space-between;
    /* 左右对齐 */
    align-items: flex-end;
    /* 底部对齐 */
}

.comments img {
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-right: 10px;
}

/* 评论id和文字  */
.comments span {
    font-size: 16px;
    color: rgb(87, 79, 79);

}

.comments i {
    font-size: 12px;
    color: rgb(87, 79, 79);
    align-self: flex-start;
    /* 图片和 id 顶部对齐 */
    margin-bottom: auto;
    /* 确保 id 底部与评论文本对齐 */
}
</style>
