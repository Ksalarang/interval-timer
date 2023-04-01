class Logger {
    constructor(tag, enabled) {
        this.tag = tag
        this.enabled = enabled
    }

    static get(object, enabled) {
        return new Logger(object.constructor.name, enabled)
    }

    log(message) {
        if (this.enabled) {
            console.log(`${this.tag}: ${message}`)
        }
    }

    warn(message) {
        console.warn(`${this.tag}: ${message}`)
    }

    error(message) {
        console.error(`${this.tag}: ${message}`)
    }
}