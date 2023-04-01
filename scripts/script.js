"use strict"
let timer = new Timer()
const prevTime = Time.getInstance()
const dingAudio = new Audio("res/ding.mp3")
const logger = Logger.get(window, true)
let minutesElement
let secondsElement
let startButton
let autoRepeatCheckbox
let timeoutId

window.onload = () => {
    minutesElement = document.getElementById("minutes")
    secondsElement = document.getElementById("seconds")
    startButton = document.getElementById("startButton")
    autoRepeatCheckbox = document.getElementById("autoRepeat")
    minutesElement.addEventListener("focus", () => onGainFocus(minutesElement))
    minutesElement.addEventListener("input", () => validate(minutesElement))
    minutesElement.addEventListener("focusout", () => format(minutesElement))
    secondsElement.addEventListener("focus", () => onGainFocus(secondsElement))
    secondsElement.addEventListener("input", () => validate(secondsElement))
    secondsElement.addEventListener("focusout", () => format(secondsElement))
    startButton.addEventListener("click", onClickStart)
    minutesElement.focus()
}

function validate(el) {
    if (el.value.length > el.maxLength) {
        el.value = el.value.slice(0, el.maxLength)
    }
}

function onClickStart() {
    logger.log("onClickStart")
    minutesElement.readOnly = true
    secondsElement.readOnly = true
    timer.setTime(parseInt(minutesElement.value), parseInt(secondsElement.value))
    prevTime.setTime(timer.getTime())
    timer.handler = onUpdateSecond
    timer.finishHandler = onTimerEnd
    timer.start()
    startButton.value = "Stop"
    startButton.removeEventListener("click", onClickStart)
    startButton.addEventListener("click", onClickStop)
}

function onClickStop() {
    clearTimeout(timeoutId)
    timer.stop()
    setMinutes(prevTime.minutes)
    setSeconds(prevTime.seconds)
    minutesElement.readOnly = false
    secondsElement.readOnly = false
    startButton.value = "Start"
    startButton.removeEventListener("click", onClickStop)
    startButton.addEventListener("click", onClickStart)
}

function onTimerEnd() {
    dingAudio.play()
    if (autoRepeatCheckbox.checked) {
        onClickStop()
        onClickStart()
    } else {
        timeoutId = setTimeout(onClickStop, MILLIS_PER_SECOND / 2)
    }
}

function onGainFocus(el) {
    el.select()
}

function onUpdateSecond(time) {
    setMinutes(time.minutes)
    setSeconds(time.seconds)
}

function setMinutes(minutes) {
    minutesElement.value = minutes
    format(minutesElement)
}

function setSeconds(seconds) {
    secondsElement.value = seconds
    format(secondsElement)
}

function format(element) {
    if (element.value.length === 0) {
        element.value = "00"
    } else if (element.value.length === 1) {
        element.value = "0" + element.value
    }
}