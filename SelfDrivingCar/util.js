// util .js


function lerp(a,b,t){
	return a+(b-a)*t;
} // end lerp

function intersection(p1,p2,q1,q2){
	/****** USING LAME SECOND GRADE MATH
	// Find out if p1p2 and q1q2 are intersecting segments
	const m1 = (p2.y-p1.y)/(p2.x-p1.x);
	const m2 = (q2.y-q1.y)/(q2.x-q1.x);
	const b1=p1.y-m1*p1.x;
	const b2=q1.y-m2*q1.x;

	console.log("y="+m1+"x+"+b1);
	console.log("y="+m2+"x+"+b2);

	// Find the possible intersection of the two lines
	let x=(b2-b1)/(m1-m2);
	let y=m1*x+b1;

	

	// Check that the intersection is between the two points 
	if(!(Math.min(q1.x,q2.y)<=y<=Math.max(q1.y,q2.y)&&Math.min(p1.x,p2.x)<=y<=Math.max(p1.y,p2.y))){		
		let x=null;
		let y=null;
	} // end if
	******/
	
	const t_top=(q2.y-q1.y)*(p1.x-q1.x)-(q2.x-q1.x)*(p1.y-q1.y);
	const t_bot = (p2.y-p1.y)*(q2.x-q1.x)-(p2.x-p1.x)*(q2.y-q1.y);
	const u_top = (q1.y-p1.y)*(p2.x-p1.x)-(q1.x-p1.x)*(p2.y-p1.y);

	if(t_bot!=0){
		const t=t_top/t_bot;
		const u=u_top/t_bot;
		if(t>=0&&t<=1&&u>=0&&u<=1){
			return {
				x:lerp(p1.x,p2.x,t),
				y:lerp(p1.y,p2.y,t),
				offset:t
			}; // end return 
		} // end if
	} // end if 

	return null; 
} // end intersection


function polyIntersection(poly1,poly2){
	// Check all the points in both polygons to look for an intersection
	for(let i=0;i<poly1.length;i++){
		for(let j=0;j<poly2.length;j++){
			// Check for intersection between the lines
			const touch = intersection(poly1[i],poly1[(i+1)%poly1.length],poly2[j],poly2[(j+1)%poly2.length]);
			if(touch){
				return true;
			}
		} // end for
	} // end for

	return false;
} // end polyIntersection

