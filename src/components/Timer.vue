<template>
  <div class="timer-block">
    <h2>{{ timer.title }}</h2>
    <h1>{{ formatTime }}</h1>
    <button @click="start">Restart</button>
    <button @click="pauseInterval">Pause</button>
    <button @click="triggerInterval">Continue</button>
  </div>
</template>

<script>
export default {
  name: 'timer',
  props: {
    timer: Object
  },
  data () {
    return {
      seconds: 0,
      isTimerRunning: false
    }
  },
  computed: {
    formatTime: function () {
      // Format seconds as mm:ss
      const minutes = Math.floor(this.seconds / 60)
      const seconds = this.seconds % 60
      return `${this.pad(minutes)}:${this.pad(seconds)}`
    }
  },
  methods: {
    start () {
      this.stop()
      console.trace('Starting interval')
      this.isTimerRunning = true
      this.seconds = this.timer.time
      this.triggerInterval()
    },
    triggerInterval () {
      this.pauseInterval()
      this.timerInterval = setInterval(() => {
        if (--this.seconds <= 0) {
          this.finish()
        }
      }, 1000)
    },
    finish () {
      console.trace('Finishing interval')
      this.stop()
      this.$emit('ring')
    },
    pauseInterval () {
      clearInterval(this.timerInterval)
    },
    stop () {
      console.trace('Stopping interval')
      this.isTimerRunning = false
      this.seconds = 0
      this.pauseInterval()
    },
    pad (value) {
      // Add leading zero if needed
      return value < 10 ? '0' + value : value
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
