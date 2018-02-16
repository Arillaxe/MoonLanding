class Animator{
	constructor(animations, current, logic){
		this.animations = animations;
		this.current = animations[current];
		this.logic = logic;
		this.triggers = [];
	}

	update(vars){
		this.logic(vars);
		this.current.update(vars.deltaTime);
	}

	draw(){
		this.current.draw();
	}

	switchAnim(i){
		if(this.animations.indexOf(this.current) == i) return;
		this.current.alive = false;
		this.current = this.animations[i];
		this.current.play();
	}
}