import Mock from "mockjs"
function randomDate(start, end) {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const timestamp = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  )
  return timestamp.toISOString().split("T")[0] // 返回 YYYY-MM-DD 格式的日期
}

function randomTime(start, end) {
  const startSeconds = start.split(":").reduce((acc, time) => 60 * acc + +time)
  const endSeconds = end.split(":").reduce((acc, time) => 60 * acc + +time)
  const randomSeconds =
    Math.floor(Math.random() * (endSeconds - startSeconds + 1)) + startSeconds
  const hours = String(Math.floor(randomSeconds / 3600)).padStart(2, "0")
  const minutes = String(Math.floor((randomSeconds % 3600) / 60)).padStart(
    2,
    "0"
  )
  const seconds = String(randomSeconds % 60).padStart(2, "0")
  return `${hours}:${minutes}:${seconds}`
}
const randomDateTime = (startDate, endDate, startTime, endTime) => {
  const date = randomDate(startDate, endDate)
  const time = randomTime(startTime, endTime)
  return `${date}/${time} `
}

let data = Mock.mock({
  code: 200,
  "orders|29": [
    //生成6条数据 数组
    {
      "id|+1": 0, //生成id，自增1
      custName: "@cname", //客户名字
      roomNo: /^[1-5][0]{1}[0-9]$/, //房号
      tel: /^1(5|3|7|8)[0-9]{9}$/, //随机电话号
      sex: "@pick(['男', '女'])",
      times: () =>
        randomDateTime("2024-01-01", "2024-12-31", "00:00:00", "24:00:00"),
      "price|30-500": 30, //随机生成商品价格 在30-1000之间
    },
  ],
})

//请求数据
Mock.mock("hotel/order/orderAll/", "post", (options) => {
  //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
  const { page, pageSize } = JSON.parse(options.body)
  const start = page * pageSize - pageSize
  const end = start + pageSize
  const total = data.orders.length
  const slicedOrders = data.orders.slice(start, end)
  return {
    orders: slicedOrders,
    total: total,
  }
})

//修改数据
Mock.mock("hotel/order/update/", "post", (config) => {
  const { id, roomNo, custName, price, times } = JSON.parse(config.body)
  // 获取需要修改的数据id
  const targetBookIndex = data.orders.findIndex((item) => item.id === id)
  if (targetBookIndex !== -1) {
    // 找到对应的书籍
    const targetBook = data.orders[targetBookIndex]
    targetBook.roomNo = roomNo ? (targetBook.roomNo = roomNo) : roomNo
    targetBook.custName = custName
    targetBook.price = price
    targetBook.times = times
    console.log("修改的数据内容：", targetBook)
    return {
      msg: "数据修改成功",
      orders: targetBook,
    }
  } else {
    return {
      msg: "修改信息错误",
    }
  }
})

//删除
Mock.mock("hotel/order/delete/", "post", (options) => {
  const { ids } = JSON.parse(options.body); 
  const deletedIds = new Set(ids); // 使用 Set 以便更快的查找

  // 过滤掉需要删除的订单
  data.orders = data.orders.filter((order) => !deletedIds.has(order.id));

  return {
    success: true,
  };
});
