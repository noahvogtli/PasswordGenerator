let queries = [];
let words = [];
const slider = document.getElementById("length");
let length = slider.value;
console.log(length);
let wordList = document.getElementById("wordList");
let wordInput = document.getElementById("wordInput");
let word = "";
let passwordBox = document.getElementById("password");

slider.addEventListener("input", () => {
  length = slider.value;
  if (length > 20) {
    length = 20;
    slider.value = 20;
  }
  if (length < 0) {
    length = 0;
    slider.value = 0;
  }
  console.log(length);
});

wordInput.addEventListener("input", () => {

  word = wordInput.value;
});


function addWord() {
  let charLength = 0;
  if (word.length == 0) {
    return;
  }
  //check if all of the words in word array length are greater than the specified length
  for (let i = 0; i < words.length; i++) 
  {
    charLength += words[i].length;
  }
  if (word.trim().length == 0) {
    alert("Please enter a valid word");
    return;
  }
  if (charLength + word.length > length) {
    alert("The total length of the words is greater than " + length + "\n\nPlease choose a shorter word or increase password length");
    return;
  }
  words.push(word);
  console.log(word);
  console.log(words);
  wordList.innerHTML += `<li>${word}</li>`;
  wordInput.value = "";
}

//make it so that it can remove individual words
function removeWord() {
  if (words.length == 0) {
    return;
  }
  words.pop();
  wordList.removeChild(wordList.lastChild);
  console.log(words);
}

async function generatePassword() {
  let randomWord = "";
  let remainingLength = length;
  let password = "";
  if (words.length > 0) {
    for (let i = 0; i < words.length; i++) {
      password += words[i];
    }
  }
  remainingLength -= password.length;
  console.log(remainingLength);
  if (remainingLength > 0 && remainingLength >= 8) {
    let firsthalf = Math.floor(remainingLength / 2);
    let secondhalf = Math.ceil(remainingLength / 2);
    randomWord = await getRandomWord(firsthalf);
    console.log(randomWord);
    randomWord = randomWord.charAt(0).toUpperCase() + randomWord.slice(1);
    password += randomWord;
    randomWord = await getRandomWord(secondhalf);
    randomWord = randomWord.charAt(0).toUpperCase() + randomWord.slice(1);
    console.log(randomWord);
    password += randomWord;
  }
  else if (remainingLength > 0) 
  {
    randomWord = await getRandomWord(remainingLength);
    randomWord = randomWord.charAt(0).toUpperCase() + randomWord.slice(1);
    console.log(randomWord);
    password += randomWord;
  }

  passwordBox.value = password;
}

function copyPassword() 
{
  passwordBox.select();
  passwordBox.setSelectionRange(0, 99999);
  document.execCommand("copy");
  if (passwordBox.value.length == 0) {
    alert("Please generate a password first");
    return;
  }
  alert("Password copied to clipboard");
}


async function getRandomWord(length) {
  try {
    const response = await fetch(`https://random-word-api.herokuapp.com/word?length=${length}`);
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("Error fetching random word:", error);
    return "";
  }
}

