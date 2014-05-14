function ParticleSystem(ctx) {
    // begin particle system (controller)
    this.particles = [];
    this.maxAge = 1000;

    this.createExplosion = function(x, y, colour) {
        // var minSize = 3;
        // var maxSize = 18;
        var count = 20;
        var minSpeed = 70;
        var maxSpeed = 280;
        // var minScaleSpeed = 2;
        // var maxScaleSpeed = 6;
        var i = 0;

        for(var angle = 0; angle < 360; angle += Math.round(360/count)) {

            var particle = new Particle();
            particle.id = i;
            particle.x = x;
            particle.y = y;
            this.age = 0;
            // particle.radius = Utility.randomNumber(minSize, maxSize);
            particle.colour = Utility.alterShade(colour, parseFloat(Utility.randomNumber(-1, 1)).toFixed(2));
            // particle.scaleSpeed = Utility.randomNumber(minScaleSpeed, maxScaleSpeed);

            var speed = Utility.randomNumber(minSpeed, maxSpeed);
            particle.velocityX = speed * Math.cos(angle * Math.PI / 180);
            particle.velocityY = speed * Math.sin(angle * Math.PI / 180);

            this.particles.push(particle);

            i++;
        }

        console.log(this.particles);
    };

    this.update = function(frameDelay) {
        // console.log(frameDelay);
        // this.delta += frameDelay;
        // if(this.delta > this.maxAge)
        ctx.fillStyle = '#fff';
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for(var i = 0; i < this.particles.length; i++) {
            var particle = this.particles[i];
            particle.update(frameDelay);
            if(particle.age <= this.maxAge) {
                particle.draw(ctx);
            } else {
                this.particles.splice(particle.id, 1);
            }
        }

        // seem to be always one left in array which breaks everything
        if(this.particles.length < 2) {
            this.particles = [];
        }
    };
}