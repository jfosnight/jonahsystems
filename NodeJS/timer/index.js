exports.start = function(io){
  io.on('connection', function(socket){
      socket.on('timer start', function(data){
          console.log('timer start');
          console.log(data);

          if(timers[data.id] !== undefined){
              timers[data.id].setTime(data.time);
          } else {
              timers[data.id] = new Timer(data.id, {id: data.id, time: data.time}, io);
              timers[data.id].start();
          }
      });

      socket.on('timer sync', function(data){
          //console.log('timer sync');
          if(data.id in timers){
              //console.log(timers[data.id].getTime());
              socket.emit('timer sync', {id: data.id, time: timers[data.id].getTime()});
          }
      });


      socket.on('timer stop', function(data){
          console.log('timer stop');
          console.log(data);
          //io.emit('timer time', {id: data.id, time: 0});
          if(data.id in timers){
              timers[data.id].stop();
          }
      });
  });
};


var timers = [];
var Timer = function(elem, options, io){
    var id = options.id;
    var time = options.time;
    var timer;

    function start(){
        io.emit('timer sync', {id: id, time: Number(time)});
        time--;
        timer = setInterval(tick, 1000);
    }

    function tick(){
        if(time > 0){
            time--;
        } else {
            io.emit('timer end', {id: id, time: time});
            stop();
        }
    }


    function stop(){
        time = 0;
        io.emit('timer sync', {id: id, time: time});
        clearInterval(timer);
    }

    function getTime(){
        return time;
    }

    function setTime(t){
        clearInterval(timer);
        time = t;
        start();
    }

    this.start = start;
    this.stop = stop;
    this.getTime = getTime;
    this.setTime = setTime;
};


function startTimer(id, time){
    io.emit('timer time', {id: id, time: time});
}
