// Assignment code here
var charQuantity = 64;
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

lowerCaseFunction = function(){
  var checkBox = document.getElementById("lowerCase");
  if (checkBox.checked == true){
    lowerCaseChars = true;
  }
  else{
    lowerCaseChars = false;
  }
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
