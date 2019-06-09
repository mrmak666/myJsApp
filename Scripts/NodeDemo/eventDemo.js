const EventEmitter= require('events');
class MyEmitter extends EventEmitter{}

// init object
const myEmitter = new MyEmitter();

// event listener
myEmitter.on('event',()=> console.log('Event Fired!'))

// Init event
myEmitter.emit('event');
myEmitter.emit('event');
myEmitter.emit('event');