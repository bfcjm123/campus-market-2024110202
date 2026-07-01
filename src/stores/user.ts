import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CurrentUser {
  id: string
  name: string
  nickname: string
  college: string
  grade: string
  major: string
  class: string
  phone: string
  qq: string
  email: string
  avatar: string
  bio: string
  signature: string
  isLoggedIn: boolean
}

export const useUserStore = defineStore('user', () => {
  const user = ref<CurrentUser>({
    id: '20230101',
    name: '张小明',
    nickname: '小明同学',
    college: '计算机学院',
    grade: '2023级',
    major: '软件工程',
    class: '软工2301班',
    phone: '138****1234',
    qq: '12345678',
    email: 'zhangxm@campus.edu',
    avatar: '',
    bio: '热爱编程，喜欢折腾各种技术',
    signature: '用心做好每一件事',
    isLoggedIn: true,
  })

  const displayName = computed(() => {
    return `${user.value.name} · ${user.value.grade}${user.value.college}`
  })

  const updateProfile = (data: Partial<CurrentUser>) => {
    Object.assign(user.value, data)
  }

  const login = () => {
    user.value.isLoggedIn = true
  }

  const logout = () => {
    user.value.isLoggedIn = false
  }

  return { user, displayName, updateProfile, login, logout }
})
