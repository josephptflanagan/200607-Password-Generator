// Assignment code here
var charQuantity = 68;
var lowerCaseChars = false;
var upperCaseChars = false;
var numeralChars = false;
var specialChars = false;

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
    charButtonColor(lowerCaseChars, "lowerCase");
  }
  else{
    lowerCaseChars = false;
    charButtonColor(lowerCaseChars, "lowerCase");
  }
  
  buttonColor();
  console.log("lowerCaseChars: " + lowerCaseChars)
}

upperCaseFunction = function(){

  if (upperCaseChars == false){
    upperCaseChars = true;
    charButtonColor(upperCaseChars, "upperCase");
  }
  else{
    upperCaseChars = false;
    charButtonColor(upperCaseChars, "upperCase");
  }
  
  buttonColor();
  console.log("upperCaseChars: " + upperCaseChars)
}

numeralFunction = function(){
  
  if (numeralChars == false){
    numeralChars = true;
    charButtonColor(numeralChars, "numeral");
  }
  else{
    numeralChars = false;
    charButtonColor(numeralChars, "numeral");
  }

  buttonColor();
  console.log("numeralChars: " + numeralChars)
}

specialCharFunction = function(){
  
  if (specialChars == false){
    specialChars = true;
    charButtonColor(specialChars, "specialChar");
  }
  else{
    specialChars = false;
    charButtonColor(specialChars, "specialChar");
  }

  buttonColor();
  console.log("specialChars: " + specialChars)
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}



// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
