# Day3 Evidence - Mock 数据建模与列表渲染

## 1. 今日完成内容

请简要说明今天完成了哪些 Mock 数据、接口封装和页面渲染工作。
创建了db.json文件，用于存储所有数据,里面包含四组模拟数据：trades、lostFounds、groupBuys、errands。每一组模拟数据都创建了五条具体类型的数据。
接口封装：
src/api/http.ts - Axios实例，baseURL 指向 localhost:3001
src/api/trade.ts - getTrades() + getTradeById(id)
src/api/lostFound.ts - getLostFounds() + getLostFoundById(id)
src/api/groupBuy.ts - getGroupBuys() + getGroupBuyById(id)
src/api/errand.ts - getErrands() + getErrandById(id)
页面渲染工作：
4个列表页 ：TradeView、LostFoundView、GroupBuyView、ErrandView — onMounted 调用接口获取数据，v-for 渲染卡片列表，空数据展示 EmptyState
4个详情页 ：TradeDetail、LostFoundDetail、GroupBuyDetail、ErrandDetail — 通过 route.params.id 查询单条数据展示详情
5个公共组件 ：TradeCard、LostFoundCard、GroupBuyCard、ErrandCard（SVG图标+点击跳转详情）、EmptyState（图标可传props+空状态提示）
功能增强 ：搜索框双向绑定筛选、分类标签点击过滤、加载更多分页、卡片点击跳转详情

## 2. Mock 数据结构说明

| 数据集合 | 对应业务 | 主要字段 | 页面用途 |
|---|---|---|---|
| trades | 二手交易 | title、price、category、location、status | 展示二手商品列表 |
| lostFounds | 失物招领 | title、type、itemName、location、eventTime、status | 展示失物和招领信息 |
| groupBuys | 拼单搭子 | title、type、targetCount、currentCount、deadline | 展示拼单和搭子信息 |
| errands | 跑腿委托 | title、taskType、reward、from、to、deadline | 展示跑腿任务列表 |

## 3. 我的设计

请说明自己为什么这样设计数据字段。
例如：
- 为什么二手交易需要 price 和 condition；
  - 二手交易需要 price 字段来展示商品的价格，condition 字段来展示商品的状况。
- 为什么失物招领需要 type 字段；
  - 失物招领需要 type 字段来区分失物和招领。
- 为什么拼单搭子需要 targetCount 和 currentCount；
  - 拼单搭子需要 targetCount 字段来展示目标人数，currentCount 字段来展示当前人数。
- 为什么跑腿委托需要 from、to 和 reward；
  - 跑腿委托需要 from、to 字段来展示跑腿任务的起点和终点，reward 字段来展示跑腿任务的奖励金额。

- 为什么跑腿委托需要 deadline 和 taskType 字段；
  - 跑腿委托需要 deadline 字段来展示跑腿任务的截止时间。
  - 跑腿委托需要 taskType 字段来展示跑腿任务的类型，例如：送快递、送物品等。
- 为什么拼单搭子需要 deadline 和 type 字段；
  - 拼单搭子需要 deadline 字段来展示拼单和搭子的截止时间。
  - 拼单搭子需要 type 字段来区分拼单和搭子。
- 为什么失物招领需要 eventTime 和 status 字段；
  - 失物招领需要 eventTime 字段来展示失物和招领的时间。
  - 失物招领需要 status 字段来展示失物和招领的状态，例如：已招、未招等。
- 为什么二手交易需要 publishTime 和 status 字段；
  - 二手交易需要 publishTime 字段来展示商品的发布时间时间。
  - 二手交易需要 status 字段来展示商品的状态，例如：已发布、未发布等。
  


## 4. AI 设计

请说明 AI 工具生成了哪些内容。
例如：
- AI 是否帮你生成了 db.json；
- AI 是否帮你生成了 API 模块；
- AI 是否帮你生成了页面列表代码；
- AI 生成内容中有哪些不合理之处。

