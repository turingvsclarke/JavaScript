// This is where

class Network{
	constructor(neuronCounts){
		this.levels=[];
		for(let i=0;i<neuronCounts.length-1;i++){
			// Create a layer for each layer count	
			this.levels.push(new Level(neuronCounts[i],neuronCounts[i+1]));
		} // end for
		// Update all the outputs
	} // end constructor

	static feedForward(givenInputs,network){
		let outputs=Level.feedForward(givenInputs,network.levels[0]);
		for(let i=1;i<network.levels.length;i++){
			outputs=Level.feedForward(outputs,network.levels[i]);
		} // end for
		return outputs;	
	} // end feedForward

	static mutate(network,amount=1){
		// Change all the weights of each level
		for(let i=0;i<network.levels.length;i++){
			const level=network.levels[i];
			for(let j=0;j<level.biases.length;j++){
				level.biases[j]=lerp(level.biases[j],Math.random()*2-1,amount);
			} // end for
			for(let j=0;j<level.weights.length;j++){
				for(let k=0;k<level.weights[j].length;k++){
					level.weights[j][k]=lerp(level.weights[j][k],Math.random()*2-1,amount);
				} // end for
			}
		} // end for
	} // end mutate

} // end Network

class Level{
	constructor(inputCount,outputCount){
		// We'll have an array of inputs and outputs
		this.inputs= new Array(inputCount);
		this.outputs=new Array(outputCount);
		this.biases=new Array(outputCount);
		this.weights=[];
		for(let i=0;i<inputCount;i++){
			this.weights[i]=new Array(outputCount);
		} // end for
		Level.#randomizeLevel(this);
	} // end constructor

	static #randomizeLevel(level){
		// Get the biases
		for(let i=0;i<level.biases.length;i++){
			level.biases[i]=Math.random()*2-1;
		} // end for
		// Get the weights
		for(let i=0;i<level.inputs.length;i++){
			for(let j=0;j<level.outputs.length;j++){
				level.weights[i][j]=Math.random()*2-1;
			} // end for
		} // end for
	} // end randomizeLevel

	static feedForward(givenInputs,level){
		for(let i=0;i<level.inputs.length;i++){
			level.inputs[i]=givenInputs[i];
		}
		let outputs=[];
		// Go through all the outputs, and sum all 
		for(let i=0;i<level.outputs.length;i++){
			let sum=0;
			for(let j=0;j<level.weights.length;j++){
				sum+=level.inputs[j]*level.weights[j][i];	
			} // end for

			if(sum>level.biases[i]){
				level.outputs[i]=1;
			}
			else{
				level.outputs[i]=0;
			}
		} // end for
		return level.outputs;
	} // end getOutputs
} // end class
