# Day4 Evidence - 发布表单与数据新增

## 1. 今日完成内容

请简要说明今天完成了哪些发布表单、表单校验和数据提交工作。
创建表单：
二手交易 失物招领 拼单搭子 跑腿委托
通用字段：title、location、description
动态渲染各类型专属字段：二手交易（分类/价格/成色）、失物招领（类型/物品名/发生时间）、拼单搭子（类型/目标人数/截止时间）、跑腿委托（任务类型/酬劳/取件/送达/截止时间）
通用表单组件（标题+必填星号+插槽+错误提示）
表单校验：
所有需要填写的选项都不能为空。errors 对象存储每个字段的红色错误提示，校验失败阻止提交，通过后才能发请求
数据提交：
4个API文件补充 createTrade / createLostFound / createGroupBuy / createErrand POST函数
handleSubmit() 提交逻辑：校验通过 → 开启loading → 调用对应POST接口 → 成功后alert提示+重置表单+跳转对应列表页 → 失败捕获异常提示
@submit.prevent 阻止页面默认刷新， submitting 状态禁用按钮防重复提交
切换发布类型时 watch 自动重置表单，避免残留旧数据

## 2. 发布类型与字段设计

| 发布类型 | 对应数据集合 | 关键字段 | 设计理由 |
|---|---|---|---|
| 二手交易 | trades | title、category、price、condition、location、description | 需要展示商品基本信息和交易条件 |
| 失物招领 | lostFounds | title、type、itemName、location、eventTime、description | 需要区分寻物和招领，并描述物品信息 |
| 拼单搭子 | groupBuys | title、type、targetCount、deadline、location、description | 需要说明人数目标和截止时间 |
| 跑腿委托 | errands | title、taskType、reward、from、to、deadline、description | 需要说明任务内容、地点和酬劳 |

## 3. 表单校验规则

请说明哪些字段设置了校验规则。
标题不能为空；
地点不能为空；
描述不能为空；
二手交易分类不能为空；
二手交易价格必须大于0；
二手交易成色不能为空；
失物招领类型不能为空；
失物招领物品名称不能为空；
失物招领发生时间不能为空；
拼单搭子类型不能为空；
拼单搭子目标人数不能少于2；
拼单搭子截止时间不能为空；
跑腿委托任务类型不能为空；
跑腿委托酬劳不能为负数；
跑腿委托取件地址不能为空；
跑腿委托送达地址不能为空；
跑腿委托截止时间不能为空。

## 4. AI 协作记录

请说明：
- 使用了什么 AI 工具；trea和豆包
- 输入了什么核心提示词；
将任务要求发给豆包总结提示词再发给trea，trea根据总结提示词生成代码
以下是豆包的总结提示词：
你现在需要帮我完成Vue3 + Vite + TypeScript + Vue Router + Axios + JSON Server 校园轻集市项目 Day4：发布表单与数据新增全部代码开发，严格按照我提供的实训手册需求实现，要求如下：

## 项目现有基础
1. 项目已有 db.json，包含4个数据集：trades（二手交易）、lostFounds（失物招领）、groupBuys（拼单搭子）、errands（跑腿委托）
2. 已封装好Axios请求实例 http.ts，已有四个业务API文件：trade.ts、lostFound.ts、groupBuy.ts、errand.ts（仅已有GET列表接口，需要你补充POST新增接口）
3. 已有列表页面：TradeView、LostFoundView、GroupBuyView、ErrandView，路由已配置完成
4. 运行命令：npm run mock 启动JSON Server，npm run dev启动前端

## 整体开发任务（按顺序实现）
### Task1 补充四类业务POST新增API
分别修改 src/api/trade.ts、src/api/lostFound.ts、src/api/groupBuy.ts、src/api/errand.ts
1. 给每个文件定义对应TypeScript接口（TradeItem、LostFoundItem、GroupBuyItem、ErrandItem），字段严格匹配db.json结构
2. 新增 createXXX 函数，使用axios发起POST请求，分别提交对应接口：
- trades 接口：POST /trades
- lostFounds 接口：POST /lostFounds
- groupBuys 接口：POST /groupBuys
- errands 接口：POST /errands
3. id交由JSON Server自动生成，发布人固定写死为“校园用户”

### Task2 封装通用表单项组件 src/components/FormField.vue
1. 使用defineProps定义props：label(标题)、required(是否必填布尔)、error(错误提示文本)
2. 组件结构：标题+必填星号占位、默认插槽放输入框、底部错误提示文案
3. 简单内部样式，统一表单排版、错误文字红色样式

### Task3 创建发布页面 src/views/PublishView.vue 基础结构
1. 页面路由为 /publish，引入FormField组件、四个新增API函数
2. 顶部下拉选择发布类型：二手交易/失物招领/拼单搭子/跑腿委托，绑定变量publishType默认trades
3. 表单绑定响应式form对象，包含四类业务通用字段：title、location、description
4. 表单提交绑定 @submit.prevent="handleSubmit"，防止默认刷新
5. 提交按钮增加loading状态 submitting，提交中禁用按钮

### Task4 根据发布类型动态渲染专属字段（v-if切换）
在通用字段下方，通过publishType判断显示对应独有表单项：
1. 二手交易(trades)：分类category、价格price、成色condition
2. 失物招领(lostFounds)：招领类型type、物品名称itemName、发生时间eventTime
3. 拼单搭子(groupBuys)：拼单类型groupType、目标人数targetCount、截止时间deadline
4. 跑腿委托(errands)：任务类型taskType、酬劳reward、取件from、送达to、截止时间deadline

