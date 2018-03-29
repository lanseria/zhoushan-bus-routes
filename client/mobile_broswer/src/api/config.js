const prefix = require('../../../../config')

export const options = {
  param: 'callback'
}

export const baseUrl = process.env.NODE_ENV === 'production' ? `//api.limonplayer.cn${prefix}` : `//localhost:7993${prefix}`

export const ERR_OK = 0
