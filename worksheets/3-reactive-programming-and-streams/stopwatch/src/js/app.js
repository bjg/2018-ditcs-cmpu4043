import { interval, fromEvent, merge } from 'rxjs';
import { mapTo } from "rxjs/operators";
import { drawClock } from "./clock";

const startButton = document.getElementById('start')
const stopButton = document.getElementById('stop')
const resetButton = document.getElementById('reset')
const splitButton = document.getElementById('split')
const digitalMinutes = document.getElementById('minutes')
const digitalSeconds = document.getElementById('seconds')
const digital10thsecond = document.getElementById('10thseconds')
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const radius = (canvas.height / 2);

let deciseconds = 0
let seconds = 0
let minutes = 0
let intervalSubscription = null

ctx.translate(radius, radius);

//interval of 0.1 seconds for deciseconds which is 1/10 of a second
const decisecond$ = interval(0.1);


const tick =  () => {
    deciseconds++

    //once decisecond reaches 100, it means a second has passed to increment seconds and sert deciseconds back to 0
    if (( (deciseconds + 1) % 100) === 0){
        deciseconds = 0
        seconds++
    }

    if ((   (seconds + 1) % 60) === 0){
        seconds = 0
        minutes++
    }

    drawClock(ctx, radius, seconds, minutes)
    updateDigitalClock()
}

const stopTimer = (() => {
    //if already subscribed then ignore
    if (!intervalSubscription) return
    intervalSubscription.unsubscribe()
    intervalSubscription = null
})

const splitTimer = (() => addToSplitList())

const startTimer = (() => {
    if (intervalSubscription) return

    tick()
    intervalSubscription = decisecond$.subscribe(() => tick() )
})

const resetTimer = (() => {
    seconds = 0
    minutes = 0
    deciseconds = 0
    drawClock(ctx, radius, seconds, minutes)
    updateDigitalClock()
    document.getElementById('splitList').innerHTML = ''
})

const addToSplitList = () => {
    const digitalTime = getTimeIn2DigitFormat()
    const div = document.createElement('div')
    div.setAttribute('class', 'split')
    const p = document.createElement('p')
    p.innerText = digitalTime.digitalMinutes + ':' + digitalTime.digitalSeconds + ':' + digitalTime.digitalDeciseconds
    div.appendChild(p)
    div.appendChild(p)
    document.getElementById('splitList').appendChild(div)
}

const getTimeIn2DigitFormat = () => {
    const decisecondsRound = Math.round(deciseconds / 10) * 10
    return {
        digitalSeconds: (seconds.toString().length === 1) ? '0' + seconds : seconds,
        digitalMinutes: (minutes.toString().length === 1) ? '0' + minutes : minutes,
        digitalDeciseconds: (decisecondsRound.toString().length === 1) ? '0' + decisecondsRound : decisecondsRound
    }
}

const updateDigitalClock = () => {
    const digitalTime = getTimeIn2DigitFormat()
    digitalSeconds.innerText = digitalTime.digitalSeconds
    digitalMinutes.innerText = digitalTime.digitalMinutes
    digital10thsecond.innerText = digitalTime.digitalDeciseconds
}

const init = () => {
    drawClock(ctx, radius, seconds, minutes)

    merge(
        fromEvent(resetButton, 'click').pipe(mapTo(resetTimer)),
        fromEvent(stopButton, 'click').pipe(mapTo(stopTimer)),
        fromEvent(startButton, 'click').pipe(mapTo(startTimer)),
        fromEvent(splitButton, 'click').pipe(mapTo(splitTimer))

    ).subscribe(action => action())
}

init()