// request-promise is being used to get the http document.
// website at https://github.com/request/request-promise
const rp = require('request-promise');

// async.js used to make the foreach async
// website found at https://github.com/caolan/async/blob/v1.5.2/README.md#each
const as = require('async.js');

const ValidateBlocks = require('./ValidateBlocks');

// The url we will be using to request the dictionary information.
const requestURL =
  'https://raw.githubusercontent.com/dolph/dictionary/master/enable1.txt';

// This contains all the words we will test our guesses against.
const dictionary = {};

//This is the mapping of all cubes and their values
// const cubesValues = [['Z',,], ['O','O'], ['O','O']];
// const cubesValues = [['O','O','O','O','O','O'], ['Z','Z','Z','Z',,], ['O','O','O','O','O','O']];
// const cubesValues = [['A','D'], ['B','E',], ['C','F']];
// const cubesValues = [['A'], ['B'], ['']];
// const cubesValues = [['n'], ['o'], ['b'], ['']];

// const cubesValues = [['5','4',], ['3','2'], ['1','']];
// const cubesValues = [ ['1','2'], ['3',,]];
// const cubesValues = [ ['1','2']];

const cubesValues = [['H','L','S','J','U','B'],
['O','O','N','O','S','O'],
['M','V','O','Y','A','O'],
['E','E','W','' ,'' ,'' ]]

// Populate the dictionary from default source can supply another if needed.
const initialize = async (textURL = requestURL) => {
  // Store the initial array.
  let tempArr = [];
  // fetch the string of valid words from source
  await rp(textURL)
    .then((allTheWords) => {
      tempArr = allTheWords.split('\n');
    })
    .catch((err) => {
      console.log(err);
    });
  // Take each word and create a map value with it.
  // since I know the dictionary is full of unique values
  // I decided not to make the keys a hash to save precious ms
  // if there was a chance they wouldn't be unique I would hash the
  // keys with a module like 'string-hash'
  console.log('Starting population of dictionary');
  as.each(
    tempArr,
    (el, callback) => {
      dictionary[el] = el;
      callback();
    },
    (err) => {
      if (err) {
        console.log('Dictionary was not populated');
      } else {
        console.log('Dictionary population completed');
      }
    }
  );
};



// using an iife just so I can use async/await
(async () => {
  await initialize();
  let words = new ValidateBlocks(dictionary, cubesValues)
  // console.log(dictionary['zyzzyvasss']);
  words.print();
})();
