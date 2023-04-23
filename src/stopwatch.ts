export enum StopwatchState {
    on,
    off
  }

export class Stopwatch {
    private startTime: number;
    private accruedTimeDelta: number;
    private state: StopwatchState;
    
    constructor() {
        this.startTime = 0;         //stores the time the stopwatch entered the on state (irrevelant when off)
        this.accruedTimeDelta = 0;  //stores the total time that was previously present on the stopwatch (prior to most recent start)
        this.state = StopwatchState.off;
    }

    public start(): void {
        if (this.state == StopwatchState.off) {
            this.startTime = Date.now();
            this.state = StopwatchState.on;
        }
    }
  
    public stop(): void {
        if (this.state == StopwatchState.on) {
            this.accruedTimeDelta = this.getElapsedTime();
            this.startTime = 0;
            this.state = StopwatchState.off;
        }
    }

    public reset(): void {
        this.startTime = 0;
        this.accruedTimeDelta = 0;
        this.state = StopwatchState.off;
    }

    public getElapsedTime(): number {
        if (this.state === StopwatchState.on) {
            return this.accruedTimeDelta + Date.now() - this.startTime;
        }
        else {
            return this.accruedTimeDelta;
        }
    }

    public getState(): StopwatchState {
        return this.state;
    }
  }