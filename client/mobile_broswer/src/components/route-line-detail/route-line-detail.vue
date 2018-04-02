<template>
  <transition name="slide">
    <div class="route-line-detail" ref="routeLineDetail">
      <div class="back"><i class="icon-corner-down-left" @click="back"></i></div>
      <h1 class="title" v-text="id"></h1>
      <div class="start-or-end-wrapper" v-if="nameOfStartAndEnd">
        <div class="start">
          <span class="tag">起</span>
          <span class="point">{{nameOfStartAndEnd.start}}</span>
        </div>
        <div class="btn-translate" @click="handleTransRoute">
          <i class="icon-repeat icon"></i>返程</div>
        <div class="end">
          <span class="tag">终</span>
          <span class="point">{{nameOfStartAndEnd.end}}</span>
        </div>
      </div>
      <div class="content-wrapper">
        <transition name="slidedown">
          <div v-show="timeMsg" class="notify" v-html="timeMsg"></div>
        </transition>
        <scroll v-if="currentRouteStations" :data="currentRouteStations" class="list" ref="list">
          <div class="all-stations">
            <div class="one-stataion" v-for="(item, index) in currentRouteStations" :key="index" @click="handleGetThisStationDetail(index)">
              <img class="avatar" :src="item.avatar" />
              <span class="name">{{item.name}}</span>
              <div class="detail">此站等候</div>
            </div>
          </div>
        </scroll>
        <div class="legend">
          <div class="stop"></div>
          <span>进站</span>
          <div class="en-route"></div>
          <span>途中</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'
import { getRouteLineDetail, getThisStationDetail } from '@/api/search'
import { ERR_OK } from '@/api/config'

const selectDownOrUp = ['down', 'up']
function getAvatarUrl (text, color, height = 100, width = 100) {
  return `https://dummyimage.com/${height}x${width}/${color}/FFF.png&text=${text}`
}

