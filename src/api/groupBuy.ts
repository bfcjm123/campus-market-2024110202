import http from './http'

export interface GroupBuy {
  id: number
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

export const getGroupBuys = async (): Promise<GroupBuy[]> => {
  const response = await http.get('/groupBuys')
  return response.data
}
