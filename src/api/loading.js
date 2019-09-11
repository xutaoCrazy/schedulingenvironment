export const loadingShow = (_this, title) => {
  _this.$Spin.show({
    render: (h) => {
      return h('div', [
        h('Icon', {
          'class': 'demo-spin-icon-load',
          props: {
            type: 'ios-loading',
            size: 18
          }
        }),
        h('div', title)
      ])
    }
  });
}
export const loadingHide = (_this) => {
  _this.$Spin.hide()
}
