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
            <div class="topRight">topright</div>
        </div>
        <div class='bottom'>
            <div>1</div>
            <div>2</div>
            <div>3</div>
        </div>
    </div>

</template>

<script setup>

</script>

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
    background-color: chartreuse;
    height: 100%;
}

.topRight {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    background-color: deepskyblue;
    border-radius: 2%;
}

/* 下半部分 */
.bottom {
    height: 50%;
    display: flex;
    gap: 10px;
    padding-top: 10px;
}

/* 三个盒子 */
.bottom div {
    width: calc(33.33% - 5px);
    height: 100%;
    border: 1px solid #ec6565;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 2%;
}
</style>