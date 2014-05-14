function ParticleSystem(ctx) {
    // begin particle system (controller)
    this.particles = [];

    this.createExplosion = function(x, y, colour) {
        var minSize = 3;
        var maxSize = 18;
        var count = 20;
        var minSpeed = 70;
        var maxSpeed = 280;
        var minScaleSpeed = 2;
        var maxScaleSpeed = 6;
        var maxAge = 250;

        for(var angle = 0; angle < 360; angle += Math.round(360/count)) {
            var particle = new Particle();
            particle.x = x;
            particle.y = y;
            particle.radius = Utility.randomNumber(minSize, maxSize);
            particle.colour = Utility.alterShade(colour, parseFloat(Utility.randomNumber(-1, 1)).toFixed(2));
            particle.scaleSpeed = Utility.randomNumber(minScaleSpeed, maxScaleSpeed);

            var speed = Utility.randomNumber(minSpeed, maxSpeed);
            particle.velocityX = speed * Math.cos(angle * Math.PI / 180);
            particle.velocityY = speed * Math.sin(angle * Math.PI / 180);

            this.particles.push(particle);
        }

        console.log(this.particles);
    };

    this.update = function(frameDelay) {
        ctx.fillStyle = '#fff';
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for(var i = 0; i < this.particles.length; i++) {
            var particle = this.particles[i];
            particle.update(frameDelay);
            if(particle.age < this.maxAge) {
            }
            particle.draw(ctx);
        }
    };
}