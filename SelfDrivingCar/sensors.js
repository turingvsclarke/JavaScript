class Sensor{
	constructor(car){
		this.car=car;
		this.rayCount=3;
		this.raySpread = Math.PI/2;
		this.rayLength = 100;
		
		this.rays = [];
		this.readings = [];
	} // end constructor

	update(roadBorders,traffic){
		this.#generateRays();
		this.readings=[];
		for(let i=0;i<this.rayCount;i++){
			this.readings.push(this.getReading(this.rays[i],roadBorders,traffic));
		} // end for
		
	} // end update

	#generateRays(){
		this.rays=[];
		for(let i=0;i<this.rayCount;i++){
			const rayAngle=lerp(-this.raySpread/2,this.raySpread/2,this.rayCount==1?.5:i/(this.rayCount-1))+this.car.angle;
			const start = {x:this.car.x,y:this.car.y};
			const end = {x:this.car.x+Math.sin(rayAngle)*this.rayLength,y:this.car.y-Math.cos(rayAngle)*this.rayLength};
			this.rays.push([start,end]);
		}
	} // end #generateRays

	getReading(ray,roadBorders,traffic){
		let intersections=[];
		for(let i=0;i<roadBorders.length;i++){
			let touch=intersection(ray[0],ray[1],roadBorders[i][0],roadBorders[i][1]);
			if(touch){
				intersections.push(touch);
			} // end if
		} // end for

		for(let i=0;i<traffic.length;i++){
			const poly=traffic[i].polygon;
			for(let j=0;j<poly.length;j++){
				let touch=intersection(ray[0],ray[1],poly[j],poly[(j+1)%poly.length]);
				if(touch){
					intersections.push(touch);
				} // end if
			} // end for
		} // end for
		if(intersections.length==0){
			return null;
		} // end if
		else{
			const offsets=intersections.map(e=>e.offset);
			// Find the smallest offset and the corresponding
			const minOffSet=Math.min(...offsets);
			return intersections.find(e=>e.offset==minOffSet);
		} // end else
	} // end getReading

	draw(ctx){
		// Draw each ray
		for(let i=0;i<this.rayCount;i++){
			let end=this.rays[i][1];
			if(this.readings[i]){
				end=this.readings[i];	
			} 

			// Drawing all the rays
			ctx.beginPath();
			ctx.strokeStyle='yellow';
			ctx.lineWidth=2;
			ctx.moveTo(this.rays[i][0].x,this.rays[i][0].y);	
			ctx.lineTo(this.rays[i][1].x,this.rays[i][1].y);
			ctx.stroke();
			
			// Drawing all the places that are "hidden" by a border
			ctx.beginPath();
			ctx.strokeStyle='black';
			ctx.lineWidth=2;
			ctx.moveTo(end.x,end.y);	
			ctx.lineTo(this.rays[i][1].x,this.rays[i][1].y);
			ctx.stroke();
		} // end for
	} // end draw
	
} // end Sensors