### Task5 配置表单响应式数据&错误对象
1. 使用ref定义publishType、submitting
2. reactive初始化form表单全部字段，兼容四类业务所有字段
3. reactive创建errors对象，存放每个字段校验错误文案

### Task6 完整表单校验函数 validateForm()
1. 先清空所有错误clearErrors()
2. 通用校验：标题、地点、描述不能为空
3. 分类型针对性校验：
- 二手交易：分类必填、价格必须大于0、成色必选
- 失物招领：招领类型、物品名、发生时间必填
- 拼单搭子：拼单类型必填、目标人数≥2、截止时间必填
- 跑腿委托：任务类型必填、酬劳不能负数、取件送达地址、截止时间必填
4. 全部校验通过返回true，否则false并回填对应字段错误提示

### Task7 编写提交逻辑 handleSubmit
1. 先执行表单校验，校验失败直接终止
2. 开启提交loading
3. 根据publishType分支调用对应create新增API，组装提交数据
4. 请求成功：弹出成功提示、重置表单、跳转到对应列表页面
- 二手交易 → /trade
- 失物招领 → /lost-found
- 拼单搭子 → /group-buy
- 跑腿委托 → /errand
5. 请求失败：捕获异常，弹窗提示发布失败，关闭loading

### Task8 表单重置函数 resetForm
清空form所有字段、清空errors错误对象；可选监听publishType切换时自动重置表单，避免类型切换残留旧数据

### Task9 页面基础CSS样式
给发布页面做排版，页面边距、表单间距、输入框内边距、按钮配色区分主副按钮

## 硬性约束&避坑要求
1. 禁止写真实登录、图片上传、复杂权限控制逻辑
2. POST接口路径必须和db.json集合名完全一致，不能拼写错误
3. 表单必须使用 @submit.prevent 阻止页面默认刷新
4. 字段必须和已有列表页面、db.json字段完全对齐，避免新增后列表不展示
5. 代码结构整洁，TS类型严谨，注释简洁易懂
6. 不要过度封装复杂动态表单，采用简单v-if区分不同业务字段即可，符合初学者实训要求

## 最后请你一次性输出全部修改后的完整代码
- AI 生成了哪些内容；
豆包生成以上提示词，trea生成代码
- AI 生成内容中有哪些不合理之处。
id类型定义为number ：db.json原始数据id是字符串，JSON Server新增数据生成随机字符串id（如 "E0pzEVb4nIg" ），但interface写的是 number ，导致发布新数据后列表渲染失败，页面空白

时间格式不统一 ： datetime-local 输入框返回 2026-06-30T12:00 （带T），但db.json中格式是 2026-06-30 12:00 （带空格），提交后数据格式不一致

无意义的三目运算 ：修复时写了 typeof id === 'number' ? id : id ，两个分支结果完全一样，没有实际作用

## 5. 人工调整内容

请说明你自己做了哪些修改。
例如：
id类型定义为number ：db.json原始数据id是字符串，JSON Server新增数据生成随机字符串id（如 "E0pzEVb4nIg" ），但interface写的是 number ，导致发布新数据后列表渲染失败，页面空白
解决 ：将4个API文件的interface中 id: number 改为 id: string | number ，同时修复详情页 Number() 强转问题，改为 route.params.id as string 直接传递

时间格式不统一 ： datetime-local 输入框返回 2026-06-30T12:00 （带T），但db.json中格式是 2026-06-30 12:00 （带空格），提交后数据格式不一致
解决 ：在提交前，将 datetime-local 格式转换为 db.json 中的格式，如：2026-06-30 12:00

无意义的三目运算 ：修复时写了 typeof id === 'number' ? id : id ，两个分支结果完全一样，没有实际作用

## 6. 测试记录

请记录至少一次真实测试。
所有发布类型都测试了，分别上传了：
二手交易类型：发布了一条二手交易信息；
失物招领类型：发布了一条失物招领信息；
拼单搭子类型：发布了一条拼单搭子信息；
跑腿委托类型：发布了一条跑腿委托信息；
发布成功后跳转到对应列表页面，在对应列表页面看到了新增数据
在 db.json 中确认新增记录。

## 7. 遇到的问题与解决方法

请记录至少一个真实问题，例如：
通过PublishView发布二手交易，弹出"发布成功"提示后跳转到 /trade ，但列表页完全空白，控制台无报错
原因 ：db.json中原始数据id是字符串（如 "1" ），JSON Server新增数据时自动生成随机字符串id（如 "E0pzEVb4nIg" ），但TypeScript interface中id定义为 number 类型，新增的数据id类型与interface不匹配，导致v-for渲染失败
解决 ：将4个API文件的interface中 id: number 改为 id: string | number ，同时修复详情页 Number() 强转问题，改为 route.params.id as string 直接传递

先填了二手交易的分类和价格，切换到失物招领后，再切回二手交易，之前填的分类和价格还在
解决 ：添加 watch(publishType, () => { resetForm() }) ，切换类型时自动重置所有表单字段和错误提示

## 8. 今日反思

请用一小段话说明：
发布表单、表单校验和数据新增对完整 Web 应用有什么作用？
发布表单是用户向系统输入数据的入口，没有它Web应用只能展示只读内容，无法产生新数据；表单校验是数据质量的第一道防线，在前端拦截空值、格式错误、不合理数值，避免脏数据写入后端，减少无效请求和服务器压力；数据新增（POST请求）打通了前端到后端的写入链路，让用户发布的内容真正持久化存储，其他用户也能看到。三者配合构成了"输入→校验→存储"的完整数据闭环，是Web应用从只读走向可交互的关键一步。