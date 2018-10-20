module.exports = class Cubes {
  constructor(cubes) {
    this.cubes = cubes;
    this.numCubes = cubes.length;
    //since examples of each cube in cubes array all had the same length
    // going to assume cubes look alike (same ammout of sides)
    this.numSides = cubes[0].length;
    this.cubeCounter = this.createCubeCounter();
    console.log(this.cubeCounter);
  }

  //This creates the array which we will use as our base(sides) counter to
  // iterate through all the possible instances of a word.
  createCubeCounter() {
    let tempCounter = [];
    for (let i = 0; i < this.cubes.length; i++) {
      tempCounter.push([
        this.numSides
      ]);
    }
    return tempCounter;
  }

  //return a word and decrament counter
  getWordArr() {
    // let letter = numCubes;
    let tempWordArr = [];
    for (let cube = (this.numCubes - 1); cube >= 0; cube--) {
      let tempCube = this.cubes[cube];
      let faceToCheck = (this.cubeCounter[cube][0] - 1);
      let letter = tempCube[faceToCheck];
      (!letter) ? letter = ' ' : null;
      //could use pop but figure'd just keep the word in the same order.
      tempWordArr.unshift(letter);
    }
    console.log(tempWordArr);
    return tempWordArr;
  }

  //decrament the counter return -1 when no more words left.
  decramentCounter () {

  }
};