export default {
  data () {
    return {
      id: this.$route.params.id,
      originRouteData: undefined,
      downOrUp: selectDownOrUp[0],
      timeMsg: ''
    }
  },
  computed: {
    currentRouteStations () {
      if (!this.originRouteData) {
        return undefined
      }
      return this.originRouteData[this.downOrUp]
    },
    nameOfStartAndEnd () {
      if (!this.currentRouteStations) {
        return undefined
      }
      const Route = this.currentRouteStations
      return {
        start: Route[0].name,
        end: Route[Route.length - 1].name
      }
    }
  },
  created () {
    this._getRouteLineDetail(this.id)
    const query = {
      lineName: this.id.substr(0, this.id.length - 1),
      isUpDown: this.downOrUp === 'down' ? 1 : 0,
      stationNum: 1
    }
    this.$getThisStationDetailInterval = setTimeout(() => {
      getThisStationDetail(query).then(res => {
        clearTimeout(this.$timeMsgCount)
        const buses = res.data.buses
        if (buses.length === 0) {
          this.timeMsg = '暂无车次信息'
          return
        }
        this.timeMsg = res.data.msg
        this.$timeMsgCount = setTimeout(() => {
          this.timeMsg = ''
        }, 3000)
        buses.map(abus => {
          const lastStation = abus.lastStation
          const isStation = abus.isStation
          let color = ''
          if (isStation === '1') {
            color = 'ffcd32' // 途中
          } else {
            color = '5fe27b' // 进站
          }
          this.originRouteData[this.downOrUp][lastStation].avatar = getAvatarUrl(lastStation, color)
          this.originRouteData[this.downOrUp][lastStation].buses = buses
        })
      })
    }, 1000)
  },
  destroyed () {
    clearTimeout(this.$getThisStationDetailInterval)
    clearTimeout(this.$timeMsgCount)
  },
  methods: {
    handleGetThisStationDetail (index) {
      const query = {
        lineName: this.id.substr(0, this.id.length - 1),
        isUpDown: this.downOrUp === 'down' ? 1 : 0,
        stationNum: index + 1
      }
      getThisStationDetail(query).then(res => {
        clearTimeout(this.$timeMsgCount)
        const buses = res.data.buses
        this.originRouteData[this.downOrUp][index].msg = res.data.msg
        this.timeMsg = res.data.msg
        this.$timeMsgCount = setTimeout(() => {
          this.timeMsg = ''
        }, 3000)
        this.originRouteData[this.downOrUp][index].buses = buses
      })
    },
    handleTransRoute () {
      const idx = selectDownOrUp.findIndex(m => m === this.downOrUp)
      this.downOrUp = selectDownOrUp[1 - idx]
    },
    back () {
      this.$router.back()
    },
    _getRouteLineDetail (query) {
      getRouteLineDetail(query).then((res) => {
        if (res.code === ERR_OK) {
          const data = res.data
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              let element = data[key]
              element = element.map((m, i) => {
                return {
                  avatar: getAvatarUrl(i + 1, '15b1ca'),
                  name: m,
                  buses: [],
                  msg: ''
                }
              })
              data[key] = element
            }
          }
          this.originRouteData = data
        }
      })
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/common/stylus/variable"
  @import "~@/common/stylus/mixin"
  .slide-enter-active,.slide-leave-active
    transition: all 0.3s
  .slide-enter,.slide-leave-to
    transform: translate3d(100%, 0, 0)
  .slidedown-enter-active,.slidedown-leave-active
    transition: all 0.3s
  .slidedown-enter,.slidedown-leave-to
    transform: translate3d(0, -100%, 0)
    opacity: 0%
  .route-line-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position: absolute
      z-index: 100
      top: 0
      left: 6px
      z-index: 50
      background-color: $color-background
      .icon-corner-down-left
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      z-index: 100
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
      background-color: $color-background
    .start-or-end-wrapper
      z-index 100
      position: absolute
      display: flex
      width: 100%
      height: 40px
      top: 40px;
      transform-origin: top
      background-size: cover
      background-color: $color-background
      .btn-translate
        background-color: $color-theme
        border-radius: 5px
        padding: 7px 0
        flex: 0 0 80px
        .icon
          font-size: $font-size-large
          vertical-align: middle
          margin-right: 5px
      .tag
        padding: 5px 10px
        border-radius: 5px
      .start
        span.tag
          background-color: #109c10
      .end
        span.tag
          background-color red
    .start-or-end-wrapper > *
      flex: 1
      color: $color-text-ll
      font-size: $font-size-medium
      text-align: center
      align-self: center
  .content-wrapper
    bottom: 0;
    position: absolute;
    top: 80px;
    right: 0;
    left: 0;
    .list
      height: 100%
      overflow: hidden
      background: $color-highlight-background
      .all-stations
        background: $color-background
        padding-bottom: 30px
        .one-stataion
          display: flex
          align-items: center
          padding: 20px 0 0 30px
          .avatar
            flex: 0 0 50px
            width: 50px
            height: 50px
            border-radius: 50%
          .name
            flex: 1
            margin-left: 20px
            color: $color-text-l
            font-size: $font-size-medium
          .detail
            flex: 0 0 100px
            float: right
            margin-left: 20px
            color: $color-theme-d
            font-size: $font-size-medium
    .notify
      position: absolute
      font-size: $font-size-medium
      color: $color-theme
      background-color: $color-dialog-background-o
      padding: 9px 14px
      height: 28px
      width: 100%
      z-index 1
    .legend
      position: absolute
      z-index: 10
      bottom: 0
      background-color: $color-dialog-background-o
      padding 5px 10px
      width: 100%
      span
        font-size: $font-size-medium
      div
        vertical-align: sub
        display: inline-block
        width: 20px
        height: 20px
        border-radius: 50%
      .stop
        background-color: #5fe27b
      .en-route
        background-color: $color-theme
</style>
