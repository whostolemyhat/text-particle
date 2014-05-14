function Particle() {
    this.scale = 1;
    this.x = 0;
    this.y = 0;
    this.radius = 20;
    this.colour = '#000';
    this.velocityX = 0;
    this.velocityY = 0;
    this.scaleSpeed = 0.5;
    this.letter = Utility.pickLetter();
    this.age = 0;
    this.alive = true;

    this.update = function(ms) {
        // shrink
        this.scale -= this.scaleSpeed * ms / 1000;
        if(this.scale <= 0) {
            this.scale = 0;
        }

        // move away from explosion centre
        this.x += this.velocityX * ms / 1000;
        this.y += this.velocityY * ms / 1000;

        this.age += ms;
    };

    this.draw = function(ctx) {
        // translate context to particle coords
        ctx.save();
        // ctx.translate(this.x, this.y);
        // ctx.scale(this.scale, this.scale);

        // ctx.beginPath();
        // ctx.arc(0, 0, this.radius, 0, Math.PI*2, true);
        // ctx.closePath();

        // ctx.fillStyle = this.colour;
        // ctx.fill();

        ctx.fillStyle = this.colour;
        ctx.font = '16px arial';
        ctx.fillText(this.letter, this.x, this.y);
        // context.scale(3, 3);
        // context.fillText(pickLetter(), 48, 160);

        ctx.restore();
    };
}