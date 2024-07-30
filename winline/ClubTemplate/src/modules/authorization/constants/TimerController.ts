type Tkeys = 'timerId' | 'intervalId';

const clearHandlers: Record<Tkeys, (value: NodeJS.Timeout) => void> = {
  timerId: clearTimeout,
  intervalId: clearInterval,
};

export class TimerController {
    private static timers = new Map<Tkeys, NodeJS.Timeout>();

    public static setId (key: Tkeys, value: NodeJS.Timeout) {
        this.timers.set(key, value);
    }

    public static clearTimers() {
        this.timers.forEach((value, key) => {
            const funcClear = clearHandlers[key];
            funcClear(value);
        });
    }
}