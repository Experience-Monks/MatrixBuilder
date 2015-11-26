
module.exports = function(button){

var f1 = require('f1');
var eases = require('eases');


console.log(button);

var ui = new f1();
ui
// this will tell f1 what it should be animating. `item`
// will be used when defining states
.targets( {

	 item: button
})
// this will tell f1 what item should look like in each state
.states( {

out: {

  item: {
     color: [164, 164, 164, 1]
  }
},

over: {

  item: {
        color: [255, 255, 255, 1]
  }
}
})
// the following defines how f1 can move from state to state
.transitions( [ 
{
  from: 'out',
  to: 'over',
  animation: { duration: 0.25, ease: eases.expoOut  }
},
{
  from: 'over',
  to: 'out',
  animation: { duration: 0.25, ease: eases.expoOut }
}
])
// teaches f1 how to handle `item` since `item` is a dom element we'll teach this f1
// instance how to handle dom elements
.parsers(require( 'f1-dom' ))
// tell f1 what should be the initial state
.init('out');


// the following will just add mouse events to a container
// which contains #item

button.addEventListener( 'mouseleave', function() {
  
  	ui.go('out'); 
  	
});

button.addEventListener( 'mouseenter', function() {

    ui.go('over'); 
  
});

return ui;
// el.addEventListener( 'mouseleave', function() {

// // the following will tell f1 that it should go to the idle state
// ui.go('hide');
// });

}