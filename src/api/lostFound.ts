import http from './http'

export interface LostFound {
  id: number
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

export const getLostFounds = async (): Promise<LostFound[]> => {
  const response = await http.get('/lostFounds')
  return response.data
}
