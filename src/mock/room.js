import { ElMessage } from "element-plus"
import Mock from "mockjs"
// 自定义函数，用于随机生成1到3个不重复的设施

let data = Mock.mock({
  code: 200,
  "rooms|25": [
    //生成18条数据 数组
    {
      "id|+1": 0, //id，自增1
      roomNo: /^[1-5][0]{1}[0-9]$/, //房号
      kind: "@pick(['三室公寓', '双人间', '单人间'])",
      "price|30-500": 30, //价格 在30-500之间
      facility: "@pick('空调WiFi')",
    },
  ],
})

//请求房间信息数据
Mock.mock("hotel/room/roomAll/", "post", (options) => {
  //三个参数。第一个：路径，第二个：请求方式post/get，第三个：回调，返回值
  const { page, pageSize } = JSON.parse(options.body)
  const start = page * pageSize - pageSize
  const end = start + pageSize
  const total = data.rooms.length
  const slicedRooms = data.rooms.slice(start, end)
  return {
    rooms: slicedRooms,
    total: total,
  }
})

//修改数据
Mock.mock("hotel/room/update/", "post", (config) => {
  const { id, roomNo, kind, price, facility } = JSON.parse(config.body)
  // 获取需要修改的数据id
  console.log(id)
  const targetIndex = data.rooms.findIndex((item) => item.id === id)
  if (targetIndex !== -1) {
    // 找到对应的房号
    const targetRoom = data.rooms[targetIndex]
    targetRoom.roomNo = roomNo ? (targetRoom.roomNo = roomNo) : roomNo
    targetRoom.kind = kind
    targetRoom.price = price
    targetRoom.facility = facility
    console.log("修改的数据内容：", targetRoom)
    return {
      msg: "数据修改成功",
      rooms: targetRoom,
    }
  } else {
    return {
      msg: "修改信息错误",
    }
  }
})

//删除数据
Mock.mock("hotel/room/delete/", "post", (options) => {
  const { id } = JSON.parse(options.body)
  const index = data.rooms.findIndex((room) => room.id === id)
  if (index !== -1) {
    data.rooms.splice(index, 1)
  }
  return {
    success: true,
  }
})



// 新增
Mock.mock("hotel/room/addRoom", "post", (options) => {
  try {
    // 解析请求参数
    const newRoom = JSON.parse(options.body)

    // 检查必要字段是否存在且不为空
    const requiredFields = ["roomNo", "kind", "price", "facility"]
    for (const field of requiredFields) {
      if (!newRoom[field]) {
        ElMessage.error("新增项不能为空")
        throw new Error(`缺少必填字段：${field}`)
      }
    }

    // 添加房间ID
    newRoom.id = data.rooms.length + 1
    // 将新数据添加到 rooms 数组中
    data.rooms.push(newRoom)
    return {
      data: newRoom,
    }
  } catch (error) {
    console.error("新增房间时出现错误:", error)
    return {
      error: error.message || "新增房间时发生错误，请检查输入数据",
    }
  }
})
