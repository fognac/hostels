<template>
    <div class='contain'>
        <div class='top'>
            <div class="topLeft">
                <div>
                    <div class='msg'><img src='../../../public/pic/aixin.png'><span>阅览量</span><span>1234</span></div>
                </div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
            </div>
            <div class="topRight">
                <el-carousel autoplay>
                    <el-carousel-item v-for='item in pic.list' :key='item.index'>
                        <img :src="item.src" alt="carousel image" style="height: 100%; width: 100%;">

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
                <div class="title"><span>最新评价</span>
                    <span class='refrush'>
                        <el-icon color='#ccc'>
                            <Refresh />
                        </el-icon>
                    </span>
                </div>
                <div class='comments'>
                    <div>
                        <img src='../../../public/a.jpg'>
                        <i>id123</i>
                        <span>下雨</span>
                    </div>
                    <div>
                        <img src='../../../public/a.jpg'>
                        <i>id12345</i>
                        <span>天晴</span>
                    </div>
                    <div>
                        <img src='../../../public/a.jpg'>
                        <i>id156543353455</i>
                        <span>多云转晴</span>
                    </div>
                </div>
            </div>
            <!-- 第三个盒子 -->
            <div>
                <div class="title"><span>用户统计</span><el-icon color='#ccc' class='refrush'>
                        <Refresh />
                    </el-icon>
                    <span class='tipmMsg' style='color: darkgrey;'>记录最近7日数据</span>
                </div>
                <div class='ects'>123456789</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const pic = ref({
    list: [
        { index: 1, src: " ../../../public/pic/item1.jpg" },
        { index: 2, src: "../../../public/pic/item2.jpg" },
        { index: 3, src: "../../../public/pic/item3.jpg" }
    ]
})
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* 内容区面板 */
.contain {
    width: 100%;
    height: 100%;
    display: flex;
    font-size: 16px;
    flex-direction: column;
    border-radius: 2%;
    background-color: rgb(220, 212, 212)
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
    display: flex;
    align-items: center;
    font-size: 16px;
}

.msg img {
    width: 50px;
    height: 50px;
}

.msg span {
    display: flex;
    flex-wrap: wrap;
}

.topRight {
    width: 60%;
    height: 100%;
    background-color: white;
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

/* 第一个 */
.bottom>div .title {
    position: relative;
    height: 20px;
    width: 100%;
}

.title .tipmMsg {
    display: flex;
    font-size: 10px
}

.refrush {
    float: right;
}

/* 第二个 */
.comments {
    width: 100%;
    height: 230px;
}

.comments div {
    padding: 10px;
    /* 增加内边距 */
    width: 100%;
    height: 33%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
}

.comments img {
    border-radius: 50%;
    width: 45px;
    height: 45px;
    margin-right: 15px;
    position: relative;
}

/* 评论文字  */
.comments span {
    position: absolute;
    font-size: 16px;
    left: 68px;
}

.comments i {
    font-size: 12px;
    align-self: flex-start;
    margin: 0px;
    color: rgb(87, 79, 79);
    position: relative;

}

/* 第三个盒子 */
</style>
