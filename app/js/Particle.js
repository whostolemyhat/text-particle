function Particle() {
    this.id = 0;
    this.scale = 1;
    this.x = 0;
    this.y = 0;
    // this.radius = 20;
    this.colour = '#000';
    this.velocityX = 0;
    this.velocityY = 0;
    this.scaleSpeed = 0.5;
    this.letter = Utility.pickLetter();
    this.changeLetterThreshold = Utility.randomNumber(20, 150);
    this.changeLetterDelta = 0;
    this.age = 0;
    this.alpha = 1;
    this.alphaDelta = 0;
    this.alive = true;

    this.update = function(ms) {
        // shrink
        // this.scale -= this.scaleSpeed * ms / 1000;
        // if(this.scale <= 0) {
        //     this.scale = 0;
        // }

        // move away from explosion centre
        this.x += this.velocityX * ms / 1000;
        this.y += this.velocityY * ms / 1000;

        this.age += ms;

        this.changeLetterDelta += ms;
        if(this.changeLetterDelta >= this.changeLetterThreshold) {
            this.letter = Utility.pickLetter();
            this.colour = Utility.alterShade(this.colour, parseFloat(Utility.randomNumber(-0.3, 0.6)).toFixed(2));
            this.changeLetterDelta = 0;
        }

        this.alphaDelta += ms;
        // TODO: magic number. Max age = 2500, fade = 0.05 so every 125ms fade slightly
        if(this.alphaDelta >= 125) {
            this.alpha -= 0.05;
            this.alphaDelta = 0;
        }
    };

    this.draw = function(ctx) {
        // translate context to particle coords
        // ctx.save();
        // ctx.translate(this.x, this.y);
        // ctx.scale(this.scale, this.scale);

        // ctx.beginPath();
        // ctx.arc(0, 0, this.radius, 0, Math.PI*2, true);
        // ctx.closePath();

        // ctx.fillStyle = this.colour;
        // ctx.fill();

        ctx.fillStyle = this.colour;
        ctx.font = 'bold 14px arial';
        ctx.globalAlpha = this.alpha;
        ctx.fillText(this.letter, this.x, this.y);
        ctx.globalAlpha = 1;
        // context.scale(3, 3);
        // context.fillText(pickLetter(), 48, 160);

        ctx.restore();
    };
}
