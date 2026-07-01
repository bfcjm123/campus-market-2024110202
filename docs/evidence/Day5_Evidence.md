# Day5 Evidence - 状态管理与用户中心

## 1. 今日完成内容

请简要说明今天完成了哪些 Pinia Store、用户中心和收藏功能。
favoriteStore 收藏状态管理（四个列表页的收藏按钮/个人中心的收藏列表）
userStore 用户状态管理（当前用户信息、登录状态）

用户中心展示用户信息、我的收藏、我的发布等，稍微细化了用户的个人信息，包括昵称、学院专业班级、签名、个人介绍、联系信息等。

收藏功能发布功能：
收藏功能：用户可以在二手交易页面收藏商品，收藏后会在个人中心显示。
发布功能：用户可以在发布页面发布商品，商品发布后会在列表页显示也会在个人信息页展示。

## 2. Store 设计说明

| Store 文件 | 管理内容 | 主要状态 | 主要方法 |
|---|---|---|---|
| src/stores/user.ts | 当前用户信息 | isLoggedIn、currentUser | updateProfile、login、logout |
| src/stores/favorite.ts | 收藏状态 | favorites | addFavorite、removeFavorite、toggleFavorite、isFavorite |

## 3. 状态边界说明

请说明哪些数据放入了 Store，哪些数据没有放入 Store，以及原因。
放入：
个人信息页展示的用户信息，包括昵称、学院专业班级介绍、联系信息介绍、联系信息等。这些信息都需要从 userStore 中获取。放入store避免重复请求和不一致
favorites数组（type、id、title、description、location）、favoriteCount（收藏数量）4个列表页的收藏按钮需要读取和修改收藏状态，个人中心需要遍历收藏列表，收藏状态在页面间必须实时同步，放入Store保证切换页面后收藏状态不丢失

未放入：
表单校验错误，因为它只属于发布页面，没有其他页面需要读取校验错误信息，属于页面自用状态
表单输入内容，因为它只属于发布页面，切换类型时还会重置，没有跨页面共享需求
接口请求的列表数据，每个列表页自己请求自己渲染，其他页面不需要读取，且数据量大不适合长期存Store，个人中心的"我的发布"是按publisher筛选后的子集，属于页面自用计算，不需要放入Store
submitting加载状态 ：只在提交瞬间使用，属于发布页面的临时UI状态
searchKeyword搜索关键词 ：只属于对应列表页，其他页面不需要
displayCount加载更多计数 ：只属于对应列表页的分页展示逻辑


## 4. 页面使用记录

请说明 Store 在哪些页面或组件中被使用。

userStore 使用情况
AppNav.vue：导航栏右侧显示当前用户姓名（`userStore.user.name`），点击跳转个人中心
PublishView.vue：提交表单时从 `userStore.user.name` 获取发布人名称，不再写死"校园用户"；失物招领的contact字段同样取自userStore
UserCenterView.vue：个人中心读取用户完整信息展示姓名、昵称、学院、专业、班级、联系方式等；"我的发布"按 `userStore.user.name` 筛选匹配的发布数据

favoriteStore 使用情况
TradeCard.vue：底部收藏按钮调用 `favoriteStore.toggleFavorite` 切换收藏状态，按钮文字根据 `favoriteStore.isFavorite` 判断显示"收藏"或"已收藏"
LostFoundCard.vue：同上，type为'lostFound'
GroupBuyCard.vue：同上，type为'groupBuy'
ErrandCard.vue：同上，type为'errand'
UserCenterView.vue：遍历 `favoriteStore.favorites` 渲染收藏列表，显示类型标签+标题+描述；每条带"取消收藏"按钮调用 `favoriteStore.removeFavorite`；统计栏显示 `favoriteStore.favoriteCount` 收藏总数

## 5. AI 协作记录

请说明：
- 使用了什么 AI 工具；
豆包和trea，使用豆包生成提示词，trea生成代码。
- 输入了什么核心提示词；
提示词：你现在需要帮我完成 Vue3 + Vite + TypeScript + Pinia 校园集市项目 Day5 全部实训任务，严格按照我给的实验手册规则开发，禁止额外做登录鉴权、JWT、后端接口认证、持久化存储相关逻辑，只做前端模拟状态。

