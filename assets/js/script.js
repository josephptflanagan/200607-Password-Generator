// Assignment code here
var charQuantity = 68;

var lowerCase = {
  numBool : 0,
  charBank : ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  bankLength : 26,
  inUse : 0,
  buttonID : "lowerCase",
  boolUpdate : function(boolCond){
    this.numBool = boolCond;
  } 
};

var upperCase = {
  numBool : 0,
  charBank : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  bankLength : 26,
  inUse : 0,
  buttonID : "upperCase",
  boolUpdate : function(boolCond){
    this.numBool = boolCond;
  } 
};

var numeral = {
  numBool : 0,
  charBank : ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ],
  bankLength : 10,
  inUse : 0,
  buttonID : "numeral",
  boolUpdate : function(boolCond){
    this.numBool = boolCond;
  } 
};

var special = {
  numBool : 0,
  charBank : ['!', '@', '#', '$', '%', '^', '&', '*', ],
  bankLength : 8,
  inUse : 0,
  buttonID : "special",
  boolUpdate : function(boolCond){
    this.numBool = boolCond;
  } 
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

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

var generateButtonColor = function(){

  if (lowerCase.numBool === 0 && upperCase.numBool === 0 && numeral.numBool === 0 && special.numBool === 0){
    document.getElementById("generate").className = "btn";
  }
  else{
    document.getElementById("generate").className = "btnActive";
  }

};

var charButtonColor = function(state, buttonID){
  
  if(state === 1){
    document.getElementById(buttonID).className = "charButtonActive";
  }
  else{
    document.getElementById(buttonID).className = "charButton";
  }
};

buttonToggle = function(charObject){
  
  if (charObject.numBool == 0){
    charObject.numBool = 1;
  }
  else{
    charObject.numBool = 0;
  }

  charButtonColor(charObject.numBool, charObject.buttonID);
  charObject.boolUpdate(charObject.numBool);
  generateButtonColor();
  console.log(charObject.buttonID + ": " + charObject.numBool)

};

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

var randomChar = function(typeInitial){

  if(typeInitial == "L"){
    var localIndex = math.floor(math.random * lowerCase.bankLength)

    return lowerCase.charBank[localIndex];
  }
  else if(typeInitial == "U"){
    var localIndex = math.floor(math.random * upperCase.bankLength)

    return upperCase.charBank[localIndex];
  }
  else if(typeInitial == "N"){
    var localIndex = math.floor(math.random * numeral.bankLength)

    return numeral.charBank[localIndex];
  }
  else{
    var localIndex = math.floor(math.random * special.bankLength)

    return special.charBank[localIndex];
  }
};
//Determine the quantity of the overall bank of available characters
var charAvailability = function(){
  alert("Entered charAvailability");
  localSum = 0;
  for(i=0;i<objArray.length;i++){
    localSum += objArray[i].numBool * objArray[i].bankLength;
  }
  alert("charAvailability localSum: " + localSum);
  return localSum;

};

var influenceFunction = function(desired, charsRemaining){
  alert("Entered influenceFunction, charsRemaining: " + charsRemaining);
  localInfluenceArray = [];
  
  for(i=0;i<objArray.length;i++){
    alert("entered influenceFunction for loop");
    alert("i: " + i + ", ObjArray[i].numBool: " + ObjArray[i].numBool);
    if(objArray[i].numBool === 1){
      localInfluenceArray.push((desired[i] - objArray[i].inUse)/charsRemaining);
      alert("Influence localInfluenceArray @ index " + i + ": " + (desired[i] - objArray[i].inUse)/charsRemaining);
    }
  }

  return localInfluenceArray;
};

var desiredProportions = function(){
  alert("Entered desiredProportions");
  var localArray = [];
  var availableChars = charAvailability();

  for (i=0;i<objArray.length;i++){
    if(objArray[i].numBool === 1){
      localArray.push(Math.ceil((objArray[i].bankLength / availableChars) * charQuantity));
      alert("desiredProportions localArray @ index " + i + ": " + Math.ceil((objArray[i].bankLength / availableChars) * charQuantity));
    }
  }

  return localArray;

};

//Determine the mins and maxes for each char type based on autorized types and individual type counts compared to summed count of authorized chars
var minMaxFunction = function(charsRemaining){
  alert("Entered minMaxFunction");
  var localMinMaxArray = [];
  var desiredArray = desiredProportions();
  var influence = influenceFunction(desiredArray, charsRemaining);
  var min = 0;

  for (i=0;i<objArray.length;i++){
    
    if(objArray[i].numBool == 1){
      localMinMaxArray.push(min);
      min += Math.ceil(objArray[i].bankLength * influence[i]);
      localMinMaxArray.push(min-1);
    }
    else{
      localMinMaxArray.push(null);
      localMinMaxArray.push(null);
    }
  }
  return localMinMaxArray;
};

var specificChar = function(localObj){
  var tempIndex = Math.floor((Math.round * localObj.bankLength) + 1)
  var char = localObj.charBank[tempIndex];
  return char;
};

//using predetermined mins, maxes, and an index, find and return a specific char to add to the password
var charChoice = function(charsRemaining){
  //alert("charChoice Entered, charsRemaining: " + charsRemaining);
  var char = "";
  var minMax = minMaxFunction(charsRemaining);
  var max = 0;

  for(i=minMax.length-1;i>-1;i--){
    if (minMax[i] != null){
      max = minMax[i]
    }
    else{
      alert("minMax at i: " + i);
    }
  }
  alert("charChoice max: " + max);
  var index = Math.floor((Math.random * max) + 1);
  alert("charChoice index: " + index);
  if(index >= minMax[0] && index <= minMax[1]){ //lowerCase
    char = specificChar(lowerCase);
  }
  else if(index >= minMax[2] && index <= minMax[3]){ //upperCase
    char = specificChar(upperCase);
  }
  else if(index >= minMax[4] && index <= minMax[5]){ //numeral
    char = specificChar(numeral);
  }
  else { //special
    char = specificChar(special);
  }
  return char;

}
var generatePassword = function(){
  //alert("Generate Password Entered");
  var generatedPassword = "";
  
  var charsRemaining = charQuantity;
  //alert("charsRemaining: " + charQuantity);

  for(i=0;i<charQuantity;i++){
    alert("password generation index: " + i);
    generatedPassword += charChoice(charsRemaining);
    alert("password as is: " + generatedPassword);
    charsRemaining--;
  }
  return generatedPassword;
}

// Write password to the #password input
function writePassword() {
  //alert("Generate Password Pressed");
  var password = generatePassword();
  //var passwordText = document.querySelector("#password");
  alert(password);
  //passwordText.value = password;

}

