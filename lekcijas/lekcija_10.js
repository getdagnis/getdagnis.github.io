function myFunction(param) {
    switch(param) {
        case "test":
        return console.log("this is a test");
        break;
    }
}

let totalCosts = function(cost1, cost2, ...others) {
    let costsAdded = cost1 + cost2;

    others.forEach((valuesFromOthersArray) => {
        costsAdded += valuesFromOthersArray;
    })
    return costsAdded;
}

// create a loop that prints every second number starting from 10 and ending with 20
for (i=10;i<=20;i++) {
    if (i%2!==0) {
    console.log(i)
    }
}

// loop thru an array and print out it's content
let arrayNr = 1;
let arrayNew = ["it's", "my", "array", "item", "nr", arrayNr];
for (i=0;i<arrayNew.length;i++) {
            nrNew = arrayNew[i];
            console.log(arrayNew[i]);
}
arrayNr++;

// modify array of numbers by multiplying the numbers by itself
let numbers = [1, 3, 4, 5, 76, 4032];
for (i=0;i<numbers.length;i++) {
    numbers[i] *= numbers[i];
}
console.log(numbers);

// Declare a function that can be called even if it's defined after it is called
lastName = (uzvards) => console.log("Mans uzvārds ir " + uzvards);
userLastName = lastName("Bērziņš");
userLastName;

// define a function that can be called only after it has been declared
let onlyAfter = function iCanBeCalled() {
    return "True!";
}
iCanBeCalled();

// create an arrow function with two or more parameters
myArrow = (two, parameters, ...orMore) => console.log(two + " " + parameters + orMore.forEach);


// create a function with unknown amount of parameters
// create a function that accepts object as an parameters and reads assigns it's key/value pairs to function variables
// Use two of built in prototype functions
// Create your own prototype
// create new instance
// call a function from it