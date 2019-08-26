// Create a variable and assign a string to it
let myLetVar = "";

// Create a variable and assign a number to it
let myNum = 1;

// Create a variable and assign a boolean to it
let myBool = true;

// Create a variable and assign a array with 5 different items in it
let myArray = ["Reinis", true, 9, "14", ["1", 2, "3"], 0];

// Create a variable and assign a object with 2 other objects in it
let myObj = {
    name: "Reinis",
    height: "193",
    tall: true,
    face: {
        nose: "big",
        eyes: "two",
        mouth: true
    },
    skills: {
        singing: "poor",
        drawing: "disastrous",
        eating: "god-like"
    }
}

console.log("This is my object" + myObj);

// Create a declared and an anonymous function
// one returns undefined
// other one return NaN
function isDeclared(par1) {
    console.log("Declared");
    return undefined;
}

function(){
    console.log("Declared");
    return undefined;
}

// Create a function that overwrites a constant variables object value based on the variable that's passed to the function
let failedCount4 = {test:0,failed:0};
function failedAgain(newValue1, newValue2) {
    failedCount4["test"] += newValue1;
    failedCount4["failed"] += newValue2;
    console.log(failedCount4);
}


