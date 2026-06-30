import http from './http'

export interface Errand {
  id: string | number
  title: string
  taskType: string
  reward: number
  from: string
  to: string
  deadline: string
  publisher: string
  status: string
  description: string
}

export type ErrandItem = Omit<Errand, 'id'>

export const getErrands = async (): Promise<Errand[]> => {
  const response = await http.get('/errands')
  return response.data
}

export const getErrandById = async (id: string | number): Promise<Errand> => {
  const response = await http.get(`/errands/${id}`)
  return response.data
}

export const createErrand = async (data: ErrandItem): Promise<Errand> => {
  const response = await http.post('/errands', data)
  return response.data
}
