import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const USE_KEY = '__use__'
const FAVORTIE_KEY = '__favorite__'

const SEARCH_MAX_LENGTH = 15
const USE_MAX_LENGTH = 200
const FAVORITE_LENGTH = 200

export function saveFavorite (song) {
  let songs = storage.get(FAVORTIE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_LENGTH)
  storage.set(FAVORTIE_KEY, songs)
  return songs
}

export function deleteFavorite (song) {
  let songs = storage.get(FAVORTIE_KEY, [])
  deleteFromArray(songs, (item) => {
    return song.id === item.id
  })
  storage.set(FAVORTIE_KEY, songs)
  return songs
}

export function loadFavorite () {
  return storage.get(FAVORTIE_KEY, [])
}

export function saveSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
}

export function clearSearch () {
  storage.remove(SEARCH_KEY)
  return []
}

export function deleteSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function saveUse (song) {
  let songs = storage.get(USE_KEY, [])
  insertArray(songs, song, (item) => {
    return item.id === song.id
  }, USE_MAX_LENGTH)
  storage.set(USE_KEY, songs)
  return songs
}

export function loadUse () {
  return storage.get(USE_KEY, [])
}

function insertArray (arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}
