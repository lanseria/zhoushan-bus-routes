import { loadSearch, loadUse, loadFavorite } from '@/common/js/cache'

const state = {
  searchHistory: loadSearch(),
  playHistory: loadUse(),
  favoriteList: loadFavorite()
}

export default state
