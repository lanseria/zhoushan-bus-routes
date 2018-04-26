const SEARCH_KEY = '__z_bus_search__'
const SEARCH_MAX_LENGTH = 15

export function saveSearch (query) {
  wx.getStorage({
    key: SEARCH_KEY,
    success: (res) => {
      let searches = res.data
      insertArray(searches, query, (item) => {
        return item === query
      }, SEARCH_MAX_LENGTH);
      wx.setStorage({
        key: SEARCH_KEY,
        data: searches
      });
    },
    fail: (e) => {
      console.log(e)
    }
  })
}

export function loadSearch() {
  try {
    const data = wx.getStorageSync(SEARCH_KEY)
    if (data) {
      console.log(data)
      return data
    }
    wx.setStorage({
      key: SEARCH_KEY,
      data: []
    });
    return []
  } catch (e) {
    console.log(e)
    wx.setStorage({
      key: SEARCH_KEY,
      data: []
    });
    return []
  }
}

export function clearSearch() {
  wx.removeStorageSync(SEARCH_KEY)
  return []
}

export function deleteSearch(query) {
  let searches = wx.getStorageSync(SEARCH_KEY)
  deleteFromArray(searches, (item) => {
    return item === query
  });
  wx.setStorageSync(SEARCH_KEY, searches)
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

function insertArray(arr, val, compare, maxLen) {
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
