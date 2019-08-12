import iView from 'iview'
export const loadingShow = (title) => {
  this.$Spin.show({
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
export const loadingHide = (title) => {
  this.$Spin.hide()
}