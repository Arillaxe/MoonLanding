function getGround(n, width, min, max){
  var p = [];
  for(var i = 0; i < n; i++){
    p.push(new Vector((width / n) * i, Math.random() > 0.5 ? getRandomInt(min, max) : getRandomInt(min, getRandomInt(max - (max / 4), max + (max / 4)))));
  }
  p.push(new Vector(width, getRandomInt(min, max)));
  return p;
}

function drawGround(ctx, g, x){
	ctx.strokeStyle = "darkgrey";
	ctx.lineWidth = 10;
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(g[0].x, g[0].y)
	for(var i = 1; i < g.length; ++i){
	  ctx.lineTo(g[i].x, g[i].y);
	}
	ctx.stroke();
	ctx.lineTo(WIDTH, HEIGHT);
	ctx.lineTo(0, HEIGHT);
	ctx.clip();
	ctx.fillStyle = "grey";
	ctx.fillRect(0, 0, WIDTH, HEIGHT);
	ctx.restore();
	var chunk = getCurrentChunk(x, g);
	if(debug){
		ctx.lineWidth = 5;
		ctx.strokeStyle = "red";
		ctx.beginPath();
		ctx.moveTo(chunk[0].x, chunk[0].y);
		ctx.lineTo(chunk[1].x, chunk[1].y);
		ctx.stroke();
	}
	return chunk;
}

function getCurrentChunk(x, g){
	for(var i = 0; i < g.length - 1; ++i){
		if(x > g[i].x && x <= g[i + 1].x){
			return [g[i], g[i + 1]];
		}
	}
}