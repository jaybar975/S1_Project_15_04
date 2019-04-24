"use strict";
/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Case Problem 4


   Filename: ws_cloud.js

   Author: Justin Aybar 
   Date: 4.23.19   
   
   Function List
   =============
   
   findUnique(arr)
      Returns the unique values in the "arr" array in the form of
      a two-dimension array
      array[i][j]
      where i is the ith unique entry, array[i][0] provides the
      value of the entry and array[i][1] provides the number 
      of repetitions of that value
   
   sortByCount(a,b)
      Compare function used in a two-dimensional arrays to be sorted
      in descending order of the values in the array's 2nd column
      
   sortByWord(a, b)
      Compare function used in a two-dimensional array to be sorted
      in ascending alphabetical order of the values in the array's
      first column
   
   randomValue(minVal, maxVal)
      Returns a random integer between minVal and maxVal

*/
// This creates the window addEventListener of "load" and anonymous function
window.addEventListener("load", function () {
      // This creates a variable called wordContent equal to document getElementById of "speech" textContent, toLowerCase, and the Replace value of regular expressions
      var wordContent = document.getElementById("speech").textContent.toLowerCase().replace(/[.,\\\/#!?$%\^&\*;:{}=\-_`'"~()\d]/g, "");
      // this creates the for loop with a variable of index equal to 0, index less than stopWords dot length and index plus plus
      for (var i = 0; i < stopWords.length; i++) {
            // This creates a variable called stopWordsRE equal to new Regex Expression with regular expressions of stopWords of index
            var stopWordsRE = new RegExp(`\\b${stopWords[i]}\\b`, 'g');
            // this calls the wordContent variable of replace and calls the stopWordsRE with a empty string
            wordContent = wordContent.replace(stopWordsRE, "");
      }
      // This creates the wordContent equal to wordCount of trim 
      wordContent = wordContent.trim();
      // This creates the wordCount equal to wordContent of replace with regular expressions and a empty string
      wordContent = wordContent.replace(/\s+/g, " ");
      // This creates the variable called wordArray equal to wordCount of split with an empty string
      var wordArray = wordContent.split(" ");
      // This creates the variable called uniqueWords equal to findUnique of wordArray
      var uniqueWords = findUnique(wordArray);
      // This calls the uniqueWords variable of sort with sortByCount
      uniqueWords.sort(sortByCount);
      // This creates the for loop with a variable of index equal to uniqueWords dot length, index greater than 100, index minus minus
      for (var i = uniqueWords.length; i > 100; i--) {
            // This calls the uniqueWords variable with the pop method
            uniqueWords.pop();
      }
      // This creates a variable called minimumCount equal to uniqueWords
      var minimumCount = uniqueWords[99][1];
      // This creates a variable called top3Count equal to uniqueWords
      var top3Count = uniqueWords[2][1];
      // This sets the uniqueWords with sort of sortByWord
      uniqueWords.sort(sortByWord);
      // This creates the for loop of a variable of index equals to 0, index less than uniqueWords dot length, index plus plus
      for (var i = 0; i < uniqueWords.length; i++) {
            // This creates a variable called cloudWord equal to document of createElement of "span"
            var cloudWord = document.createElement("span");
            // This sets the cloudWord of textContent equal to uniqueWords with a index of 0
            cloudWord.textContent = uniqueWords[i][0];
            // This creates a variable called wordSize equal to 0.45 times uniqueWord index of 1 divide it by minimumCount
            var wordSize = 0.45 * (uniqueWords[i][1] / minimumCount);
            // This creates the if statement of wordSize greater than equal to 6
            if (wordSize >= 6) {
                  // This sets the wordSize equal to 6
                  wordSize = 6;
            }
            // This creates the cloudWord of style and fontSize equal to wordSize plus the element of "em"
            cloudWord.style.fontSize = wordSize + "em";
            // This creates the cloudWord of style and transform equal to "rotate" plus randomValue negative thirty degrees and positive 30 degrees plus "degrees"
            cloudWord.style.transform = "rotate(" + randomValue(-30, 30) + "deg)";
            // This creates the if statement of uniqueWords of index of 1 greater than equal to top3Count
            if (uniqueWords[i][1] >= top3Count) {
                  // This sets the cloudWord of style and color equal to red blue green to "(251, 191, 191)"
                  cloudWord.style.color = "rgb(251, 191, 191)";
                  // This sets the cloudWord of style and textShadow equal to 2 pixels, 2 pixels, and 5 pixels with a red blue green set to "(51, 51, 51)"
                  cloudWord.style.textShadow = "2px 2px 5px rgb(51, 51, 51)";
            }
            // This creates a variable called cloud equal to document of getElementById of "cloud"
            var cloud = document.getElementById("cloud");
            // This sets the cloud variable with appendChild of cloudWord
            cloud.appendChild(cloudWord);
      }

});






// From TextBook
function findUnique(arr) {
      var prevWord;
      var unique = [];
      var listNum = -1;
      arr.sort();
      for (var i = 0; i < arr.length; i++) {
            if (arr[i] !== prevWord) {
                  listNum++;
                  unique[listNum] = [];
                  unique[listNum][0] = arr[i];
                  unique[listNum][1] = 1;
            } else {
                  unique[listNum][1] = unique[listNum][1] + 1;
            }
            prevWord = arr[i];
      }

      return unique;
}

function sortByCount(a, b) {
      return b[1] - a[1];
}

function sortByWord(a, b) {
      if (a[0] < b[0]) {
            return -1;
      } else if (a[0] > b[0]) {
            return 1;
      } else {
            return 0;
      }
}

function randomValue(minVal, maxVal) {
      var interval = maxVal - minVal;
      return Math.floor(minVal + interval * Math.random());
}