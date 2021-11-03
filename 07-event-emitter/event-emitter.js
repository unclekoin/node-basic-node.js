class EventEmitter {
  constructor() {
    this._map = new Map();
  }

  on(eventName, listener) {
    const listeners = this._map.get(eventName);

    if (listeners) {
      this._map.set(eventName, listeners.concat(listener));
    } else {   
      this._map.set(eventName, [listener]);
    }
  }

  emit(eventName, ...args) {
    const listeners = this._map.get(eventName);
    listeners.forEach((cur) => cur(...args));
  }

  removeListener(eventName, listener) {
    const listeners = this._map.get(eventName);
    this._map.set(
      eventName,
      listeners.filter((cur) => cur !== listener)
    );
  }
}

const emitter = new EventEmitter();

function someEventListener(...args) {
  console.log('some event:', ...args);
}

emitter.on('SOME_EVENT', someEventListener);
emitter.emit('SOME_EVENT', 'some', 'arguments');

emitter.removeListener('SOME_EVENT', someEventListener);
emitter.emit('SOME_EVENT', 'some', 'arguments');
