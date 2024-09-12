import { createRouter, createWebHistory } from "vue-router"
import { ElMessage } from "element-plus"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("@/components/login/Login.vue"),
    },
    {
      //登陆后的主页
      path: "/",
      name: "",
      redirect: "orderManage",
      component: () => import("@/components/Layout.vue"),
      children: [
        {
          //预定
          path: "orderManage",
          name: "orderManage",
          component: () => import("@/views/order/orderManage.vue"),
        },
        {
          //房间
          path: "roomManage",
          name: "roomManage",
          component: () => import("@/views/room/roomManage.vue"),
        },

        {
          path: "lending",
          name: "lending",
          component: () => import("@/views/lending/index.vue"),
          children: [
            {
              //预约
              path: "/employee",
              name: "employee",
              component: () => import("@/views/lending/employee.vue"),
            },
            {
              //借书
              path: "/baseMsg",
              name: "baseMsg",
              component: () => import("@/views/lending/baseMsg.vue"),
            },
          ],
        },

        {
          //报表
          path: "/report",
          name: "report",
          component: () => import("@/views/report/index.vue"),
        },
      ],
    },
  ],
})
router.beforeEach((to, from, next) => {
  if (to.name !== "login") {
    if (localStorage.getItem("isLogin")) {
      // 判断是否已经登录
      console.log("登录判断通过")
      next()
    } else {
      ElMessage.warning("请先登录")
      next({
        name: "login",
      })
    }
  } else {
    //如果是登录页面直接放行
    next()
  }
})
export default router
