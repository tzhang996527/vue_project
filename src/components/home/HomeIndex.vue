<template>
  <div>
    <home-header></home-header>
    <hr/>
    <div>
      这是首页，嘻嘻嘻。
    </div>
    <hr/>
    <home-footer></home-footer>
  </div>
</template>

<script>
import homeHeader from '@/components/home/HomeHeader.vue'
import homeFooter from '@/components/home/HomeFooter.vue'

export default {
  name: 'HomeIndex',
  // homeHeader/homeFooter组件给申明到components里面然后在template里面使用
  components: { homeHeader, homeFooter },
}
</script>
