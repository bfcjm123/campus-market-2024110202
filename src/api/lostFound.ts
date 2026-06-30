import http from './http'

export interface LostFound {
  id: string | number
  title: string
  type: string
  itemName: string
  location: string
  eventTime: string
  contact: string
  targetUser: string
  status: string
  description: string
}

export type LostFoundItem = Omit<LostFound, 'id'>

export const getLostFounds = async (): Promise<LostFound[]> => {
  const response = await http.get('/lostFounds')
  return response.data
}

export const getLostFoundById = async (id: string | number): Promise<LostFound> => {
  const response = await http.get(`/lostFounds/${id}`)
  return response.data
}

export const createLostFound = async (data: LostFoundItem): Promise<LostFound> => {
  const response = await http.post('/lostFounds', data)
  return response.data
}
