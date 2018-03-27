import * as types from './mutation-types'
import { saveSearch, deleteSearch, clearSearch, saveUse, saveFavorite, deleteFavorite } from '@/common/js/cache'

export const saveSearchHistory = function ({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const saveFavoriteList = function ({ commit, state }, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

export const deleteFavoriteList = function ({ commit, state }, song) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}

export const deleteSearchHistory = function ({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({ commit }) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const saveUseHistory = function ({ commit }, song) {
  commit(types.SET_USE_HISTORY, saveUse(song))
}