项目技术栈
Vue3 + Vite + TypeScript + Vue Router + Pinia + Axios + JSON Server
已完成前置：Day1~Day4，项目可正常启动，npm run mock 启动json-server，npm run dev启动前端，db.json包含二手交易、失物招领、拼单、跑腿四类数据，发布页面可新增数据，列表页可渲染数据。

整体任务要求（必须逐条实现）
Task1：确认Pinia已挂载
检查 src/main.ts，确认已导入 createPinia 并 app.use(createPinia())；如果未安装Pinia，给出安装命令 npm install pinia。
Task2：创建用户状态 Store
新建 src/stores/user.ts，使用 defineStore 定义 user 仓库：
1. 定义 CurrentUser 类型：id、name、college、grade、avatar、bio、isLoggedIn
2. state 预设模拟校园测试用户数据（学号、姓名、计算机学院、2023级、个性简介）
3. getters：写 displayName（拼接姓名+年级学院）
4. actions：updateProfile（修改用户信息）、login()、logout()
5. 仅前端模拟用户，不对接登录接口、不做真实登录校验
Task3：导航栏读取并展示用户信息
修改全局导航组件 AppHeader.vue（或 AppNav.vue）：
1. 导入 useUserStore 并实例化仓库
2. 模板中渲染 userStore.displayName，实现顶部展示当前登录用户名
3. 不能解构丢失响应式，模板直接使用 store 实例访问属性
Task4：发布页面绑定当前发布人
修改 PublishView.vue 发布页面：
1. 导入 userStore
2. 提交表单新增数据时，publisher 字段不再写死固定文字，从 userStore.displayName 获取当前用户名作为发布人
3. 提交到json-server后，列表数据publisher自动为当前模拟用户
Task5：创建收藏状态 Store
新建 src/stores/favorite.ts，defineStore 定义 favorite 仓库：
1. 定义 FavoriteItem 类型：type（trade/lostFound/groupBuy/errand）、id、title、description、location
2. state：favorites 数组存放收藏列表
3. getters：favoriteCount 获取收藏总数
4. actions：
   - isFavorite(type, id)：判断某条数据是否已收藏
   - addFavorite(item)：新增收藏
   - removeFavorite(type, id)：取消收藏
   - toggleFavorite(item)：一键切换收藏/取消收藏
5. 收藏仅内存临时存储，刷新页面丢失，不用localStorage持久化
Task6：列表页 ItemCard 实现收藏按钮交互
以 TradeView.vue + ItemCard.vue 为例改造：
1. ItemCard 内部导入 useFavoriteStore
2. 卡片底部增加收藏按钮
3. 点击按钮调用 favoriteStore.toggleFavorite(当前条目对象)
4. 按钮文字根据 isFavorite 判断切换「收藏/已收藏」
4. 其余三类业务页面（失物、拼单、跑腿）同步加上相同收藏逻辑
Task7：完善个人中心 UserCenterView.vue
页面分三大模块：
1. 用户资料区：读取 userStore 用户信息展示姓名、学院、年级、个人简介
2. 我的收藏区：遍历 favoriteStore.favorites，渲染所有收藏条目，每条带取消收藏按钮
3. 我的发布区：读取json-server对应类型数据，筛选 publisher = 当前用户姓名，展示本人发布的全部内容
页面为空时增加 EmptyState 空状态提示组件
Task8：跨页面状态校验
保证：导航栏、发布页、所有列表页、个人中心都可以正常读取两个Pinia仓库状态，跨页面状态同步生效。
强制约束规则（必须严格遵守，不能擅自扩展）
1. 禁止实现真实注册登录、JWT、路由权限拦截、token、后端登录接口、登录弹窗
2. 收藏仅前端内存状态，不用本地存储持久化，刷新丢失符合要求
3. Store 划分边界清晰：用户状态、收藏状态拆分两个独立仓库，禁止写在同一个store
4. 区分状态边界：
   ✅ 放进Pinia：当前登录用户信息、全局收藏列表（多页面共享）
   ❌ 不放进Pinia：表单输入内容、单页临时变量、接口单次列表数据、表单校验报错（仅页面自用）
