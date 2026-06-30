import http from './http'

export interface GroupBuy {
  id: string | number
  title: string
  type: string
  targetCount: number
  currentCount: number
  deadline: string
  location: string
  publisher: string
  status: string
  description: string
}

export type GroupBuyItem = Omit<GroupBuy, 'id'>

export const getGroupBuys = async (): Promise<GroupBuy[]> => {
  const response = await http.get('/groupBuys')
  return response.data
}

export const getGroupBuyById = async (id: string | number): Promise<GroupBuy> => {
  const response = await http.get(`/groupBuys/${id}`)
  return response.data
}

export const createGroupBuy = async (data: GroupBuyItem): Promise<GroupBuy> => {
  const response = await http.post('/groupBuys', data)
  return response.data
}
