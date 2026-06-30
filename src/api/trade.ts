import http from './http'

export interface Trade {
  id: string | number
  title: string
  price: number
  category: string
  condition: string
  publisher: string
  publishTime: string
  location: string
  image: string
  status: string
  description: string
}

// 新增时不需要id（JSON Server自动生成）
export type TradeItem = Omit<Trade, 'id'>

export const getTrades = async (): Promise<Trade[]> => {
  const response = await http.get('/trades')
  return response.data
}

export const getTradeById = async (id: string | number): Promise<Trade> => {
  const response = await http.get(`/trades/${id}`)
  return response.data
}

export const createTrade = async (data: TradeItem): Promise<Trade> => {
  const response = await http.post('/trades', data)
  return response.data
}
