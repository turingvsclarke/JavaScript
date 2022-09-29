// car.js
// We need a car object that will live on the "road" move using arrow keys
// The car has x,y, height and width components

class Car{
	constructor(x,y,width,height,controlType,maxSpeed=5){
		this.x=x;
		this.y=y;

		// Angular orientation of our car
		this.angle=0;
		this.polygon = [];
		this.height=height;
		this.width=width;
		this.controls = new Controls(controlType);
		// Increase the x position by the speed of the car
		// Increase the y position by the speed of the car
		this.maxSpeed=maxSpeed;
		this.controlType=controlType;
		this.useBrain=this.controlType=="AI";
		this.speed = 0;
		// Fixed acceleration for the car
		this.acceleration = 1;
		// Some friction
		this.friction=.05;
		if(controlType!="DUMMY"){
			this.sensor=new Sensor(this);
			this.brain=new Network([this.sensor.rayCount,6,4]);
		}
		this.damaged=false;
	} // end constructor

	update(roadBorders,traffic){
		this.#getPolygon();
		this.#getDamages(roadBorders,traffic);
		if(!this.damaged || this.controlType=="DUMMY"){
			this.#move();	
		} // end if
		if(this.controlType!="DUMMY"){
			this.sensor.update(roadBorders,traffic);
			const offsets=this.sensor.readings.map(s=>s==null?0:1-s.offset);
			const outputs=Network.feedForward(offsets,this.brain);
			//console.log(outputs);
			if(this.useBrain){
				this.controls.left=outputs[0];
				this.controls.right=outputs[1];
				this.controls.up=outputs[2];
				this.controls.down=outputs[3];
			} // end if
		} // end if
	} // end update

	#move(){
		
		if(this.controls.up&&(this.speed<=this.maxSpeed)){
			this.speed+=this.acceleration;
		}	
		else if(this.controls.down&&(this.speed>-(this.maxSpeed)/2)){
			this.speed-=this.acceleration;
		}

		// Friction so the car eventually comes to a stop
		if(this.speed<0){
			this.speed+=this.friction;
		
		}
		
		else if(this.speed>0){
			this.speed-=this.friction;
		}
		// Stop the car completely if it's speed is less than friction
		if(Math.abs(this.speed)<this.friction){
			this.speed=0;
		}
		const flip = this.speed>=0 ? 1:-1; 	
		
		// Horizontal motion, or changes, based on an angle measured from north 
		if(this.controls.left){
			this.angle-=flip*.03;
		}
		else if(this.controls.right){
			this.angle+=flip*.03;
		}
		
		this.x+=this.speed*Math.sin(this.angle);
		this.y-=this.speed*Math.cos(this.angle);
	
	} // end move 

	#getPolygon(){
		let points=[];
		// Find the radius of the polygon
		const rad = Math.hypot(this.width/2,this.height/2);
		const polyAngle = Math.atan2(this.width,this.height);
		const p1={x:this.x+Math.sin(this.angle+polyAngle)*rad,y:this.y-Math.cos(this.angle+polyAngle)*rad};
		const p2={x:this.x+Math.sin(this.angle-polyAngle)*rad,y:this.y-Math.cos(this.angle-polyAngle)*rad};
		const p3={x:this.x+Math.sin(this.angle+polyAngle+Math.PI)*rad,y:this.y-Math.cos(this.angle+polyAngle+Math.PI)*rad};
		const p4={x:this.x+Math.sin(this.angle-polyAngle+Math.PI)*rad,y:this.y-Math.cos(this.angle-polyAngle+Math.PI)*rad};
		
		points.push(p1);
		points.push(p2);
		points.push(p3);
		points.push(p4);
		this.polygon=points;
	} // end getPolygon

	#getDamages(roadBorders,traffic){
		for(let i=0;i<roadBorders.length;i++){
			if(polyIntersection(roadBorders[i],this.polygon)){
				this.damaged=true;
			} // end if
		} // end for
		
		for(let i=0;i<traffic.length;i++){
			if(polyIntersection(traffic[i].polygon,this.polygon)){
				this.damaged=true;
			} // end if
		} // end for
	} // end getDamages

	// This function will draw a rectangle for us on a given context
	draw(ctx,color,drawSensor=false){
		ctx.fillStyle=color;
		// Check if the car should be see through or not

		if(this.damaged && this.controlType!="DUMMY"){
			ctx.fillStyle="grey";
		} // end if

		ctx.beginPath();
		ctx.moveTo(this.polygon[0].x,this.polygon[0].y);
		for(let i=1;i<this.polygon.length;i++){
			ctx.lineTo(this.polygon[i].x,this.polygon[i].y);
		} // end for
		//	ctx.closePath();
		ctx.fill();
		/****  USING A LINE METHOD
		// Save the initial canvas set up
		ctx.save()
		//Rotate the canvas about the center of the car;
		// Move the canvas to the center of the car
		ctx.translate(this.x,this.y);
		// Rotate by the angle
		ctx.rotate(this.angle);
		ctx.rect(-this.width/2,-(this.height/2),this.width,this.height);
		ctx.fill();
	
		// Restore that initial canvas setup for the next update
		ctx.restore();
		***/ 
		if(this.sensor&&drawSensor){
			this.sensor.draw(ctx);	
		}

	} // end draw

	


} // end Car