5. TypeScript 类型完整，不使用 any 泛滥写法
6. 代码结构严格匹配目录：src/stores/user.ts、src/stores/favorite.ts
7. 禁止过度封装、多余复杂逻辑，贴合实训基础要求

输出要求
1. 按任务顺序，逐个给出完整可直接粘贴的代码文件内容，标明对应文件路径




- AI 生成了哪些内容；
两个 Store 仓库：userStore 和 favoriteStore。
导航栏改造：导航栏显示当前登录用户名,点击用户头像，跳转个人中心页面。
四个卡片组件的收藏按钮：点击后切换收藏状态，更新收藏列表。
个人中心的完善：细化用户信息展示，增加多条用户信息展示（联系方式、签名、个人简介）。
发布页绑定当前发布人：提交表单新增数据时，publisher 字段不再写死固定文字，从 userStore.displayName 获取当前用户名作为发布人。

- AI 生成内容中有哪些不合理之处。
AppHeader直接显示用户信息，最初在标题"校园轻集市"右边显示了"张小明 · 2023级计算机学院"
用户信息字段太少，缺少联系方式、签名、个人简介等。
个人信息页收藏和发布的物品无法直接点击进去查看物品的详细信息。

## 6. 人工调整内容

请说明你自己做了哪些修改。
移除了AppHeader中的用户信息显示，标题旁不再显示用户名，改到导航栏右侧头像按钮展示。点击头像，跳转个人中心页面。
补充了用户字段，从最初6个字段扩展到13个，新增nickname、major、class、phone、qq、email、signature
修正了收藏按钮冒泡问题，4个Card组件的收藏按钮加了 e.stopPropagation() ，防止点击收藏同时跳转详情页。
修正了个人中心可点击跳转问题，个人中心收藏和发布的物品点击后，能够跳转到详情页。

## 7. 测试记录

请记录至少一次真实测试。
点击二手交易第一条收藏按钮，按钮文字从收藏变为已收藏
点击右侧头像进入个人中心后能够看到收藏内容
点击取消收藏后，该内容从个人中心消失，收藏数量也会改变
发布物品后主页能够看到发布的内容的详细信息


## 8. 遇到的问题与解决方法

请记录至少一个真实问题
个人主页收藏和发布的物品点击后无法查看详细信息
解决方法：给收藏和发布的物品添加点击事件，点击后跳转到详情页
1.在 UserCenterView.vue 中导入 useRouter ，创建路由映射表
2.在收藏和发布的物品卡片上添加点击事件，点击后跳转到详情页，传递物品id作为参数
3.给收藏列表和发布列表的每条数据绑定 @click 事件
4.取消收藏按钮加 @click.stop 阻止冒泡，防止点击取消收藏时同时跳转详情页
5.添加 hover 背景色和箭头图标，提示用户可点击查看物品详情

## 9. 今日反思

请用一小段话说明：
Pinia 状态管理对多页面前端应用有什么作用？
状态管理：将应用的状态（如用户信息、收藏列表等）存储在 Pinia 仓库中，确保在不同页面之间能够共享和更新。
状态同步：通过 Pinia 仓库的响应式系统，实现不同页面之间的状态同步，避免数据不一致的问题。
状态持久化：虽然 Pinia 仓库是前端内存状态，刷新页面后会丢失，但可以通过本地存储持久化，实现状态的跨页面保持。

在没有 Pinia 之前，每个页面/组件只能管理自己的 ref 数据，跨页面共享数据只能通过路由传参或逐层 props/emits 传递，非常繁琐。Pinia 将应用中需要多页面共享的状态（如用户信息、收藏列表）集中存储在一个"全局仓库"中，任何页面都可以直接 import 使用，不需要一层层传递。
Pinia 底层基于 Vue3 的响应式系统（ ref / computed ），当某个页面修改了 store 中的数据，所有使用了该数据的页面会自动更新，无需手动刷新或发送事件。
Pinia 的 store 默认存储在内存中，页面刷新后数据会丢失。但 Pinia 支持与浏览器本地存储（ localStorage / sessionStorage ）结合，实现状态持久化——即刷新页面后数据仍然保留。
Pinia 的本质是给多页面应用提供了一个 全局的、响应式的、可共享的数据中心 ，解决了组件间数据传递困难、状态不同步、刷新丢失三个核心问题。