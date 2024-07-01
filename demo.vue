<!--MockView.vue-->
<template>
    <div>
        <h1>mock</h1>
        <div v-for="item in list" :key="item.id">
            <!-- <p>{{item.name}}</p>
			{{item.date}}-{{item.time}}
			<p>{{item.pdate}}</p>
			<p>{{item.now}}</p>
			<p>{{item.das}}</p>
			<p>{{item.keyword}}</p> -->
            <p>{{ item.email }}</p>
            <p>{{ item.ip }}</p>
            <p>{{ item.address }}</p>
            <img :src="item.pic" alt="">
        </div>
    </div>
</template>
 
<script setup>
import { ref } from "vue"
import request from "@/utils/request.js"
const list = ref([]);
request.get("/api/random?name=wei&age=18").then(res => {
    list.value = res.data.list;
})
</script>
 
<style></style>