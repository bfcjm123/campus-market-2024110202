import http from './http'

export interface Trade {
  id: number
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

export const getTrades = async (): Promise<Trade[]> => {
  const response = await http.get('/trades')
  return response.data
}
