<template>
  <div class="workout">
    <div v-show="progress.started">
      <div class="breadcrumbs">
        <div><p>Time</p><p>{{ formatTime(Math.floor(progress.time/1000)) }} / {{ formatTime(totalTime) }}</p></div>
        <div>
          <p>Block</p>
          <p>{{ progress.block + 1 }} / {{ workout.blocks.length }}</p>
        </div>
        <div>
          <p>Repetition</p>
          <p>{{ progress.repetition + 1 }} / {{ workout.blocks[progress.block].repetitions }}</p>
        </div>
        <div>
          <p>Exercise</p>
          <p>{{ currentExercise }} / {{ workout.blocks[progress.block].steps.filter(step=>step.type==='exercise').length }}</p>
        </div>
      </div>
      <timer class="timer" :timer='timer' ref="timer" @ring="onTimerRing()"></timer>
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
    totalTime () {
      return this.workout.blocks
        .map(block => block.repetitions * block.steps.reduce((accum, value) => accum + value.time, 0))
        .reduce((accum, value) => accum + value, 0)
    },
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
            repetitions: 1,
            steps: [
              {
                type: 'exercise',
                time: 30,
                title: 'Salto + plancha'
              },
              {
                type: 'rest',
                time: 15
              },
              {
                type: 'exercise',
                time: 30,
                title: 'TRX-Bicepts'
              },
              {
                type: 'rest',
                time: 15
              },
              {
                type: 'exercise',
                time: 30,
                title: 'Abdominales cruzados'
              },
              {
                type: 'rest',
                time: 15
              },
              {
                type: 'exercise',
                time: 30,
                title: 'TRX-Vampiro'
              },
              {
                type: 'rest',
                time: 15
              },
              {
                type: 'exercise',
                time: 30,
                title: 'TRX-Abdominales'
              },
              {
                type: 'rest',
                time: 15
              },
              {
                type: 'exercise',
                time: 30,
                title: 'TRX-Tricepts'
              },
              {
                type: 'rest',
                time: 15
              }
            ]
          }
        ]
      },
      progress: {
        started: false,
        startedTime: 0,
        time: 0,
        block: 0,
        repetitions: 0,
        step: 0
      },
      progressInterval: null
    }
  },
  mounted () {
  },
  methods: {
    start () {
      console.trace('Start workout')
      this.progress = {
        started: true,
        startedTime: Date.now(),
        time: 0,
        block: 0,
        repetition: 0,
        step: 0
      }
      this.progressInterval = setInterval(() => {
        this.progress.time = Date.now() - this.progress.startedTime
      }, 1000)
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
    formatTime: function (inputSeconds) {
      // Format seconds as mm:ss
      const minutes = Math.floor(inputSeconds / 60)
      const seconds = inputSeconds % 60
      return `${this.pad(minutes)}:${this.pad(seconds)}`
    },
    pad (value) {
      // Add leading zero if needed
      return value < 10 ? '0' + value : value
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
            clearInterval(this.progressInterval)
            this.progress = {
              started: false,
              startedTime: 0,
              time: 0,
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
  
<style>

.workout {
 margin: auto;
 padding: 0;
 text-align: center;

 h1, h2 {
  margin: 0;
 }
 
 .breadcrumbs {
   position: absolute;
   top: 0;
   left: 0;
   width: 100%;
   display: flex;
   flex-direction: row;

   >div {
    flex-grow: 1;
   }
   
   p {
     margin: 0;
    }
  }
  
  .timer {
  }
}

</style>
  