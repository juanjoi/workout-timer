<template>
  <div class="timer-block">
    <h1>{{ name }}</h1>
    <timer :initialSeconds="time"></timer>
  </div>
</template>

<script>
export default {
  name: 'exercise',
  data() {
    return {
        name: 'Exercise',
        time: 30,
    }
  },
  mounted(){
    this.startTimer
  },
  methods: {
    startTimer: function () {    },
    stopTimer: function () {    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
