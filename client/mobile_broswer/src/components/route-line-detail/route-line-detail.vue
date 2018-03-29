<template>
  <transition name="slide">
    <div class="route-line-detail" ref="routeLineDetail">
      <div class="back"><i class="icon-back" @click="back"></i></div>
      <h1 class="title" v-text="id"></h1>
      <div class="start-or-end-wrapper" v-if="nameOfStartAndEnd">
        <div class="start" v-text="`起始站：${nameOfStartAndEnd.start}`"></div>
        <div class="btn-translate" @click="handleTransRoute">
          <i class="icon-random icon"></i>返程</div>
        <div class="start" v-text="`终点站：${nameOfStartAndEnd.end}`"></div>
      </div>
      <scroll v-if="currentRouteStations" :data="currentRouteStations" class="list" ref="list">
        <div class="all-stations">
          <div class="one-stataion" v-for="(item, index) in currentRouteStations" :key="index" @click="handleGetThisStationDetail(index)">
            <img class="avatar" v-lazy="item.avatar" />
            <span class="name">{{item.name}}</span>
            <div class="detail">此站等候</div>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'
import { getRouteLineDetail, getThisStationDetail } from '@/api/search'
import { ERR_OK } from '@/api/config'
const avatarUrl = `https://dummyimage.com/100x100/666666/FFF.png&text=`
export default {
  data () {
    return {
      id: this.$route.params.id,
      originRouteData: undefined,
      downOrUp: 'down'
    }
  },
  computed: {
    currentRouteStations () {
      if (!this.originRouteData) {
        return undefined
      }
      return this.originRouteData[this.downOrUp].map(m => {
        return {
          avatar: avatarUrl + '无',
          name: m
        }
      })
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
  },
  methods: {
    handler (component) {
      console.log('this component is showing')
    },
    handleGetThisStationDetail (index) {
      const query = {
        lineName: this.id.substr(0, this.id.length - 1),
        isUpDown: this.downOrUp === 'down' ? 1 : 0,
        stationNum: index + 1
      }
      getThisStationDetail(query).then(res => {
        console.log(res)
      })
    },
    handleTransRoute () {
      const selectDownOrUp = ['down', 'up']
      const idx = selectDownOrUp.findIndex(m => m === this.downOrUp)
      this.downOrUp = selectDownOrUp[1 - idx]
    },
    back () {
      this.$router.back()
    },
    _getRouteLineDetail (query) {
      getRouteLineDetail(query).then((res) => {
        if (res.code === ERR_OK) {
          this.originRouteData = res.data
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
    transition all 0.3s
  .slide-enter,.slide-leave-to
    transform translate3d(100%, 0, 0)
  .route-line-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 80px
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .start-or-end-wrapper
      position: relative
      display: flex
      width: 100%
      height: 40px
      padding-top: 40px;
      transform-origin: top
      background-size: cover
      .btn-translate
        background-color: $color-theme
        border-radius: 5px
        padding: 7px 0
        flex: 0 0 80px
        .icon
          font-size: $font-size-large
          vertical-align: middle;
          margin-right: 5px;
    .start-or-end-wrapper > *
      flex: 1
      color: $color-text-ll
      font-size: $font-size-medium
      text-align: center
      align-self: center
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
</style>
