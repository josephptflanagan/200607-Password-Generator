//starting point for charQuantity slider
var charQuantity = 68;

var lowerCase = {
  numBool : 0,
  charBank : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  bankLength : 26,
  inUse : 0,
  buttonID : "lowerCase" 
};

var upperCase = {
  numBool : 0,
  charBank : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  bankLength : 26,
  inUse : 0,
  buttonID : "upperCase"
};

var numeral = {
  numBool : 0,
  charBank : ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ],
  bankLength : 10,
  inUse : 0,
  buttonID : "numeral"  
};

var special = {
  numBool : 0,
  charBank : ['!', '@', '#', '$', '%', '^', '&', '*', ],
  bankLength : 8,
  inUse : 0,
  buttonID : "special"
};

var objArray = [lowerCase, upperCase, numeral, special];

// Get references
var generateBtn = document.querySelector("#generate");
var slider = document.getElementById("charCount");
var output = document.getElementById("sliderReadout");
output.innerHTML = slider.value;

slider.oninput = function(){
  charQuantity = this.value;
  output.innerHTML = this.value;
};

//updates the generate button color
var generateButtonColor = function(){

  if (lowerCase.numBool === 0 && upperCase.numBool === 0 && numeral.numBool === 0 && special.numBool === 0){
    document.getElementById("generate").className = "btn";
  }
  else{
    document.getElementById("generate").className = "btnActive";
  }

};
//updates char button color
var charButtonColor = function(state, buttonID){
  
  if(state === 1){
    document.getElementById(buttonID).className = "charButtonActive";
  }
  else{
    document.getElementById(buttonID).className = "charButton";
  }
};

//takes in clicks and passes on command to change button color, update char objects
buttonToggle = function(charObject){
  
  if (charObject.numBool == 0){
    charObject.numBool = 1;
  }
  else{
    charObject.numBool = 0;
  }

  charButtonColor(charObject.numBool, charObject.buttonID);
  generateButtonColor();
  console.log(charObject.buttonID + ": " + charObject.numBool)

};

//takes input from the HTML and uses it to toggle JS buttons
charButtonHandler = function(objectName){

  if(objectName === "lowerCase"){
    buttonToggle(lowerCase);
  }
  else if(objectName === "upperCase"){
    buttonToggle(upperCase);
  }
  else if(objectName === "numeral"){
    buttonToggle(numeral);
  }
  else{
    buttonToggle(special);
  }

};

//Determine the quantity of the overall bank of available characters
var charAvailability = function(){
  localSum = 0;
  for(var i = 0;i < objArray.length;i++){
    localSum += objArray[i].numBool * objArray[i].bankLength;
  }

  return localSum;

};

//provides values to influence random index generation, increase likelyhood of password to have char variety proportial to number of chars per type.
var influenceFunction = function(desired, charsRemaining){
  
  localInfluenceArray = [];
  
  for(var i = 0;i < objArray.length;i++){
    console.log("i: " + i + ", objArray[i].numBool: " + objArray[i].numBool);
    if(objArray[i].numBool === 1){
      localInfluenceArray.push((desired[i] - objArray[i].inUse)/charsRemaining);
      console.log("influence function for loop i: " + i);
      console.log("influence function for loop desired[i]: " + desired[i]);

    }
    else{
      localInfluenceArray.push(null);
    }
  }

  return localInfluenceArray;
};

//determines the proper number of char types based on their proportion to the total bank of chars
var desiredProportions = function(){
  //alert("Entered desiredProportions");
  var localArray = [];
  var availableChars = charAvailability();

  for (var i = 0;i < objArray.length;i++){
    if(objArray[i].numBool === 1){
      localArray.push(Math.ceil((objArray[i].bankLength / availableChars) * charQuantity));
      console.log("desiredProportions localArray @ index " + i + ": " + Math.ceil((objArray[i].bankLength / availableChars) * charQuantity));
    }
    else{
      localArray.push(null);
    }
  }

  return localArray;

};

//Determine the mins and maxes for each char type based on autorized types and individual type counts compared to summed count of authorized chars
var minMaxFunction = function(charsRemaining){

  var localMinMaxArray = [];
  var desiredArray = desiredProportions();
  var influence = influenceFunction(desiredArray, charsRemaining);
  var min = 0;

  for(var i = 0;i < influence.length;i++){
    console.log(influence[i]);
  }

  for (var i = 0;i < objArray.length;i++){
    
    if(objArray[i].numBool == 1){
      localMinMaxArray.push(min);
      console.log("i: " + i);
      console.log("objArray[i].bankLength: " + objArray[i].bankLength);
      console.log("influence[i]: " + influence[i]);
      console.log("Math.ceil(objArray[i].bankLength * influence[i]): " + Math.ceil(objArray[i].bankLength * influence[i]));
      min += Math.ceil(objArray[i].bankLength * influence[i]);
      console.log("current min: " + min);
      localMinMaxArray.push(min-1);
    }
    else{
      console.log("i: " + i + ", adding null values.");
      localMinMaxArray.push(null);
      localMinMaxArray.push(null);
    }
  }
  for(var i = 0;i < localMinMaxArray.length;i++){
    console.log(localMinMaxArray[i]);
  }
  return localMinMaxArray;
};

//picks the actual char from the specified bank of chars
var specificChar = function(localObj){

  var tempIndex = Math.floor(Math.random() * localObj.bankLength);
  var char = localObj.charBank[tempIndex];
  localObj.inUse += 1;

  return char;
};

//using predetermined mins, maxes, and an index, find and return a specific char to add to the password
var charChoice = function(charsRemaining){

  var char = "";
  var minMax = minMaxFunction(charsRemaining);
  var max = 0;

  for(var i = minMax.length-1;i > -1;i--){
    if (minMax[i] != null){

      if (minMax[i]>max){
        max = minMax[i]
      }
    }
  }

  var index = Math.floor((Math.random() * max) + 1);

  if(index >= minMax[0] && index <= minMax[1]){ //lowerCase
    char = specificChar(lowerCase);
  }
  else if(index >= minMax[2] && index <= minMax[3]){ //upperCase
    char = specificChar(upperCase);
  }
  else if(index >= minMax[4] && index <= minMax[5]){ //numeral
    char = specificChar(numeral);
  }
  else if(index >= minMax[6] && index <= minMax[7]){ //special
    char = specificChar(special);
  }
  else{
    charChoice(charsRemaining);
  }
  console.log("char: " + char);
  return char;

}
//uses passed chars to assemble the password
var generatePassword = function(){

  var generatedPassword = "";
  
  var charsRemaining = charQuantity;


  for(var i = 0;i < charQuantity;i++){

    generatedPassword += charChoice(charsRemaining);
    charsRemaining--;

  }
  return generatedPassword;
};

//resets char type objects and the html
var reset = function(){
  for(var i = 0; i < objArray.length;i++){
    objArray[i].inUse = 0;
    objArray[i].numBool = 0;
    charButtonColor(objArray[i].numBool, objArray[i].buttonID);
  }
  window.location.reload();
};

// Write password to the #password input
var writePassword = function() {
  
  if(lowerCase.numBool === 0 && upperCase.numBool === 0 && numeral.numBool === 0 && special.numBool === 0 ){
  
  }
  else{
    var password = generatePassword();
    window.prompt("Password: ", password);
    reset();
  }

}

