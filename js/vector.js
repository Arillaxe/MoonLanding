class Vector{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	inverse(){
		return new Vector(-this.x, -this.y);
	}

	length(){
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	add(vec){
		this.x += vec.x;
		this.y += vec.y;
	}

	multiply(m){
		this.x *= m
		this.y *= m;
	}

	normalize(){
		return new Vector(this.x / this.length(), this.y / this.length());
	}

	multiRet(m){
		return new Vector(this.x * m, this.y * m);
	}

	dotRet(m){
		return this.x * m.x + this.y * m.y;
	}

	rotateAround(point, angle){
		var radians = (Math.PI / 180) * angle;
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var nx = (cos * (this.x - point.x)) + (sin * (this.y - point.y)) + point.x;
        var ny = (cos * (this.y - point.y)) - (sin * (this.x - point.x)) + point.y;

        this.x = nx;
        this.y = ny;

        return this;
	}
}