<template>
  <div 
    class="inner" 
    v-if="items.length > 0"
    v-tooltip.top-center="helpMessage"
    @click.prevent="retry"
  >
    <i v-if="locktimeLeft === 0" class="icon-warning"/>
    <i v-else class="icon-spinner animate-spin"/>
  </div>
</template>

<script>
const LOCKTIME = 30
export default {
  props: ['items'],
  data () {
    return {
      locktimeLeft: 0,
    }
  },
  methods: {
    retry () {
      if (this.locktimeLeft) {
        return
      }
      
      this.items.forEach(item => {
        this.$store.dispatch('getTxs', {
          address: item.address,
          tokenAddress: item.tokenAddress,
        })
      })

      const countdown = () => {
        if (this.locktimeLeft === 0) {
          return
        }
        window.setTimeout(() => {
          this.locktimeLeft--
          countdown()
        }, 1000)
      }
      this.locktimeLeft = LOCKTIME
      countdown()
    }
  },
  computed: {
    helpMessage () {
      let accountsList = ''
      this.items.forEach(item => {
        accountsList += '<br/>- ' + item.address
        const token = this.$store.getters.getToken(item.tokenAddress)
        if (token) {
          accountsList += ` (${token.ticker})`
        }
      })
      return 'The following accounts have had too many transactions recently and their history can\'t be displayed :<br/>' + accountsList + '<br/><br/>Click to retry (max once per ' + LOCKTIME + ' seconds)'
    },
  },
}
</script>

<style lang="scss" scoped>
.inner {
  font-size: 12px;
  display: inline-block;
  margin-bottom: 10px;
  cursor: pointer;
  i.icon-warning {
    color: #f6a622;
  }
}
</style>
