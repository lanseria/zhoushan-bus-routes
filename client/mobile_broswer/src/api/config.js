const prefix = require('../../../../config')

export const options = {
  param: 'callback'
}
export const baseUrl = process.env.NODE_ENV === 'production' ? `//localhost:7993${prefix}` : `//api.limonplayer.cn${prefix}`

export const ERR_OK = 0
