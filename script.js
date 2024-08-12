let queries = [];
const slider = document.getElementById("length");
let length = slider.value;
console.log(length);

slider.addEventListener("input", () => {
  length = slider.value;
  console.log(length);
});