AI帮我生成了db.json文件，里面包含四组模拟数据：trades、lostFounds、groupBuys、errands。每一组模拟数据都创建了五条具体类型的数据。API模块中，每个接口都对应一个数据集合，用于获取和查询数据。页面列表代码中，每个列表页都对应一个数据集合，用于展示数据。
不合理之处：
最初Card组件用了emoji图标，不够美观，后续替换成了SVG
最初点击卡片跳转详情但没建详情页和路由，导致空白页，需要补全
db.json中image字段全部为空字符串，没有真实图片，页面图片区域显示空白占位（还未插入照片）
加载更多是前端分页截取，不是真正的后端分页请求，数据量大时不够高效

## 5. 最终调整

请说明你自己做了哪些修改。
例如：
- 删除了哪些复杂字段；
- 修改了哪些不贴合校园场景的数据；
- 调整了哪些字段名称；
- 补充了哪些页面展示需要的字段。

做了以下修改：
1.跑腿委托的取件/送达地点字段，AI初始用了 pickupLocation / deliveryLocation ，我调整为更简洁的 from / to ，与路由方向语义一致
2.失物招领的时间字段，AI初始用了 time ，我调整为更明确的 eventTime ，避免与发布时间混淆- 跑腿委托补充了 description 字段，初始缺少任务描述，详情页无法展示补充说明
做了以下补充：
跑腿委托补充了 description 字段，初始缺少任务描述，详情页无法展示补充说明
失物招领补充了 description 字段，初始只有标题没有详细描述
EmptyState组件补充了 icon 可传props，初始只支持文字，增加灵活性

## 6. 遇到的问题与解决方法

问题：列表页卡片点击后但页面完全空白，控制台无报错
原因：Card组件中写了 router.push('/trade/${id}') 跳转逻辑，但路由配置中只有 /trade 列表路由，没有 /trade/:id 详情路由，也没有对应的详情页组件，Vue Router匹配不到任何路由就渲染空白
解决 ：在 src/router/index.ts 中补充4条详情路由（ /trade/:id 、 /lost-found/:id 、 /group-buy/:id 、 /errand/:id ），创建4个详情页组件（TradeDetail、LostFoundDetail、GroupBuyDetail、ErrandDetail），并在API模块中补充4个单条查询函数（ getTradeById 等），通过 route.params.id 从json-server获取单条数据渲染

## 7. 今日反思

请用一小段话说明：
Mock 数据建模、接口请求和列表渲染对后续项目开发有什么作用？
Mock数据建模让前端开发不再等待后端，可以独立推进页面开发；接口请求封装统一了数据获取方式，后续接真实后端只需改baseURL，业务代码不用动；列表渲染建立了"接口数据→页面展示"的标准模式，后续新增任何业务页面都按这个套路走：定义interface → 封API → onMounted请求 → v-for渲染 → 空状态兜底。三者构成了前后端分离开发的数据链路基础。

今天最大的收获是理解了"数据驱动视图"的开发模式：页面不再写死内容，而是通过Axios请求json-server接口获取数据，用v-for动态渲染列表。过程中踩了详情页空白的坑，让我意识到跳转逻辑和路由配置必须配套存在，不能只写一半。另外体会到interface类型定义的重要性——字段名在db.json、API、组件中必须严格一致，一旦拼写不一致就会导致页面显示为空，这种错误还不好排查。以后开发要先确保数据链路通畅（接口能返回数据），再处理页面渲染，不要一上来就写样式。
Mock数据建模 ：用 db.json + json-server 模拟后端接口，前端不依赖真实后端即可独立开发
Axios封装 ：统一配置baseURL和超时，所有请求走同一个实例，方便后续维护
API模块拆分 ：按业务拆成独立ts文件，interface类型定义确保字段名在db.json、API、组件三层一致
数据驱动渲染 ：onMounted调接口 → ref存数据 → v-for循环渲染，页面内容由接口数据决定
空状态处理 ：数据为空时展示EmptyState组件，而非空白页面
路由与跳转配套 ：写了跳转逻辑就必须配好路由和页面组件，否则会空白页
字段名一致 ：在db.json、API、组件中保持字段名一致，避免拼写错误导致页面显示为空