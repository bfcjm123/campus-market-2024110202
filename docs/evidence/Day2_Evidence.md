1.今天新增了哪些页面
今天新增了有 ListView.vue列表页 DetailView.vue详情页 PublishView.vue发布页 MessageView.vue消息页 ProfileView.vue个人中心 BoardView.vue看板页
2.路由如何设计
1. 在 `src/router/index.ts` 中配置7条对应路由，路径与页面一一匹配，采用路由懒加载写法，按页面功能分类组织；
2. 路由清单：
 `/home` 映射首页 HomeView.vue
 `/list` 映射列表页 ListView.vue
 `/detail` 映射详情页 DetailView.vue
 `/publish` 映射发布页 PublishView.vue
 `/message` 映射消息页 MessageView.vue
 `/profile` 映射个人中心 ProfileView.vue
 `/board` 映射看板页 BoardView.vue
3. 额外配置根路径 `/` 重定向至 `/home`，访问项目根地址自动跳转首页；
4. 路由模式采用 `createWebHistory` 历史模式。
3.遇到的问题
1. 配置路由时，发现路由懒加载写法在 `src/router/index.ts` 中的写法与 `src/views` 文件夹下的文件名不一致，导致路由配置错误。
   解决方法：在 `src/router/index.ts` 中，将路由配置按页面功能分类组织，每个分类对应一个路由模块。
4.AI协作记录
# Day2 Vue3 多页面骨架+路由导航 完整分步操作教程
项目根目录：`campus-market-seed`，整体分**任务1创建页面 → 任务2配置路由 → 任务3全局导航 → 进阶选做 → Git提交 → 文档填写**六大部分，一步步照着做即可完成验收。

## 前置说明
已有基础：Vue3 + Vite + VueRouter 初始化项目，`src/views` 已有 `HomeView.vue`，路由文件 `src/router/index.ts` 已存在，只做扩展，不用初始化路由。

---

## 任务1：在 src/views 创建7个页面骨架
打开 `src/views` 文件夹，新建下面 **6个vue文件**（加上原有HomeView，凑齐7个页面）
### 1. ListView.vue（列表页）
路径：`src/views/ListView.vue`
```vue
<template>
  <div>
    <h1>列表页</h1>
  </div>
</template>
```

### 2. DetailView.vue（详情页）
路径：`src/views/DetailView.vue`
```vue
<template>
  <div>
    <h1>详情页</h1>
  </div>
</template>
```

### 3. PublishView.vue（发布页）
路径：`src/views/PublishView.vue`
```vue
<template>
  <div>
    <h1>发布页</h1>
  </div>
</template>
```

### 4. MessageView.vue（消息页）
路径：`src/views/MessageView.vue`
```vue
<template>
  <div>
    <h1>消息页</h1>
  </div>
</template>
```

### 5. ProfileView.vue（个人中心）
路径：`src/views/ProfileView.vue`
```vue
<template>
  <div>
    <h1>个人中心</h1>
  </div>
</template>
```

### 6. BoardView.vue（看板统计页）
路径：`src/views/BoardView.vue`
```vue
<template>
  <div>
    <h1>看板页</h1>
  </div>
</template>
```

✅ 此时 `src/views` 内文件清单（共7个）
1. HomeView.vue（原有）
2. ListView.vue
3. DetailView.vue
4. PublishView.vue
5. MessageView.vue
6. ProfileView.vue
7. BoardView.vue

---

## 任务2：修改 src/router/index.ts 配置完整路由
打开路由文件 `src/router/index.ts`，修改路由数组，配置7条对应路由路径，**懒加载写法**和示例保持一致。

### 完整参考代码
```typescript
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/list',
      name: 'List',
      component: () => import('../views/ListView.vue')
    },
    {
      path: '/detail',
      name: 'Detail',
      component: () => import('../views/DetailView.vue')
    },
    {
      path: '/publish',
      name: 'Publish',
      component: () => import('../views/PublishView.vue')
    },
    {
      path: '/message',
      name: 'Message',
      component: () => import('../views/MessageView.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/board',
      name: 'Board',
      component: () => import('../views/BoardView.vue')
    },
    // 可选：默认跳转首页，访问根路径自动进/home
    {
      path: '/',
      redirect: '/home'
    }
  ]
})

export default router
```

### 路由核对清单（必须全部存在）
| 访问路径 | 对应页面 |
| ---- | ---- |
| `/home` | HomeView.vue |
| `/list` | ListView.vue |
| `/detail` | DetailView.vue |
| `/publish` | PublishView.vue |
| `/message` | MessageView.vue |
| `/profile` | ProfileView.vue |
| `/board` | BoardView.vue |

---

## 任务3：修改 App.vue 搭建全局导航栏
打开根组件 `src/App.vue`，使用 `<router-link>` 做页面跳转，`<router-view>` 承载路由页面内容。

