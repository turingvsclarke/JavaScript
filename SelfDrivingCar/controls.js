// controls.js
// We need a controls object that will handle all the arrow key manipulation of the vehicle

class Controls{
	constructor(controlType){
		this.left=false;
		this.right=false;
		this.down=false;
		this.up=false;
		switch(controlType){
			case "KEYS":
				this.#addListeners();
				break;
			case "DUMMY":
				this.up=true;
				break;
		} // end switch
	} // end constructor

	#addListeners(){
		document.onkeydown=(event)=>{
			switch(event.key){
				case "ArrowLeft":
					this.left=true;
					break;
				case "ArrowRight":
					this.right=true;
					break;
				case "ArrowDown":
					this.down=true;
					break;
				case "ArrowUp":
					this.up=true;
					break;
			} // end switch
		} // end event arrow function
		document.addEventListener("keyup",(event)=>{
		switch(event.key){    
			case "ArrowLeft":		
				this.left=false;
				break;
			case "ArrowRight":
				this.right=false;
				break;  
			case "ArrowDown":
				this.down=false;
				break;
			case "ArrowUp":
				this.up=false;
				break;
			} // end switch
		}); // end event arrow function
	} // end addListeners
} // end Car
