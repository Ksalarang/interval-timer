const MILLIS_PER_SECOND = 1000
const SECONDS_PER_MINUTE = 60
const MINUTES_PER_HOUR = 60
const SECONDS_PER_HOUR = MINUTES_PER_HOUR * SECONDS_PER_MINUTE

class Timer {
    secondsAmount
    time = Time.getInstance()
    handler
    finishHandler
    id
    logger = Logger.get(this, false)

    setTime(minutes, seconds) {
        this.time.set(minutes, seconds)
        this.secondsAmount = this.time.getTotalSeconds()
    }

    start() {
        this.logger.log("start")
        this.id = setInterval(() => this.countDown(this), MILLIS_PER_SECOND)
    }

    stop() {
        this.logger.log("stop")
        this.secondsAmount = 0
        clearInterval(this.id)
    }

    getTime() {
        this.time.setTotalSeconds(this.secondsAmount)
        return this.time
    }

    countDown(self) {
        if (self.secondsAmount > 0) {
            self.secondsAmount--
            self.time.setTotalSeconds(self.secondsAmount)
            self.handler(self.time)
            if (self.secondsAmount === 0) {
                clearInterval(self.id)
                self.finishHandler()
            }
        }
    }
}

class Time {
    constructor(minutes, seconds) {
        this.minutes = minutes
        this.seconds = seconds
    }

    static getInstance() {
        return new Time(0, 0)
    }

    setTotalSeconds(totalSeconds) {
        this.minutes = Math.floor(totalSeconds / SECONDS_PER_MINUTE)
        this.seconds = totalSeconds % SECONDS_PER_MINUTE
    }

    set(minutes, seconds) {
        this.minutes = minutes
        this.seconds = seconds
    }

    setTime(time) {
        this.minutes = time.minutes
        this.seconds = time.seconds
    }

    getTotalSeconds() {
        return this.minutes * SECONDS_PER_MINUTE + this.seconds
    }

    toString() {
        return `${this.minutes}m ${this.seconds}s`
    }
}