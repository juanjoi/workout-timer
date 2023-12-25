<template>
  <div id="workout">
    <div v-show="progress.started">
      <div>Block {{ progress.block + 1 }} / {{ workout.blocks.length }}</div>
      <div>Repetition {{ progress.repetition + 1 }} / {{ workout.blocks[progress.block].repetitions }}</div>
      <div>Exercise {{ currentExercise }} / {{ workout.blocks[progress.block].steps.filter(step=>step.type==='exercise').length }}</div>
      <timer :timer='timer' ref="timer" @ring="onTimerRing()"></timer>
    </div>
    <div v-if="!progress.started">
      <button @click="start">Start Workout</button>
    </div>
  </div>
</template>
  
<script>
import Timer from '@/components/Timer'

export default {
  name: 'workout',
  components: {
    timer: Timer
  },
  computed: {
    currentExercise () {
      return this.workout.blocks[this.progress.block].steps
        .slice(0, this.progress.step + 1)
        .filter(step => step.type === 'exercise')
        .length
    }
  },
  data () {
    return {
      timer: {
        title: 'rest',
        time: 3
      },
      workout: {
        blocks: [
          {
            repetitions: 2,
            steps: [
              {
                type: 'exercise',
                time: 3,
                title: 'planchas'
              },
              {
                type: 'rest',
                time: 2
              },
              {
                type: 'exercise',
                time: 3,
                title: 'flexiones'
              },
              {
                type: 'rest',
                time: 2
              }
            ]
          }
        ]
      },
      progress: {
        started: false,
        block: 0,
        step: 0
      }
    }
  },
  mounted () {
  },
  methods: {
    start () {
      console.trace('Start workout')
      this.progress = {
        started: true,
        block: 0,
        repetition: 0,
        step: 0
      }
      this.startStep()
    },
    startStep: function () {
      console.trace(`Starting block ${this.progress.block}`)
      console.trace(`Staring step ${this.progress.step}`)
      let block = this.workout.blocks[this.progress.block]
      let step = block.steps[this.progress.step]
      if (step.type === 'exercise') {
        this.timer.title = step.title
        this.timer.time = step.time
      } else if (step.type === 'rest') {
        this.timer.title = 'Rest'
        this.timer.time = step.time
      }
      this.$refs.timer.start()
    },
    onTimerRing () {
      console.trace('ring')
      this.progress.step++
      if (this.progress.step < this.workout.blocks[this.progress.block].steps.length) {
        this.startStep()
      } else {
        this.progress.repetition++
        if (this.progress.repetition < this.workout.blocks[this.progress.block].repetitions) {
          this.progress.step = 0
          this.startStep()
        } else {
          this.progress.block++
          if (this.progress.block < this.workout.blocks.length) {
            this.progress.step = 0
            this.startStep()
          } else {
            this.progress = {
              started: false,
              block: 0,
              repetition: 0,
              step: 0
            }
          }
        }
      }
    }
  }
}
</script>
  
<style></style>
  