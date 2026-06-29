import http from './http'

export interface Errand {
  id: number
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

export const getErrands = async (): Promise<Errand[]> => {
  const response = await http.get('/errands')
  return response.data
}
