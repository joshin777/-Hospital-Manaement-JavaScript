
class State {
    constructor() {
        this.states = [];
    }
 
    addState(state) {
        this.states.push(state);
    }
 
    clearStates() {
        this.states = [];
    }
 
    getStates() {
        return this.states;
    }
}
 
const state = new State();
export default state;