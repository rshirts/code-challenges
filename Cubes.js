module.exports = class Cubes {
  constructor(cubes) {
    this.cubes = cubes;
    this.numCubes = cubes.length - 1;
    this.StillMoreWords = true;
    //although all the cubes had the same number of sides
    // were going to allow for cubes of different number of faces
    this.cubeFaceCounter = this.createFaceCubeCounter();
    //just storing this so I dont have to keep recaluclating the number of size
    // each block has
    this.cubeFaceResetValues = [...this.cubeFaceCounter];
    // console.log(this.cubeFaceCounter);
  }

  //This creates the array which we will use as our base(sides) counter to
  // iterate through all the possible instances of a word.
  createFaceCubeCounter() {
    let tempCounter = [];
    for (let cube of this.cubes) {
      tempCounter.push(
        cube.length - 1
      );
    }
    return tempCounter;
  }

  //return a word and decrament counter
  getFacesArr() {
    // let letter = numCubes;
    let tempWordArr = [];
    //iterate through each cube and get a letter.
    //using traditional for loop since we are iterating over multiple arrays
    for (let cube = (this.numCubes); cube >= 0; cube--) {
      //*** Although I could refactor this to be one line I'm leaving expanded for readablity
      let tempCube = [...this.cubes[cube]];
      let faceToCheck = (this.cubeFaceCounter[cube]);
      let letter = tempCube[faceToCheck];
      //incase there is no letter use a space
      (!letter || letter === '') ? letter = ' ' : null;
      //could use pop but figure'd just keep the word in the same order.
      tempWordArr.unshift(letter);
    }
    // console.log(tempWordArr);
    // After we get the word decrament the values
    // returns true we have more words
    // returns false we have checked all words
    if (!this.StillMoreWords) {
      console.log('All Words are checked');
      return false;
    }
    if(this.decramentFaceCounter(this.numCubes)) {
      return tempWordArr;
    } else {
      this.StillMoreWords = false;
      return tempWordArr;
    }
  }

  //decrament the counter return -1 when no more words left.
  //Param: the block we are currently decramenting.
  decramentFaceCounter(blockIndex) {
    let valueToCheck = this.cubeFaceCounter[blockIndex];

    //Decrament the block
    valueToCheck -= 1;

    //last case no more words
    if (blockIndex == 0 && valueToCheck == -1 ) {
      return false;
    }
    //most used case the counter needs to be decramented
    if (this.cubeFaceCounter[0] >= 0 && valueToCheck >= 0) {
      this.cubeFaceCounter[blockIndex] = valueToCheck;
      return true;
    }
    //second case reset reset the counter and decrament the previous counter
    // if it is less than 0 and not the last block reset it and decrament the next block
    // call decramentCounter with (blockIndex - 1)
    if (this.cubeFaceCounter[0] >= 0 && valueToCheck < 0) {
      // reset the valueToCheck to it's number of faces.
      this.cubeFaceCounter[blockIndex] = this.cubeFaceResetValues[blockIndex];
      //recursivly call the function to decrament the next block.
      return(this.decramentFaceCounter(blockIndex -1));
    }
  }
};
