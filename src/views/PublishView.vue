<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import FormField from '@/components/FormField.vue'
import { createTrade } from '@/api/trade'
import { createLostFound } from '@/api/lostFound'
import { createGroupBuy } from '@/api/groupBuy'
import { createErrand } from '@/api/errand'

const router = useRouter()

// 发布类型
const publishType = ref<'trades' | 'lostFounds' | 'groupBuys' | 'errands'>('trades')
const submitting = ref(false)

// 表单数据（兼容四类业务所有字段）
const form = reactive({
  // 通用字段
  title: '',
  location: '',
  description: '',
  // 二手交易
  category: '',
  price: '' as string | number,
  condition: '',
  // 失物招领
  type: '',
  itemName: '',
  eventTime: '',
  // 拼单搭子
  groupType: '',
  targetCount: '' as string | number,
  deadline: '',
  // 跑腿委托
  taskType: '',
  reward: '' as string | number,
  from: '',
  to: '',
})

// 错误对象
const errors = reactive<Record<string, string>>({
  title: '',
  location: '',
  description: '',
  category: '',
  price: '',
  condition: '',
  type: '',
  itemName: '',
  eventTime: '',
  groupType: '',
  targetCount: '',
  deadline: '',
  taskType: '',
  reward: '',
  from: '',
  to: '',
})

// 类型选项
const typeOptions = [
  { value: 'trades', label: '二手交易' },
  { value: 'lostFounds', label: '失物招领' },
  { value: 'groupBuys', label: '拼单搭子' },
  { value: 'errands', label: '跑腿委托' },
]

// 二手交易分类选项
const categoryOptions = ['数码配件', '教材资料', '生活用品', '运动器材', '教辅资料']
const conditionOptions = ['全新未拆', '九成新', '八成新', '七成新', '六成新以下']
// 失物招领类型
const lostFoundTypeOptions = [
  { value: 'lost', label: '丢失物品' },
  { value: 'found', label: '捡到物品' },
]
// 拼单类型
const groupTypeOptions = ['拼餐', '团购', '出行搭子']
// 跑腿类型
const taskTypeOptions = ['代取快递', '代买', '代送物品', '代办', '代取外卖']

// 清空错误
const clearErrors = () => {
  for (const key in errors) {
    errors[key] = ''
  }
}

// 重置表单
const resetForm = () => {
  form.title = ''
  form.location = ''
  form.description = ''
  form.category = ''
  form.price = ''
  form.condition = ''
  form.type = ''
  form.itemName = ''
  form.eventTime = ''
  form.groupType = ''
  form.targetCount = ''
  form.deadline = ''
  form.taskType = ''
  form.reward = ''
  form.from = ''
  form.to = ''
  clearErrors()
}

// 切换类型时自动重置
watch(publishType, () => {
  resetForm()
})

// 表单校验
const validateForm = (): boolean => {
  clearErrors()
  let valid = true

  // 通用校验
  if (!form.title.trim()) { errors.title = '请输入标题'; valid = false }
  if (!form.location.trim()) { errors.location = '请输入地点'; valid = false }
  if (!form.description.trim()) { errors.description = '请输入描述'; valid = false }

  // 分类型校验
  if (publishType.value === 'trades') {
    if (!form.category) { errors.category = '请选择分类'; valid = false }
    if (!form.price || Number(form.price) <= 0) { errors.price = '价格必须大于0'; valid = false }
    if (!form.condition) { errors.condition = '请选择成色'; valid = false }
  }

  if (publishType.value === 'lostFounds') {
    if (!form.type) { errors.type = '请选择招领类型'; valid = false }
    if (!form.itemName.trim()) { errors.itemName = '请输入物品名称'; valid = false }
    if (!form.eventTime.trim()) { errors.eventTime = '请输入发生时间'; valid = false }
  }

  if (publishType.value === 'groupBuys') {
    if (!form.groupType) { errors.groupType = '请选择拼单类型'; valid = false }
    if (!form.targetCount || Number(form.targetCount) < 2) { errors.targetCount = '目标人数至少2人'; valid = false }
    if (!form.deadline.trim()) { errors.deadline = '请输入截止时间'; valid = false }
  }

  if (publishType.value === 'errands') {
    if (!form.taskType) { errors.taskType = '请选择任务类型'; valid = false }
    if (form.reward !== '' && Number(form.reward) < 0) { errors.reward = '酬劳不能为负数'; valid = false }
    if (!form.from.trim()) { errors.from = '请输入取件地点'; valid = false }
    if (!form.to.trim()) { errors.to = '请输入送达地点'; valid = false }
    if (!form.deadline.trim()) { errors.deadline = '请输入截止时间'; valid = false }
  }

  return valid
}

