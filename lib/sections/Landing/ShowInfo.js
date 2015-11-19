
module.exports = function(itemToAnimate,container, containerToClick){

var f1 = require('f1');
var find = require('dom-select');
var eases = require('eases');




var isIn  = false;

var ui = new f1();
ui
// this will tell f1 what it should be animating. `item`
// will be used when defining states
.targets( {

	container:container,
  item: itemToAnimate
})
// this will tell f1 what item should look like in each state
.states( {

out: {

  item: {
    anchor: [ 0,0,0],
  },
   container: {
    height:13
  }
},

idle: {

  item: {
       anchor: [ 0,0,0]   
  },
   container: {
     height: Math.round(itemToAnimate.scrollHeight*1.1) +13
  }
}
})
// the following defines how f1 can move from state to state
.transitions( [ 
{
  from: 'out',
  to: 'idle',
  animation: { duration: 0.5, ease: eases.expoOut  }
},
{
  from: 'idle',
  to: 'out',
  animation: { duration: 0.5, ease: eases.expoOut }
}
])
// teaches f1 how to handle `item` since `item` is a dom element we'll teach this f1
// instance how to handle dom elements
.parsers({
    init: [ 
     function( states, targets) {
      console.log("init", targets, states);

    }
  ],
  update: [
    function( target, state ) {

      console.log(target.id, state.height)
        target.style.height = state.height+"px" ;
    }
  ]

})
// tell f1 what should be the initial state
.init('out');


// the following will just add mouse events to a container
// which contains #item

containerToClick.addEventListener( 'click', function() {
  if(isIn){
    isIn = false;
  	ui.go('out'); 
  	
  } else {
    isIn = true;
    ui.go('idle'); 
  }
});

// el.addEventListener( 'mouseleave', function() {

// // the following will tell f1 that it should go to the idle state
// ui.go('hide');
// });

}