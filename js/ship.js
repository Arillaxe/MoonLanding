class Ship{
	constructor(pos, mass, fuel, gasSpeed, fuelPerSecond, maxLandSpeed, maxLandingAngle,  maxLandingDiffAngle, sprite, animator){
		this.pos = pos;
		this.mass = mass;
		this.initialFuel = fuel;
		this.fuel = fuel;
		this.acc = new Vector(0, G);	
		this.vel = new Vector(0, 0);
		this.maxVel = new Vector(100, 120);
		this.gasSpeed = gasSpeed;
		this.fuelPerSecond = fuelPerSecond;
		this.angularSpeed = 10;
		this.angle = 0;
		this.sprite = sprite;
		this.landed = false;
		this.destroyed = false;
		this.animator = animator;
		this.thursting = false;
		this.maxLandSpeed = maxLandSpeed;
		this.maxLandingAngle = maxLandingAngle;
		this.maxLandingDiffAngle = maxLandingDiffAngle;
	}

	draw(){
		this.animator.draw();
		if(!this.destroyed){
			ctx.save();
			ctx.translate(this.pos.x, this.pos.y);
			ctx.rotate(Math.radians(this.angle));
			ctx.drawImage(this.sprite, -25, -25, 50, 50);
			ctx.restore();
		}
	}

	input(){
		if(Key.isDown(Key.RIGHT) && !this.landed && this.fuel - 10  > 0){
			this.angle += this.angularSpeed * deltaTime;
			this.dm = this.fuelPerSecond * deltaTime;
			this.fuel -= this.dm;
		}else if(Key.isDown(Key.LEFT) && !this.landed && this.fuel - 10  > 0){
			this.angle += -this.angularSpeed * deltaTime;
			this.dm = this.fuelPerSecond * deltaTime;
			this.fuel -= this.dm;
		}

		if(Key.isDown(Key.UP) && this.fuel - 100 > 0){
			this.rt = this.fuelPerSecond;
			this.thursting = true;
		}else if(!Key.isDown(Key.UP) || this.fuel <= 100){
			this.rt = 0;
			this.thursting = false;
		}
	}

	physics(deltaTime){
		this.animator.update({
			landed: this.landed,
			deltaTime: deltaTime,
			pos: new Vector(this.pos.x, this.pos.y),
			angle: this.angle,
			thursting: this.thursting,
			destroyed: this.destroyed
		});
		
		if(this.landed || this.destroyed) return;
		this.dm = this.rt * deltaTime;
		this.fuel -= this.dm;
		var mg = new Vector(0, ((this.mass + this.fuel) * G));
		var ft = new Vector(0, (-this.gasSpeed * this.dm));
		ft.rotateAround(new Vector(0, 0), -this.angle);
		this.acc = new Vector(0, 0);
		this.acc.add(mg);
		this.acc.add(ft);
		this.acc.multiply(1 / (this.mass + this.fuel));

		this.vel.y = this.vel.y > this.maxVel.y ? this.maxVel.y : this.vel.y;
		this.vel.x = this.vel.x > this.maxVel.x ? this.maxVel.x : this.vel.x;
		this.vel.x = this.vel.x < -this.maxVel.x ? -this.maxVel.x : this.vel.x;

		if(this.chunk){
			var cVec = new Vector(this.chunk[0].x - this.chunk[1].x, this.chunk[0].y - this.chunk[1].y);
			this.chunkAngle = cVec.dotRet(new Vector(1, 0)) / (cVec.length());
			var dist = Math.abs(this.pos.x * (this.chunk[1].y - this.chunk[0].y) - this.pos.y * (this.chunk[1].x - this.chunk[0].x) + this.chunk[1].x * this.chunk[0].y - this.chunk[0].x * this.chunk[1].y);
			dist /= Math.sqrt((this.chunk[1].y - this.chunk[0].y) * (this.chunk[1].y - this.chunk[0].y) + (this.chunk[1].x - this.chunk[0].x) * (this.chunk[1].x - this.chunk[0].x));

			if(dist.toFixed(0) <= 32){
				if(Math.abs(this.vel.x) < this.maxLandSpeed.x && this.vel.y < this.maxLandSpeed.y && Math.degrees(Math.acos(this.chunkAngle)).toFixed(0) > 180 - this.maxLandingAngle && Math.degrees(Math.acos(this.chunkAngle)).toFixed(0) - this.angle.toFixed(0) - 180 < this.maxLandingDiffAngle){
					this.landed = true;
					return;
				}else{
					this.destroyed = true;
				}
			}
		}

		this.vel.add(this.acc.multiRet(deltaTime));
		this.pos.add(this.vel.multiRet(deltaTime));
	}

	drawHUD(){
		ctx.fillStyle = "orange";
		ctx.fillRect(10, 10, (WIDTH - 20) * (this.fuel / this.initialFuel), 20);
		ctx.fillStyle = "rgb(237, 238, 240)";
		ctx.fillRect(10, 40, 190, 90);
		ctx.fillStyle = "black";
		ctx.font = "15px Arial";
		ctx.textAlign = "start";
		ctx.fillText("Скорость: " + this.vel.x.toFixed(2) + ", " + this.vel.y.toFixed(2), 20, 60);
		ctx.fillText("Ускорение: " + this.acc.x.toFixed(2) + ", " + this.acc.y.toFixed(2), 20, 80);
		ctx.fillText("Угол: " + this.angle.toFixed(0), 20, 100);
		ctx.fillText("Масса: " + (this.mass + this.fuel).toFixed(0), 20, 120);
	}
}