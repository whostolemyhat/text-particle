/* global Particle, Utility */

function ParticleSystem(ctx) {
    // begin particle system (controller)
    this.particles = [];
    this.maxAge = 2500;
    var i = 0;

    this.createExplosion = function(x, y, colour) {
        // var minSize = 3;
        // var maxSize = 18;
        var count = 40;
        var minSpeed = 70;
        var maxSpeed = 280;
        // var minScaleSpeed = 2;
        // var maxScaleSpeed = 6;
        // var i = 0;

        for(var angle = 0; angle < 360; angle += Math.round(360/count)) {
            // TODO: get from pool
            var particle = new Particle();
            // var particle = this.getParticle();
            particle.alive = true;
            particle.id = i;
            particle.x = x;
            particle.y = y;
            particle.age = 0;
            // particle.radius = Utility.randomNumber(minSize, maxSize);
            particle.colour = Utility.alterShade(colour, parseFloat(Utility.randomNumber(-1, 1)).toFixed(2));
            // particle.scaleSpeed = Utility.randomNumber(minScaleSpeed, maxScaleSpeed);

            var speed = Utility.randomNumber(minSpeed, maxSpeed);
            particle.velocityX = speed * Math.cos(angle * Math.PI / 180);
            particle.velocityY = speed * Math.sin(angle * Math.PI / 180);

            this.particles.push(particle);

            i++;
        }
    };

    this.update = function(frameDelay) {
        ctx.fillStyle = '#461a97';
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for(var i = 0; i < this.particles.length; i++) {
            var particle = this.particles[i];
            particle.update(frameDelay);
            if(particle.age <= this.maxAge) {
                particle.draw(ctx);
            } else {
                this.particles.splice(particle.id, 1);
                // particle.alive = false;
            }
        }

        // seem to be always one left in array which breaks everything
        if(this.particles.length < 2) {
            this.particles = [];
        }
    };

    this.getParticle = function() {
        // loop through particles
        for(var i = 0; i < this.particles.length; i++) {
            if(!this.particles[i].alive) {
                return this.particles[i];
            }
        }
        return new Particle();
        // if this is dead, return
        // else return new particle
    };
}
