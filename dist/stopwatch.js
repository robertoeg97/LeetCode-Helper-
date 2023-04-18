"use strict";
var StopwatchState;
(function (StopwatchState) {
    StopwatchState[StopwatchState["on"] = 0] = "on";
    StopwatchState[StopwatchState["off"] = 1] = "off";
})(StopwatchState || (StopwatchState = {}));
class Stopwatch {
    constructor() {
        this.startTime = 0; //stores the time the stopwatch entered the on state (irrevelant when off)
        this.accruedTimeDelta = 0; //stores the total time that was previously present on the stopwatch (prior to most recent start)
        this.state = StopwatchState.off;
    }
    start() {
        this.startTime = Date.now();
        this.state = StopwatchState.on;
    }
    stop() {
        this.accruedTimeDelta = this.getElapsedTime();
        this.startTime = 0;
        this.state = StopwatchState.off;
    }
    reset() {
        this.startTime = 0;
        this.accruedTimeDelta = 0;
        this.state = StopwatchState.off;
    }
    getElapsedTime() {
        return this.accruedTimeDelta + Date.now() - this.startTime;
    }
    getState() {
        return this.state;
    }
}
//# sourceMappingURL=stopwatch.js.map