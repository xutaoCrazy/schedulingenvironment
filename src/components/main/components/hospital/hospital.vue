<template>
  <div class="user-avatar-dropdown">
    <div>
      <Icon :size='20' type="ios-home" style="color:#888888"/>
      <Select v-model="model1" style="width:200px">
          <Option v-for="item in hospitallist" :value="item.id" :key="item.id">{{ item.value }}</Option>
      </Select>
    </div>
  </div>
</template>
<script>
import './hospital.less'
// import { mapActions } from 'vuex'
export default {
  name: 'hospital',
  props: {

  },
  data () {
    return {
      hospitallist: [
        {
          id: '1',
          value: '坐标软件软件开发演示库'
        }
      ],
      model1: '1'
    }
  },
  methods: {

  }
}
</script>
