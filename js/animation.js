class Animation{
	constructor(img, tileCount, pos, offset, angle, playSpeed, repeat){
		this.img = img;
		this.tileCount = tileCount;
		this.pos = pos;
		this.offset = offset;
		this.angle = angle;
		this.playSpeed = playSpeed;
		this.repeat = repeat;
		this.frames = new Vector(this.tileCount.x, this.tileCount.y);
		this.frame = new Vector(0, 0);
		this.timeAlive = 0;
		this.alive = false;
	}

	update(deltaTime){
		this.pos.add(this.offset);
		this.timeAlive += deltaTime;
		if(this.timeAlive.toFixed(0) % this.playSpeed == 0){
			if(this.frame.x + 1 == this.frames.x){
				this.frame.x = 0;
				this.frame.y = this.frame.y + 1 == this.frames.y ? 0 : this.frame.y + 1;
				if(this.frame.y + 1 == this.frames.y){
					if(!this.repeat){
						this.alive = false;
					}else{
						this.frame.y = 0;
					}
				}
			}else{
				this.frame.x++;
			}
		}
	}

	play(){
		if(this.alive) return;
		this.alive = true;
		this.timeAlive = 0;
		this.frame = new Vector(0, 0);
	}

	draw(){
		if(!this.alive) return;
		ctx.save();
		this.pos = this.pos.rotateAround(new Vector(this.pos.x - this.offset.x, this.pos.y - this.offset.y), -this.angle);
		ctx.translate(this.pos.x, this.pos.y);
		ctx.rotate(Math.radians(this.angle));
		ctx.drawImage(this.img, (this.img.width / this.tileCount.x) * this.frame.x, (this.img.height / this.tileCount.y) * this.frame.y, this.img.width / this.tileCount.x, this.img.height / this.tileCount.y, -25, -25, 50, 50);
		ctx.restore();
	}
}