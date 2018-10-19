<template>
  <div class="tx-updater">
    <span class="info" v-if="secondsBeforeNext">
      Next update in {{ formatDuration(secondsBeforeNext) }}
      <a href="#" @click.prevent="secondsBeforeNext = 0">refresh now</a>
    </span>
    <span class="info" v-else-if="loading">
      Updating transactions history
      <span v-if="watchList.length">
        ({{ nbDone.toString() }}/{{ watchList.length }})
      </span>
    </span>
    <span v-else>
      &nbsp;
    </span>

    <div class="status">
      <span 
        v-if="loading"
        class="icon-spinner animate-spin"
      />
      <span 
        v-else-if="watchListTxNotLoaded.length === 0"
        class="ok"
      />
      <TxNotLoaded 
        v-else 
        :items="watchListTxNotLoaded"
      />
    </div>


  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as async from '@/utils/async'

import TxNotLoaded from '@/components/TxNotLoaded.vue'

export default {
  components: {
    TxNotLoaded,
  },
  data () {
    return {
      loading: false,
      nbDone: 0,
      secondsBeforeNext: 0,
    }
  },
  async created () {
    this.startCountdown()
  },
  methods: {
    async updateTxs () {
      this.loading = true
      this.nbDone = 0
      await async.forEach(this.watchList, async (item) => {
        await this.$store.dispatch('getTxs', item)
        this.nbDone++
      })
      this.loading = false
    },
    async startCountdown() {
      const tickTock = async () => {
        if (this.secondsBeforeNext <= 0) {
          await this.updateTxs()
          this.secondsBeforeNext = 500
        } else {
          this.secondsBeforeNext--
        }
        window.setTimeout(tickTock, 1000)
      }
      await tickTock()
    },
    formatDuration (duration) {
      let result = ''
      const hours = Math.floor(duration / 3600) % 3600;
      if (hours > 0) {
        result += hours + 'h '
      }
      const minutes = Math.floor(duration / 60) % 60;
      if (minutes > 0) {
        result += minutes + 'm '
      }
      const seconds = duration % 60;
      if (seconds > 0) {
        result += seconds + 's '
      }
      return result.trim()
    },
  },
  computed: {
    ...mapState(['watchList']),
    watchListTxNotLoaded () {
      return this.watchList.filter(i => i.txLoaded === false)
    },
  },
}
</script>

<style lang="scss" scoped>
.tx-updater {
  padding: 15px;
  margin-bottom: 10px;
  background: #2c3e50;
  font-size: 12px;
  span.info {
    margin-left: 0px;
  }
  .status {
    float: right;
    .ok {
      display: inline-block;
      width: 16px;
      height: 16px;
      border-radius: 20px;
      background: rgb(23, 94, 23);
    }
  }
}
</style>
