<template>
  <scroll @beforeScrollHandle="listScroll" :beforeScroll="beforeScroll" :pullup="pullup" class="suggest" :data="result" ref="suggest">
    <ul class="suggest-list">
      <li @click="selectItem(item)" class="suggest-item" v-for="(item, index) in result" :key="index">
        <div class="icon">
          <i class="icon-mine"></i>
        </div>
        <div class="name">
          <p class="text" v-html="item"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
import { search } from '@/api/search'
import { ERR_OK } from '@/api/config'
import Scroll from '@/base/scroll/scroll'
import Loading from '@/base/loading/loading'
import NoResult from '@/base/no-result/no-result'

export default {
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      result: [],
      pullup: true,
      beforeScroll: true,
      hasMore: true
    }
  },
  methods: {
    refresh () {
      this.$refs.suggest.refresh()
    },
    search () {
      this.hasMore = true
      this.$refs.suggest.scrollTo(0, 0)
      search(this.query).then(res => {
        if (res.code === ERR_OK) {
          this.result = res.data
        }
      })
      this.hasMore = false
    },
    selectItem (item) {
      this.$router.push({
        path: `/search/${item}`
      })
      this.$emit('select')
    },
    listScroll () {
      this.$emit('listScroll')
    }
  },
  watch: {
    query () {
      this.search()
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
}
</script>

<style lang="stylus" scoped>
  @import "~@/common/stylus/variable"
  @import "~@/common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
