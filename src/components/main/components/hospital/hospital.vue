<template>
  <div class="user-avatar-dropdown">
    <div>
      <Icon :size="20" type="ios-home" style="color:#888888" />
      <Select v-model="baseHospitalid" style="width:200px">
        <Option v-for="item in parameterArray" :value="item.id" :key="item.id">{{ item.text }}</Option>
      </Select>
    </div>
  </div>
</template>
<script>
import "./hospital.less";
import { mapState, mapMutations } from "vuex";
export default {
  name: "hospital",
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["parameterArray", "baseHospitalid"])
  },
  methods: {},
  mounted() {}
};
</script>
