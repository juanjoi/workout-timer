export class Workout {
    constructor(block) {
        this._block = block;
    }
    _block;
    getBlock() { return this._block; }
}
export class Step {
    _timer;
}
export class Exercise {
    _name;
}
export class Block {
    _steps;
}

export class Timer {
    _time;
    _rest;
}