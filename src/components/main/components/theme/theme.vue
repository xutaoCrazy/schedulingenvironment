<template>
  <div class="user-avatar-dropdown">
    <div>
     <span @click='sliderbar'>
       <Icon :size='20' type="ios-list-box" style="color:#888888" />
       主题</span>

    </div>
    <div  class='slider-bar' v-show='display'>
      <Card title="主题" icon="md-settings" :padding="0" shadow style="width: 260px;">
            <CellGroup>
                <Cell title="主题设置" label=""  style='font-weight:800'/>
                <div class='layoutStyle'>
                  你可以从这里选择和预览主题的布局和样式，这些设置会被保存在本地，下次打开的时候会直接应用这些设置。
                </div>
                <Cell title="主题设置"  style='text-align:center;background:#efefef;font-weight:600' />
                <Cell title="收起左侧菜单">
                    <i-Switch :value="sideCollapse" slot="extra" @on-change="setSideCollapse" />
                </Cell>
                <Cell title="皮肤选择"  style='text-align:center;background:#efefef;font-weight:600' />
                <Cell title="默认主题" style='background:#056daf;height:50px;color:#fff;line-height:38px' @click='themeColor'/>
                <Cell title="绿色主题" style='background:#199d82;height:50px;color:#fff;line-height:38px'/>
            </CellGroup>
        </Card>
    </div>
  </div>
</template>
<script>
import './theme.less'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'theme',
  props: {

  },
  data () {
    return {
      display: false
    }
  },
  computed: {
    ...mapState(['sideCollapse'])
  },
  methods: {
    ...mapMutations(['setSideCollapse']),
    sliderbar () {
      this.display = !this.display
    },
    themeColor () {
      debugger
    }
  }
}
</script>
