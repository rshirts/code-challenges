//This class takes in a dictionary and an array of blocks and finds all valid words.
// Constructor variables
// first: are a space delimited list of words.
// second: a multidimensional array passed to Cubes class.
const Cubes = require('./Cubes');

module.exports = class ValidateBlocks {
  constructor (dictionary, cubesArr) {
    if (!dictionary) {
      console.log('ValidateBlocks needs a space delimited text file given to constructor');
      process.exit(0);
    }
    if (!cubesArr) {
      console.log('ValidateBlocks needs a multidimensional array of characters given to the constructor')
      process.exit(0);
    }
    this.dictionary = dictionary;
    this.Cubes = new Cubes(cubesArr);
    //This is where all valid words are stored
    this.validWordsLibrary = {};
    //This will find try all word values from a given list of letters(cube faces)
    this.validateBlocks();
  }

  //This function will check to see if a word from the Cubes is a valid word
  // faces: each single array in the cubesArray
  validateBlocks() {

    let blocksToCheck = [];

    do {
      //Get array of faces
      blocksToCheck = this.Cubes.getFacesArr();
      //generate all the words from the faces.
      if(blocksToCheck) {
        this.addWordPermutations([...blocksToCheck], 0, blocksToCheck.length-1);
      }
    } while(blocksToCheck);
  }

  //Using a standard algorithim for permutations with backtracking
  addWordPermutations(wordArr, lIndex, rIndex) {
    if (lIndex === rIndex) {
      this.addWordToLibraryIfValid(wordArr.join('').toLowerCase())
    } else {
      for (let i = lIndex; i <= rIndex; i++) {
        //choose
        this.swap(wordArr, lIndex, i);
        //explore
        if (lIndex !== rIndex) {
          this.addWordPermutations([... wordArr], lIndex+1, rIndex);
        }
        //un-choose
        this.swap(wordArr, i, lIndex);
      }
    }
  }

  //array is pass by reference so just change the two values no need to return anything
  swap(array, a, b) {
    let tempValue = array[a];
    array[a] = array[b];
    array[b] = tempValue;
  }

  //check if word is in dictionary then add to new object array (map/dictionary)
  // this will prevent duplicate entries
  addWordToLibraryIfValid(word) {
    word = word.trim();
    if (this.dictionary[word]) {
      this.validWordsLibrary[word] = word;
    }
  }

  //print the key values from the library and put them in order (default is their utf-8 value)
  print() {
    let validWords = Object.values(this.validWordsLibrary).sort();
    console.log('Valid Words: ', validWords)
    console.log('Number of words found:', validWords.length);
  }
}