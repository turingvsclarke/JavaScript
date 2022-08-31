// road.js

class Road{
	constructor(x,width,laneCount=3){
		this.left=x-width/2;
		this.right=x+width/2;
		this.width=width;
		const infinity = 1000000;
		this.top = -infinity;
		this.bottom=infinity;

		this.laneCount=laneCount
		this.laneWidth=this.width/this.laneCount;
		
		const topLeft={x:this.left,y:this.top};
		const topRight={x:this.right,y:this.top};
		const bottomLeft={x:this.left,y:this.bottom};
		const bottomRight={x:this.right,y:this.bottom};

		const borderLeft = [topLeft,bottomLeft];
		const borderRight=[topRight,bottomRight];
		this.borders = [borderLeft,borderRight];

	} // end constructor

	// getLaneCenter
	getLaneCenter(laneIndex){
		const add = Math.min(laneIndex+.5,this.laneCount-.5);
		// Find the center of the given lane
		return this.left+this.laneWidth*add;
	} // end getLaneCenter

	draw(ctx){
		// Draw the lanes of traffic
		ctx.strokeStyle='white';
		ctx.lineWidth=5;
		// Draw multiple lanes of traffic
		//***
		for(let i=1;i<this.laneCount;i++){
			// get the x coordinate of the next line
			const x=lerp(this.left,this.right,i/this.laneCount);
			if(i>0&&i<this.laneCount){
				ctx.setLineDash([10,10]);
			}
			else{
				ctx.setLineDash([]);
			}
			ctx.beginPath();
			ctx.moveTo(x,this.top);
			ctx.lineTo(x,this.bottom);
			ctx.stroke();
		} // end for

		ctx.setLineDash([]);	

		this.borders.forEach(border=>{
			ctx.beginPath();
			ctx.moveTo(border[0].x,border[0].y);
			ctx.lineTo(border[1].x,border[1].y);
			ctx.stroke();
		});
		
		//***/

		/***
		// Testing just drawing the edge lanes
		ctx.strokeStyle= 'white';
		ctx.lineWidth=5;
		ctx.beginPath();
		ctx.moveTo(this.left,this.top);
		ctx.lineTo(this.left,this.bottom);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(this.right,this.top);
		ctx.lineTo(this.right,this.bottom);
		ctx.stroke();
		***/
	} // end draw
	/***
	lerp(a,b,t){
		return a+(b-a)*t;
	} // end lerp
	***/
} // end road
