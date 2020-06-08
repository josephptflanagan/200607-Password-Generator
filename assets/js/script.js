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

lowerCaseFunction = function(){
  var checkBox = document.getElementById("lowerCase");

  if (checkBox.checked == true){
    lowerCaseChars = true;
  }
  else{
    lowerCaseChars = false;
  }
  buttonColor();
  console.log("lowerCaseChars: " + lowerCaseChars)
}

upperCaseFunction = function(){
  var checkBox = document.getElementById("upperCase");
  if (checkBox.checked == true){
    upperCaseChars = true;
  }
  else{
    upperCaseChars = false;
  }
  buttonColor();
  console.log("upperCaseChars: " + upperCaseChars)
}

numeralFunction = function(){
  var checkBox = document.getElementById("numerals");
  if (checkBox.checked == true){
    numeralChars = true;
  }
  else{
    numeralChars = false;
  }
  buttonColor();
  console.log("numeralChars: " + numeralChars)
}

specialCharFunction = function(){
  var checkBox = document.getElementById("specialChar");
  if (checkBox.checked == true){
    specialChars = true;
  }
  else{
    specialChars = false;
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
