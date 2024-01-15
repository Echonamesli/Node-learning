const EventEmitter = require("events")

const event = new EventEmitter()

//两秒后事件被触发
setTimeout(() => {
    event.emit('play','my name is viki')
}, 2000);


event.on('play', (data)=>{
    console.log('play事件被触发了', data);
})
