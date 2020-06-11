// Assignment code here
var charQuantity = 68;
var lowerCaseChars = false;
var upperCaseChars = false;
var numeralChars = false;
var specialChars = false;

var lowerNumBool = 0;
var upperNumBool = 0;
var numNumBool = 0;
var specialNumBool = 0;

var lowerCaseCharBank = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
                         'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var upperCaseCharBank = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
                         'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var numeralCharBank = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ];
var specialCharBank = ['!', '@', '#', '$', '%', '^', '&', '*', ];

var slider = document.getElementById("charCount");
var output = document.getElementById("sliderReadout");
output.innerHTML = slider.value;

slider.oninput = function(){
  charQuantity = this.value;
  output.innerHTML = this.value;
}

var buttonColor = function(){

  if (lowerCaseChars == false && upperCaseChars == false && numeralChars == false && specialChars == false){
    document.getElementById("generate").style.background = "rgb(128,0,0)";
  }
  else{
    document.getElementById("generate").style.background = "rgb(50,204,0)";
  }

}

var charButtonColor = function(state, buttonID){
  
  if(state){
    document.getElementById(buttonID).style.background = "rgb(140, 255, 102)";
    document.getElementById(buttonID).style.color = "rgb(0, 0, 0)";
  }
  else{
    document.getElementById(buttonID).style.background = "rgb(20, 20, 57)";
    document.getElementById(buttonID).style.color = "rgb(255, 255, 255)";
  }
}

lowerCaseFunction = function(){

  if (lowerCaseChars == false){
    lowerCaseChars = true;
    lowerNumBool = 1;
    charButtonColor(lowerCaseChars, "lowerCase");
  }
  else{
    lowerCaseChars = false;
    lowerNumBool = 0;
    charButtonColor(lowerCaseChars, "lowerCase");
  }
  
  buttonColor();
  console.log("lowerCaseChars: " + lowerCaseChars)
}

upperCaseFunction = function(){

  if (upperCaseChars == false){
    upperCaseChars = true;
    upperNumBool = 1;
    charButtonColor(upperCaseChars, "upperCase");
  }
  else{
    upperCaseChars = false;
    upperNumBool = 0;
    charButtonColor(upperCaseChars, "upperCase");
  }
  
  buttonColor();
  console.log("upperCaseChars: " + upperCaseChars)
}

numeralFunction = function(){
  
  if (numeralChars == false){
    numeralChars = true;
    numNumBool = 1;
    charButtonColor(numeralChars, "numeral");
  }
  else{
    numeralChars = false;
    numNumBool = 0;
    charButtonColor(numeralChars, "numeral");
  }

  buttonColor();
  console.log("numeralChars: " + numeralChars)
}

specialCharFunction = function(){
  
  if (specialChars == false){
    specialChars = true;
    specialNumBool = 1;
    charButtonColor(specialChars, "specialChar");
  }
  else{
    specialChars = false;
    specialNumBool = 0;
    charButtonColor(specialChars, "specialChar");
  }

  buttonColor();
  console.log("specialChars: " + specialChars)
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

var randomChar = function(typeInitial){

  if(typeInitial == "L"){
    var localIndex = math.floor(math.random * lowerCaseCharBank.length)

    return lowerCaseCharBank[localIndex];
  }
  else if(typeInitial == "U"){
    var localIndex = math.floor(math.random * upperCaseCharBank.length)

    return upperCaseCharBank[localIndex];
  }
  else if(typeInitial == "N"){
    var localIndex = math.floor(math.random * numeralCharBank.length)

    return numeralCharBank[localIndex];
  }
  else{
    var localIndex = math.floor(math.random * specialCharBank.length)

    return specialCharBank[localIndex];
  }
}

var charAvailability = function(){

  return lowerNumBool * lowerCaseCharBank.length + upperNumBool * upperCaseCharBank.length + numNumBool * numeralCharBank.length + specialNumBool * specialCharBank.length;

}

var typeAvailability = function(){

  var localArray = [];

  if (lowerCaseChars == true){
    localArray.push('L');
  }

  if(upperCaseChars == true){
    localArray.push('U');
  }

  if(numeralChars == true){
    localArray.push('N');
  }

  if(specialChars == true){
    localArray.push('S');
  }

  return localArray;

}

//Determine the mins and maxes for each char type based on autorized types and individual type counts compared to summed count of authorized chars
var desiredProportions = function(){
  
  var minMaxArray = [];
  var min = 0;
  var typeArray = typeAvailability();

  for (i=0;i<typeArray.length;i++){
    
    if(typeArray.indexOf('L') != -1){
      minMaxArray.push(min);
      min += 26;
      minMaxArray.push(min-1);
    }

    if(typeArray.indexOf('U') != -1){
      minMaxArray.push(min);
      min += 26;
      minMaxArray.push(min-1);
    }

    if(typeArray.indexOf('N') != -1){
      minMaxArray.push(min);
      min += 10;
      minMaxArray.push(min-1);
    }

    if(typeArray.indexOf('S') != -1){
      minMaxArray.push(min);
      min += 8;
      minMaxArray.push(min-1);
    }

  }





}

//using predetermined mins, maxes, and an index, find and return a specific char to add to the password
var charChoice = function(localIndex){

  var minMax = desiredProportions();

}
var generatePassword = function(){
  var generatedPassword = "";



  for(i=0;i<charQuantity;i++){
    var index = Math.floor(Math.random * charAvailability());

    charChoice(index);
  }
  



}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}



// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
