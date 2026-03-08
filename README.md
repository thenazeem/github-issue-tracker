## What is the difference between var, let, and const?

***Ans:***

var, let, and const are used to declare variables in JavaScript.

- **var →** It is the old way of declaring variables. It has function scope and can be redeclared.
- **let →** Introduced in ES6. It has block scope and cannot be redeclared in the same scope.
- **const →** Also block scoped, but its value cannot be changed after assignment.

In simple terms:
var is old, let can change, and const cannot change.



## What is the spread operator (...)?

***Ans:***

The spread operator (...) is used to expand the elements of an array or object.

**Example:**

const numbers = [1,2,3];
const newNumbers = [...numbers,4,5];
Here ...numbers copies all elements into a new array.

It is commonly used to:
- **copy arrays**
- **merge arrays**
- **copy objects**



## What is the difference between map(), filter(), and forEach()?

***Ans:***

These three methods work with arrays, but they have different purposes.

**map()**
- **Runs a function on every element**
- **Returns a new array**

**filter()**
- **Selects elements based on a condition**
- **Returns a new filtered array**

**forEach()**
- **Loops through the array**
- **Does not return a new array**

Simple idea:
- map() → creates a new array
- filter() → selects elements
- forEach() → just loops


## What is an arrow function?

***Ans:***

An arrow function is a shorter way to write functions in JavaScript.

***Example:***

const add = (a,b) => {
return a + b;
}

It is a shorter version of a normal function.

Arrow functions are commonly used for:

- **short functions**
- **callback functions**



## What are template literals?

***Ans:***

Template literals are used to insert variables or expressions inside a string.

They use backticks ` ` instead of quotes.

***Example:****

const name = "Nazeem";

console.log(`Hello ${name}`);


${} is used to insert variables into the string.
