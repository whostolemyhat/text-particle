/* global requestAnimFrame */
$(document).ready(function() {
    init();
});


function init() {
    var canvas;
    var context;
    var time;

    canvas = $('#canvas');
    context = canvas[0].getContext('2d');

    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;

    // var mousePos = {x: canvas.width / 2, y: canvas.height / 2 }; // default pos = centre of canvas
    // var colour = '#52ef1d';
    // var particleSystem = new ParticleSystem(context);

    // canvas.addEventListener('mousedown', function(event) {
    //     mousePos = Utility.getMouseClick(canvas, event);
    //     particleSystem.createExplosion(mousePos.x, mousePos.y, colour);
    // }, false);

    // context.fillRect(20, 20, 200, 200);

    // draw(context);
    var mousePos = {x: canvas.width / 2, y: canvas.height / 2 };
    var colour = '#7d48e0';
    var particleSystem = new ParticleSystem(context);
    
    canvas.click(function(e) {
        mousePos = Utility.getMouseClick(canvas[0], e);
        particleSystem.createExplosion(mousePos.x, mousePos.y, colour);
    });

    (function animloop(){
        requestAnimFrame(animloop);
        var now = new Date().getTime();
        var dt = now - (time || now);
        time = now;
        // update(context, dt);
        particleSystem.update(dt);
    })();
}

// function update(context, dt) {
//     context.fillStyle = '#fff';
//     context.clearRect(0, 0, context.canvas.width, context.canvas.height);

//     draw(context);
// }

// function draw(context) {

//     // draw gridlines for no reason :)
//     // drawGridlines(context);

//     // choose letter
//     // colour
//     context.fillStyle = '#000';
//     context.font = '16px arial';
//     context.fillText(Utility.pickLetter(), 248, 300);
//     context.scale(3, 3);
//     context.fillText(Utility.pickLetter(), 48, 160);
// }

// function drawGridlines(context) {
//     for(var x = 0.5; x < context.canvas.width; x += 10) {
//         context.moveTo(x, 0);
//         context.lineTo(x, context.canvas.height);
//     }

//     for(var y = 0.5; y < context.canvas.height; y += 10) {
//         context.moveTo(0, y);
//         context.lineTo(context.canvas.width, y);
//     }

//     context.strokeStyle = '#eee';
//     context.stroke();
// }

// function pickLetter() {
//     // 33 - 126
//     return String.fromCharCode(randomRange(33, 126));
// }

// // http://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
// function randomRange(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
