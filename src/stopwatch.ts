import { setStorageItem, getStorageItem } from './storage';

export enum StopwatchState {
    on,
    off
  }

export class Stopwatch {
    private startTime: number;
    private accruedTimeDelta: number;
    private state: StopwatchState;
    
    /**
     * @param startTime - the absolute time (ms) that the timer was last started
     * @param accruedTimeDelta - the total time (ms) that had accrued before the timer was last started
     * @param state - the (on/off) state of the stopwatch
     */
    private constructor(startTime = 0, accruedTimeDelta = 0, state: StopwatchState = StopwatchState.off) {
        this.startTime = startTime;                 //stores the time the stopwatch entered the on state (irrevelant when off)
        this.accruedTimeDelta = accruedTimeDelta;  //stores the total time that was previously present on the stopwatch (prior to most recent start)
        this.state = state;
    }

    /**
     * updates the stopwatch's state in storage: to be done whenever the stopwatch is modified
     */
    private updateStorage() {
        setStorageItem('stopwatch', this);
    }

    /**
     * switches the stopwatch state to on
     */
    public start(): void {
        if (this.state == StopwatchState.off) {
            this.startTime = Date.now();
            this.state = StopwatchState.on;
            this.updateStorage();
        }
    }
    
    /**
     * switches the stopwatch state to off
     */
    public stop(): void {
        if (this.state == StopwatchState.on) {
            this.accruedTimeDelta = this.getElapsedTime();
            this.startTime = 0;
            this.state = StopwatchState.off;
            this.updateStorage();
        }
    }

    /**
     * resets the stopwatch time to 0 and the state to off
     */
    public reset(): void {
        this.startTime = 0;
        this.accruedTimeDelta = 0;
        this.state = StopwatchState.off;
        this.updateStorage();
    }

    /**
     * 
     * @returns the total time that the stopwatch has spent in the on state
     */
    public getElapsedTime(): number {
        if (this.state === StopwatchState.on) {
            return this.accruedTimeDelta + Date.now() - this.startTime;
        }
        else {
            return this.accruedTimeDelta;
        }
    }

    /**
     * 
     * @returns the current state of the stopwatch
     */
    public getState(): StopwatchState {
        return this.state;
    }

    // create a new instance of a stopwatch object from a general javascript object
    static fromObj(obj : Stopwatch): Stopwatch {
        return new Stopwatch(obj.startTime, obj.accruedTimeDelta, obj.state);
    }
    
    static initStopwatch(): Stopwatch {
        const stopwatch: Stopwatch = new Stopwatch();
        setStorageItem('stopwatch', stopwatch);
        return stopwatch;
    }

    static async getStopwatch(): Promise<Stopwatch> {
        const stopwatchObj = await getStorageItem('stopwatch');
        return Stopwatch.fromObj(stopwatchObj);
    }
}