export default class DebounceTimer {
    private timerId: NodeJS.Timeout | null = null;

    constructor(private delay: number) {}

    debounce(callback: () => void) {
        if (this.timerId !== null) {
            clearTimeout(this.timerId);
        }

        this.timerId = setTimeout(callback, this.delay);
    }

    cancel() {
        if (this.timerId !== null) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
    }
}