### 最简原生HTML版（不用Element Plus，满足基础要求）
```vue
<template>
  <!-- 顶部导航栏 -->
  <nav style="padding: 16px; background: #f5f5f5; gap: 20px; display: flex;">
    <router-link to="/home">首页</router-link>
    <router-link to="/list">列表页</router-link>
    <router-link to="/publish">发布页</router-link>
    <router-link to="/message">消息页</router-link>
    <router-link to="/profile">个人中心</router-link>
    <router-link to="/board">看板页</router-link>
  </nav>

  <!-- 路由页面渲染出口 -->
  <router-view />
</template>

<style scoped>
nav a {
  text-decoration: none;
  color: #333;
  font-size: 16px;
}
nav a.router-link-active {
  color: #409eff;
  font-weight: bold;
}
</style>
```

### 可选进阶：Element Plus 导航栏（如果项目已装Element Plus）
如果项目提前安装了 `element-plus`，可以替换成美化版菜单：
```vue
<template>
  <el-menu mode="horizontal" router>
    <el-menu-item index="/home">首页</el-menu-item>
    <el-menu-item index="/list">列表页</el-menu-item>
    <el-menu-item index="/publish">发布页</el-menu-item>
    <el-menu-item index="/message">消息页</el-menu-item>
    <el-menu-item index="/profile">个人中心</el-menu-item>
    <el-menu-item index="/board">看板页</el-menu-item>
  </el-menu>
  <router-view />
</template>
```

### 验证方式
启动项目 `npm run dev`，点击导航栏每个按钮，能切换对应页面文字，代表路由+导航基础任务完成。

---

## 进阶任务（选做，加分项）
### 进阶1：看板页静态统计内容
修改 `BoardView.vue`，写一点静态统计文本示例：
```vue
<template>
  <div style="padding:20px">
    <h1>看板数据统计页</h1>
    <p>总商品数量：128</p>
    <p>今日发布：23</p>
    <p>消息总数：456</p>
    <p>访问UV：892</p>
  </div>
</template>
```

### 进阶2：列表页 → 详情页 带ID参数跳转
1. 修改 `ListView.vue`，增加跳转按钮，携带id参数
```vue
<template>
  <div>
    <h1>列表页</h1>
    <!-- 跳转带参数id=1001 -->
    <router-link to="/detail?id=1001">查看1号商品详情</router-link>
  </div>
</template>
```
2. 修改 `DetailView.vue` 接收参数
```vue
<template>
  <div>
    <h1>详情页</h1>
    <p>当前商品ID：{{ $route.query.id }}</p>
  </div>
</template>
```
点击列表页链接，详情页能展示对应ID，参数跳转完成。

### 进阶3：Element Plus UI优化
若未安装，终端执行安装命令：
```bash
npm install element-plus
```
在 `src/main.ts` 全局引入：
```typescript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
```
之后就可以用上面Element Plus导航菜单写法美化页面。

---

## 提交Git（提交要求）
打开终端，进入项目根目录 `campus-market-seed`，依次执行命令提交代码：
```bash
git add .
git commit -m "day2: add multi-page layout and router navigation"
# 如需推送到远程仓库，补充执行
# git push
```

---

## 填写文档：Day2_Evidence.md
打开 `docs/evidence/Day2_Evidence.md`，填写实验说明模板，示例内容：
```markdown
# Day2 实验佐证文档
## 一、新增页面说明
本次在 src/views 新增6个页面，连同原有HomeView一共7个业务页面：
1. ListView.vue 列表页
2. DetailView.vue 详情页
3. PublishView.vue 发布页
4. MessageView.vue 消息页
5. ProfileView.vue 个人中心页
6. BoardView.vue 看板统计页

## 二、路由设计说明
在 src/router/index.ts 配置7条懒加载路由，配置根路径重定向至/home，路由路径与页面文件一一对应，支持页面地址直接访问。

## 三、导航实现说明
在App.vue使用router-link实现顶部全局导航栏，router-view作为页面渲染容器，点击导航可完成页面快速跳转。

## 四、遇到问题与解决（没有就写无）
无

## 五、进阶功能完成情况
1. 看板页：已添加静态统计文本
2. 路由传参：列表页携带id跳转详情页，可正常接收参数
3. UI优化：已引入Element Plus重构导航菜单
```

---

## 验收自检（老师检测脚本核对点）
1. ✅ `views` 文件夹存在7个对应vue页面
2. ✅ `router/index.ts` 配置全部7条路由，路径匹配
3. ✅ 浏览器访问 `/home /list /detail /publish /message /profile /board` 均可正常打开
4. ✅ App.vue 存在导航 + router-view 结构
5. ✅ 完成一次规范Git提交
6. ✅ `Day2_Evidence.md` 文档填写完整
