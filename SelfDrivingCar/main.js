const carCanvas=document.getElementById("carCanvas");
const networkCanvas=document.getElementById("networkCanvas");
carCanvas.width=200;
networkCanvas.width=300;
const carCtx=carCanvas.getContext("2d");
const netCtx=networkCanvas.getContext("2d");
// Add a new road
const road=new Road(carCanvas.width/2,carCanvas.width*.9,3);
// BACK BEFORE NEURAL NETWORK
// const car=new Car(road.getLaneCenter(2),100,30,50,"AI");
const traffic=[new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2), 
new Car(road.getLaneCenter(0),-300,30,50,"DUMMY",2),
new Car(road.getLaneCenter(2),-300,30,50,"DUMMY",2),
new Car(road.getLaneCenter(0),-500,30,50,"DUMMY",2),
new Car(road.getLaneCenter(1),-500,30,50,"DUMMY",2),
new Car(road.getLaneCenter(1),-700,30,50,"DUMMY",2),
new Car(road.getLaneCenter(2),-700,30,50,"DUMMY",2)];

const n=1000;
const cars=generate(n);
let bestCar=cars[0];

function generate(n){
	let cars=[];
	for(let i=0;i<n;i++){
		cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
	} // end for
	return cars;
} // end generate

animate();

if(localStorage.getItem("bestBrain")){
	for(let i=0;i<cars.length;i++){
		cars[i].brain=JSON.parse(localStorage.getItem("bestBrain"));
		if(i!=0){
			Network.mutate(cars[i].brain,.2);
		} // end if
	} // end for
} // end if

function saveCar(){
	localStorage.setItem("bestBrain",JSON.stringify(bestCar.brain));
} // end saveCar

function discardCar(){
	localStorage.removeItem("bestBrain");
} // end discardCar

function animate(time){
	for(let i=0;i<traffic.length;i++){
		traffic[i].update(road.borders,[]);
	} // end for
	
	for(let i=0;i<cars.length;i++){
		cars[i].update(road.borders,traffic);
	} // end for
	bestCar=cars.find(c=>c.y==Math.min(...cars.map(c=>c.y)));
	
	carCanvas.height=window.innerHeight;
	networkCanvas.height=window.innerHeight;
	carCtx.save();

	carCtx.translate(0,.7*carCanvas.height-bestCar.y);

	// Draw the car and road
	road.draw(carCtx);
	
	for(let i=0;i<traffic.length;i++){
		traffic[i].draw(carCtx,"red",true);
	}
	carCtx.globalAlpha=.2;
	for(let i=0;i<cars.length;i++){
		cars[i].draw(carCtx,"blue");
	}
	carCtx.globalAlpha=1;
	bestCar.draw(carCtx,"blue",true);
	carCtx.restore();
	netCtx.lineDashOffset=-time/50;	
	Visualizer.drawNetwork(netCtx,bestCar.brain);
	requestAnimationFrame(animate);
} // end animate