const formatTime = (dateStr: string): string => {
  return dateStr.replace('T', ' ')
}

const handleSubmit = async () => {
  if (!validateForm()) return
  submitting.value = true

  try {
    const now = new Date().toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/\//g, '-')

    if (publishType.value === 'trades') {
      await createTrade({
        title: form.title,
        price: Number(form.price),
        category: form.category,
        condition: form.condition,
        publisher: '校园用户',
        publishTime: now,
        location: form.location,
        image: '',
        status: 'open',
        description: form.description,
      })
      alert('发布成功！')
      resetForm()
      router.push('/trade')
    }

    if (publishType.value === 'lostFounds') {
      await createLostFound({
        title: form.title,
        type: form.type,
        itemName: form.itemName,
        location: form.location,
        eventTime: formatTime(form.eventTime),
        contact: '校园用户',
        targetUser: '待确认',
        status: 'open',
        description: form.description,
      })
      alert('发布成功！')
      resetForm()
      router.push('/lost-found')
    }

    if (publishType.value === 'groupBuys') {
      await createGroupBuy({
        title: form.title,
        type: form.groupType,
        targetCount: Number(form.targetCount),
        currentCount: 1,
        deadline: formatTime(form.deadline),
        location: form.location,
        publisher: '校园用户',
        status: 'open',
        description: form.description,
      })
      alert('发布成功！')
      resetForm()
      router.push('/group-buy')
    }

    if (publishType.value === 'errands') {
      await createErrand({
        title: form.title,
        taskType: form.taskType,
        reward: Number(form.reward) || 0,
        from: form.from,
        to: form.to,
        deadline: formatTime(form.deadline),
        publisher: '校园用户',
        status: 'open',
        description: form.description,
      })
      alert('发布成功！')
      resetForm()
      router.push('/errand')
    }
  } catch (error) {
    console.error('发布失败:', error)
    alert('发布失败，请稍后重试')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="publish-view">
    <h2>发布信息</h2>

    <form @submit.prevent="handleSubmit">
      <!-- 类型选择 -->
      <FormField label="信息类型" :required="true">
        <div class="type-options">
          <span
            v-for="opt in typeOptions"
            :key="opt.value"
            class="type-item"
            :class="{ active: publishType === opt.value }"
            @click="publishType = opt.value as any"
          >{{ opt.label }}</span>
        </div>
        <p v-if="errors.publishType" class="field-error">{{ errors.publishType }}</p>
      </FormField>

      <!-- 通用字段：标题 -->
      <FormField label="标题" :required="true" :error="errors.title">
        <input v-model="form.title" type="text" placeholder="请输入标题" />
      </FormField>

      <!-- 通用字段：地点 -->
      <FormField label="地点" :required="true" :error="errors.location">
        <input v-model="form.location" type="text" placeholder="请输入地点" />
      </FormField>

      <!-- ========== 二手交易专属字段 ========== -->
      <template v-if="publishType === 'trades'">
        <FormField label="分类" :required="true" :error="errors.category">
          <select v-model="form.category">
            <option value="">请选择分类</option>
            <option v-for="cat in categoryOptions" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </FormField>
        <FormField label="价格" :required="true" :error="errors.price">
          <input v-model="form.price" type="number" placeholder="请输入价格" min="0" />
        </FormField>
        <FormField label="成色" :required="true" :error="errors.condition">
          <select v-model="form.condition">
            <option value="">请选择成色</option>
            <option v-for="c in conditionOptions" :key="c" :value="c">{{ c }}</option>
          </select>
        </FormField>
      </template>

      <!-- ========== 失物招领专属字段 ========== -->
      <template v-if="publishType === 'lostFounds'">
        <FormField label="招领类型" :required="true" :error="errors.type">
          <select v-model="form.type">
            <option value="">请选择类型</option>
            <option v-for="t in lostFoundTypeOptions" :key="t.value" :value="t.value">{{ t.label }}</option>
          </select>
        </FormField>
        <FormField label="物品名称" :required="true" :error="errors.itemName">
          <input v-model="form.itemName" type="text" placeholder="请输入物品名称" />
        </FormField>
        <FormField label="发生时间" :required="true" :error="errors.eventTime">
          <input v-model="form.eventTime" type="datetime-local" />
        </FormField>
      </template>

      <!-- ========== 拼单搭子专属字段 ========== -->
      <template v-if="publishType === 'groupBuys'">
        <FormField label="拼单类型" :required="true" :error="errors.groupType">
          <select v-model="form.groupType">
            <option value="">请选择类型</option>
            <option v-for="gt in groupTypeOptions" :key="gt" :value="gt">{{ gt }}</option>
          </select>
        </FormField>
        <FormField label="目标人数" :required="true" :error="errors.targetCount">
          <input v-model="form.targetCount" type="number" placeholder="至少2人" min="2" />
        </FormField>
        <FormField label="截止时间" :required="true" :error="errors.deadline">
          <input v-model="form.deadline" type="datetime-local" />
        </FormField>
      </template>

      <!-- ========== 跑腿委托专属字段 ========== -->
      <template v-if="publishType === 'errands'">
        <FormField label="任务类型" :required="true" :error="errors.taskType">
          <select v-model="form.taskType">
            <option value="">请选择类型</option>
            <option v-for="tt in taskTypeOptions" :key="tt" :value="tt">{{ tt }}</option>
          </select>
        </FormField>
        <FormField label="酬劳" :required="true" :error="errors.reward">
          <input v-model="form.reward" type="number" placeholder="请输入酬劳金额" min="0" />
        </FormField>
        <FormField label="取件地点" :required="true" :error="errors.from">
          <input v-model="form.from" type="text" placeholder="请输入取件地点" />
        </FormField>
        <FormField label="送达地点" :required="true" :error="errors.to">
          <input v-model="form.to" type="text" placeholder="请输入送达地点" />
        </FormField>
        <FormField label="截止时间" :required="true" :error="errors.deadline">
          <input v-model="form.deadline" type="datetime-local" />
        </FormField>
      </template>

      <!-- 通用字段：描述 -->
      <FormField label="详细描述" :required="true" :error="errors.description">
        <textarea v-model="form.description" placeholder="请详细描述信息" rows="4"></textarea>
      </FormField>

      <!-- 提交按钮 -->
      <button type="submit" class="submit-btn" :disabled="submitting">
        {{ submitting ? '发布中...' : '发布' }}
      </button>
      <button type="button" class="reset-btn" @click="resetForm">重置</button>
    </form>
  </div>
</template>

<style scoped>
.publish-view {
  padding: 0;
}

h2 {
  font-size: 20px;
  margin-bottom: 20px;
  color: #333;
}

.type-options {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.type-item {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  background: #f5f5f5;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.type-item.active,
.type-item:hover {
  background: #ffb6c1;
  color: #fff;
}

input,
select,
textarea {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  font-family: inherit;
  background: #fff;
}

select {
  appearance: auto;
}

textarea {
  resize: vertical;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #ffb6c1;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #ffb6c1;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
  margin-top: 8px;
}

.submit-btn:hover:not(:disabled) {
  background: #ff9aaf;
}

.submit-btn:disabled {
  background: #ddd;
  cursor: not-allowed;
}

.reset-btn {
  width: 100%;
  padding: 12px;
  background: #fff;
  color: #999;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 8px;
  transition: all 0.2s;
}

.reset-btn:hover {
  border-color: #ffb6c1;
  color: #e8689c;
}

.field-error {
  font-size: 12px;
  color: #e8689c;
  margin-top: 4px;
}
</style>
