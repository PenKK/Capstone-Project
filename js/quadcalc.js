let a = 2;
let b = 7;
let c = 3;

let p = 0;
let q = 0;

let discriminant = 0;
let xPlus = 0;
let xMinus = 0;
let failedFactor = false;
const decimalRounding = 10000;

ElementId("a").value = a;
ElementId("b").value = b;
ElementId("c").value = c;

let inputs = document.querySelectorAll('input');
inputs.forEach(element => {
    element.addEventListener('input', () => {
        element.style.width = element.value.length + "ch";

        a = parseFloat(ElementId("a").value);
        b = parseFloat(ElementId("b").value);
        c = parseFloat(ElementId("c").value);

        if (isNaN(a) || isNaN(b) || isNaN(c) || a == 0) {
            ElementId("inputs").style.opacity = 0.5;
            return;
        }
        ElementId("inputs").style.opacity = 1;

        runCalculations();
    })
});

inputs.forEach(element => {
    element.style.width = element.value.length + "ch";
})

runCalculations = () => {
    calcVertForm(); //q2
    calcX(); //q1
    factor(); //q3
}

calcVertForm = () => {
    let formString;

    if (a != 1) {
        formString = a + "(x";
    } else {
        formString = "(x";
    }

    p = (-b) / (2 * a);
    // console.log("P: " + p);
    q = (a * p**2) + (b * p) + (c);
    // console.log("Q: " + q);
    if (p == 0 ) {
        formString = formString.concat(")&sup2");
    } else if (p < 0) { 
        formString = formString.concat(" + " + Math.round(Math.abs(p) * decimalRounding) / decimalRounding  + ")&sup2");
    } else {
        formString = formString.concat(" - " + Math.round(p * decimalRounding) / decimalRounding + ")&sup2");
    }
    if (q != 0 ) {
        if (q < 0) {
            formString = formString.concat(" - " + Math.round(Math.abs(q) * decimalRounding) / decimalRounding);
        } else {
            formString = formString.concat(" + " + Math.round(q * decimalRounding) / decimalRounding);
        }
    }

    ElementId("vertForm").innerHTML = formString;
}

calcX = () => {
    discriminant = (b**2) - (4*a*c);

    if (discriminant < 0) {
        ElementId("+").innerHTML = "No X-Intercepts";
        ElementId("-").innerHTML = "";
    } else if (discriminant == 0) {
        xMinus = xPlus = -b / (2 * a);
        ElementId("intercept").innerHTML = "X-Intercept";
        ElementId("+").innerHTML = "One Real Root";
        ElementId("-").innerHTML = xMinus;
    } else {
        xPlus = (-b + Math.sqrt(discriminant)) / (2*a);
        xMinus = (-b - Math.sqrt(discriminant)) / (2*a);
        ElementId("+").innerHTML = "Plus: " + Math.round(xPlus * decimalRounding) / decimalRounding;
        ElementId("-").innerHTML = "Minus: " + Math.round(xMinus * decimalRounding) / decimalRounding;
    }
}

factor = () => {

    if (c == 0) {
        ElementId("factored").innerHTML = "Unable to factor <br>when C = 0";
        return;
    }

    if (b == 0) {
        ElementId("factored").innerHTML = "Unable to factor <br>when B = 0";
        return;
    }
    
    let factorString = "(";
    let tempC = a*c;
    let limit = Math.max(Math.abs(b), Math.abs(tempC));

    let num1, num2;

    let num1Extra = "";
    let num2Extra = "";

    let finalNum1, finalNum2;

    let front = "";

    let factors = findFactors(limit, b, tempC);

    try {
        num1 = factors[0];
        num2 = factors[1];
    } catch (error) {
        console.log("Unable to find");
        if (failedFactor) {
            ElementId("factored").innerHTML = "Factor could not be found within a reasonable time";
        } else {
            ElementId("factored").innerHTML = "Can't factor";
        }
        failedFactor = false;
        return;
    }

    num1Array = reduce(num1, a);
    num2Array = reduce(num2, a);

    finalNum1 = num1Array[0];
    finalNum2 = num2Array[0];
    
    if (num1Array[1] != 1) {
        num1Extra = num1Array[1];
    }

    if (num2Array[1] != 1) {
        num2Extra = num2Array[1];
    }

    factorString = factorString.concat(num1Extra + "x");

    if (finalNum1 > 0) {
        factorString = factorString.concat(" + " + finalNum1 + ")(");
    } else {
        factorString = factorString.concat(" - " + Math.abs(finalNum1) + ")(");
    }

    factorString = factorString.concat(num2Extra + "x");

    if (finalNum2 > 0) {
        factorString = factorString.concat(" + " + finalNum2 + ")");
    } else {
        factorString = factorString.concat(" - " + Math.abs(finalNum2) + ")");
    }

    if (num1Extra.length == 0) {
        num1Extra = 1;
    }

    if (num2Extra.length == 0) {
        num2Extra = 1;
    }

    if (Math.abs(num1Extra) * Math.abs(num2Extra) != Math.abs(a)) {
        if (num1Extra == 1) {
            console.log("A: dividing: " + a + "/" + num2Extra);
            front = a/num2Extra;
        } else {
            front = a/num1Extra;
            console.log("B: dividing: " + a + "/" + num1Extra);
        }
    } else {
        front = 1;
    }

    if (a < 0 && front > 0) {
        front *= -1;
    }

    if (Math.abs(front) == 1) {
        if (front > 0) {
            front = "";
        } else {
            front = "-"
        }
    }

    ElementId("factored").innerHTML = front.toString().concat(factorString);
}

function findFactors(limit, b, tempC) {
    const startTime = Date.now();

    for (let i = -limit; i <= limit; i++) {
        for (let j = -limit; j <= limit; j++) {
            // console.log("I: " + i + "|J: " + j);
            if (i * j == tempC && i + j == b) {
                // console.log("Found: " + i + "," + j + " in " + tries + " tries");
                return [i,j];
            }
            if (Date.now() - startTime > 1000) {
                failedFactor = true;
                return;
            }
        }
    }
}

function reduce(numerator,denominator){ // stack overflow :praying_emoji: users/405017/phrogz
    var gcd = function gcd(a,b){
      return b ? gcd(b, a%b) : a;
    };
    gcd = gcd(numerator,denominator);
    return [numerator/gcd, denominator/gcd];
  }

runCalculations();