# Password Generator

## Github Repository
https://github.com/josephptflanagan/200607-Password-Generator

## Site URL
https://josephptflanagan.github.io/200607-Password-Generator/

## Screenshot
https://github.com/josephptflanagan/200607-Password-Generator/blob/master/assets/img/screenshot.jpg

### I didn't quite follow the exact instructions:
As stated above, I kind of went my own way on this, and I hope that's not a big deal. I made this a single page interface rather than a series of prompts because I wanted to get better with CSS. This is still fully capable of generating an 8-128 character password with lower case, upper case, numeric and special characters, I just used a slider for the character count and buttons for the character types.

### Inside the script works like this:
1. The Character Slider has a min of 8 and a max of 128, with a default halfway value of 68. when the slider moves, it both updates the character count and the text indicator of the value currently selected.

2. When clicked, the char buttons (Lower Case, Upper Case, Numerals, Special Characters) send messages to the button toggle function, which in both turns the numBool(numeric boolean) attribute of the correspoding character object on or off. This change then effects both the ability to press the password generate button (at least one char type must be turned on), and triggers the btnActivated CSS class, changing the color of the button clicked.

3. When the Generate Password Button is clicked, it initiates the writePassword function (there is a check at the start of this function, ensuring that at least one charButton has been pressed). 

4. The generatePassword function is then initiated. This function contains the controlling for loop that both calls for characters, and assembles the password. 

5. When calling for characters, it initiates the charChoice function. This function randomly chooses the character to send back to the generatePassword function, but it relies of information obtained in the minMaxFunction.

6. Once initiated, the minMaxFunction determines the ranges of values that will be assigned as targets for the random generation function in the charCoice function. These determinations are based off of two things: the desired proportion of each character type, based on the size of that character bank, and an influencing variable that attempts to dynamically guide the random generation toward the most diverse set of characters for the password.

7. The desired proportion is based on the number of characters of each allowed type, compared to the overall number of characters of the allowed types (e.g. there are 26 lower case characters, 26 upper case characters, 10 numerals, and 8 special characters. If all character types are allowed, the desired proportion of lower case characters in the final password is 26 / 70 * character count vs. if only lower case and numerals are allowed, the final password should have 26 / 36 * character count lower case characters). The desiredProportions function creates an array of the desired number of characters for each type, creating an identically sized array each time by filling unused slots with null values that keep indices of each type in the same spot. it then passes that array back to the minMaxFunction.

8. To ensure the password contains the best proportional relationship by character, the influence array is created within the infulenceFunction. This function compares the existing number of each type of character to the number found in the desired outcome as provided by the desiredProportion function. As the number of instances of a type of character increases, the influence variable decreases the chance that that character type will be chosen again. Each influencing amount is pushed into an influenceArray, and passed back to the minMaxFunction. This function changes the influenceArray with each character generation, dynamically altering the random generation. 

9. With the desired proportion and influence arrays in hand, the minMaxFunction creates an array of min and max values to serve as the end points of ranges for each allowed character type. As with previous functions, without a character type this function fills in spaces with null, maintaining index locations. This array is then passed back to the charChoice function. 

10. With the locations of the end points of each allowed character, the charChoice function generates a character that should fall within the over min and max of the total range of acceptable values. This index determines which character type the next character added to the password. Should for some reason the index not lie in the proper range, it runs again without reducing the overall number of characters in the password. With a proper index, the specificChar function is initiated. 

11. This function is passed the object that will provide the character for the password. A new random number generator then generates an index that corresponds to specific characters of the passed object. The object then updates the number of times it has been used, so as to allow the influence function to work properly. The chosen character is passed back to charChoice, and finally back to generatePassword.

12. Repeat steps 5-11 as many times as is required to meet the chosen character count. This string is then passed back to writePassword, where is passes into a prompt to be read/copied by the user. 

13. the reset function is then called, reseting object attributes and HTML elements so that the program can run again.
