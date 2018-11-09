import {Observable} from 'rxjs/Rx'
import {mapTo, scan, startWith} from "rxjs/operators";
import {draw} from "../stopwatch/draw";

function InitFunc() {
    const interval$ = Observable.interval(100);
    const start$ = Observable.fromEvent(document.getElementById('startBtn'), 'click')
        .switchMap(() => interval$.takeUntil(stop$).takeUntil(reset$));
    const split$ = Observable.fromEvent(document.getElementById('splitBtn'), 'click');
    const reset$ = Observable.fromEvent(document.getElementById('resetBtn'), 'click');
    const stop$ = Observable.fromEvent(document.getElementById('stopBtn'), 'click');


    const counter$ = Observable.merge(
        start$.pipe(mapTo(counter => ({ value: counter.value + 1, splitNo: counter.splitNo }))),
        reset$.pipe(mapTo(counter => ({ value: 0, splitNo: 1, reset: 1 }))),
        split$.pipe(mapTo(counter => ({ value: 0, splitNo: counter.splitNo + 1 })))
    ).pipe(
        startWith({ value: Number(0), splitNo: Number(1) }),
        scan((acc, update) => update(acc))
    );

    counter$.subscribe(map => draw(map));
}

fetch()
    .then((data) => data.map((data)=> {name: data.name}))
export {InitFunc}