# Day 1 Summary

## Key Points

- `var`: can be redeclared and is visible outside `if` blocks.
- `let`: can be changed, but not declared again in the same scope.
- `const`: cannot be reassigned after it is set.
- Template literals: use backticks `` ` `` and `${}` to insert values into strings.
- `console.log()`: prints values to the terminal.

## Simple Examples

### `var`
```js
var city = "Mumbai";
var city = "India";
console.log(city); // India
```

### `var` block behavior
```js
if (true) {
  var tool = "playwright";
}
console.log(tool); // playwright
```

### `let`
```js
let score = 0;
score = 20;
console.log(score); // 20
```

### `const`
```js
const name = "jhon";
const city = "coimbatore";
console.log(`Name: ${name}, City: ${city}`);
```

## Short Summary

Day 1 was about JavaScript variables: `var`, `let`, `const`, and how to print values with `console.log()`.


#Day2 summary 

1. Total 7 day types available 
       
       1.string --> const testname = "Name"
       2.Number --> const timeout="3000;
       3.Boolean --> const isenable= true;
       4.Undefined --> let logresult; console.log(logresult); undefined. without value.
       5.Null   --> value assigned as null example : let apiresponse =null;
       6.Object --> const user ={username:"admin" , role:"tester"} ;
       7.Array --> const browser ["chrome","firefoxt","safari"];

2. typeof — Your Debugging Tool

// In API testing you will check types constantly
const response = {
  status:  200,
  success: true,
  message: "Login successful",
  data:    null,
  token:   "abc123xyz"
};

console.log(typeof response.status);   // number
console.log(typeof response.success);  // boolean
console.log(typeof response.message);  // string
console.log(typeof response.data);     // object ← null quirk
console.log(typeof response.token);    // string


3.Type Coercion — Common Bug Source

// JavaScript silently converts types — dangerous
console.log("5" + 5);    // "55"  ← string concat, not addition!
console.log("5" - 5);    // 0     ← converts string to number
console.log(true + 1);   // 2     ← true = 1
console.log(false + 1);  // 1     ← false = 0

// Always use === not == to avoid type coercion bugs
console.log(5 == "5");   // true  ← dangerous!
console.log(5 === "5");  // false ← safe! checks type AND value

#Day3 summary 

Array creation 

const browsers =["chrome","firfox","Edge"];
const testScores =[85,45,44,95];
const mixed=[1,"hello",true,null,{name:"test"}];


// Access by index (starts at 0)


console.log(browsers[0]); --> Chrome
console.log(browsers[2]); -->Safari
console.log(browsers[10]); -->undefined -index doesn't exist .


Array length

console.log(browsers.length);

Array methods 

const tests =["Login", "Logout", "Cart"];

push- add to end

test.push("checkout");

pop - Remove from end 

tests.pop();

shift-Remove from the START

tests.shift();

unshift- Add to START

tests.unshift("Home");

includes - check if exists

console.log(tests.include("login")); //false
console.log(tests.include("cart"));  // true 

indexOf - find position

console.log(tests.indexOf("Logout"));  1
console.log(tests.indexOf("Missing));  -1 (not found)


Join -combine into string

console.log(tests.join("->"));  //"Home->Logout->Cart"


ForEach -Loop Through Arrays

const browsers=["chrome","Firfox","Safari"];


// forEach with function

browsers.forEach(function(browser)){
  console.log("testing on:", browser);

}


// forEach with arrow function  ( modern way)

browsers.forEach(browser =>{

  console.log("Testing on:", browser)
});


//forEach with index

browsers.forEach((browser,index)=>{

  console.log(`Browser ${index}: ${browser}`);

});
