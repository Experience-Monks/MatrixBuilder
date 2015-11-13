
module.exports = function(itemToAnimate, containerToClick){

var f1 = require('f1');
var find = require('dom-select');
var eases = require('eases');



var ui = new f1();
var container;
ui
// this will tell f1 what it should be animating. `item`
// will be used when defining states
.targets( {
	
item: itemToAnimate
})
// this will tell f1 what item should look like in each state
.states( {

out: {

  item: {

    alpha: 0, // opacity
    position: [ 0, -100, 0 ] // transform x, y, z
  }
},

idle: {

  item: {

    alpha: 1, // opacity
    position: [ 0, 0, 0 ] // transform x, y, z
  }
}
})
// the following defines how f1 can move from state to state
.transitions( [ 
{
  from: 'out',
  to: 'idle',
  animation: { duration: 3 }
},
{
  from: 'idle',
  to: 'out',
  animation: { duration: 0.5, ease: eases.expoOut }
}
])
// teaches f1 how to handle `item` since `item` is a dom element we'll teach this f1
// instance how to handle dom elements
.parsers(require( 'f1-dom' ))
// tell f1 what should be the initial state
.init('out');


// the following will just add mouse events to a container
// which contains #item
container = containerToClick // contains the item

container.addEventListener( 'click', function() {

	// the following will tell f1 that it should go to the rollover state
	ui.go('idle');
});

// el.addEventListener( 'mouseleave', function() {

// // the following will tell f1 that it should go to the idle state
// ui.go('hide');
// });

}