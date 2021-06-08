let primes;
let lastPrime;

document.getElementById("input").setAttribute("max", Number.MAX_SAFE_INTEGER);

document.addEventListener("keydown", function(e) {
    const x = e.key;
    switch(x) {
        case "ArrowUp":
            setInput(1);
            break
        case "ArrowDown":
            setInput(-1);
            break
        case "Enter":
            document.getElementById("submit").click();
    }
});

function setInput(x) {
    const field = document.getElementById("input")
    const i = Number(field.value) + x;
    if (Number.isSafeInteger(i) && i > 1) {
        field.value = i;
    }
}

document.getElementById("submit").addEventListener("click", function () {
    const input = Number(document.getElementById("input").value);
    if (Number.isSafeInteger(input) && input > 1) {
        const answer = calc(input);
        const output = document.createDocumentFragment();
        output.appendChild(document.createTextNode(`${input.toLocaleString()} = `));
        let i = 0;
        while (true) {
            const x = answer[i];
            output.appendChild(document.createTextNode(x.toLocaleString()));
            const y = answer.filter(z => z == x).length;
            if (y > 1) {
                const sup = document.createElement("sup");
                sup.appendChild(document.createTextNode(y.toLocaleString()));
                output.appendChild(sup);
            }
            i += y;
            if (i == answer.length) {
                const print = document.getElementById("print");
                print.innerHTML = "";
                print.appendChild(output);
                return;
            }
            output.appendChild(document.createTextNode(" * "));
        }
    }
    alert("Invalid input!");
});

function calc(input) {
    const answer = [];
    primes = [];
    lastPrime = 2;
    while (true) {
        if (lastPrime * lastPrime > input) {
            answer.push(input);
            return answer;
        }
        if (input % lastPrime == 0) {
            answer.push(lastPrime);
            input = input / lastPrime;
        } else {
            primes.push(newPrime());
        }
    }
}

function newPrime() {
    for (let x = lastPrime + (lastPrime % 2) + 1;; x += 2) {
        if (eratosthenes(x)) {
            lastPrime = x;
            return x;
        }
    }
}

function eratosthenes(x) {
    if (primes.length == 0) {
        return true;
    }
    for (let i = 0;; i++) {
        if(primes[i] * primes[i] > x) {
            return true;
        } else if (x % primes[i] == 0) {
            return false;
        }
    }
}