import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface FavoriteItem {
  type: 'trade' | 'lostFound' | 'groupBuy' | 'errand'
  id: string | number
  title: string
  description: string
  location: string
}

export const useFavoriteStore = defineStore('favorite', () => {
  const favorites = ref<FavoriteItem[]>([])

  const favoriteCount = computed(() => favorites.value.length)

  const isFavorite = (type: string, id: string | number): boolean => {
    return favorites.value.some(f => f.type === type && String(f.id) === String(id))
  }

  const addFavorite = (item: FavoriteItem) => {
    if (!isFavorite(item.type, item.id)) {
      favorites.value.push(item)
    }
  }

  const removeFavorite = (type: string, id: string | number) => {
    favorites.value = favorites.value.filter(
      f => !(f.type === type && String(f.id) === String(id))
    )
  }

  const toggleFavorite = (item: FavoriteItem) => {
    if (isFavorite(item.type, item.id)) {
      removeFavorite(item.type, item.id)
    } else {
      addFavorite(item)
    }
  }

  return { favorites, favoriteCount, isFavorite, addFavorite, removeFavorite, toggleFavorite }
})
