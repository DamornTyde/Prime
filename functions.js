var primes;

document.getElementById("submit").addEventListener("click", function () {
    const input = Number(document.getElementById("input").value);
    if (Number.isSafeInteger(input) && input > 1) {
        const answer = calc(input);
        const output = document.createDocumentFragment();
        output.appendChild(document.createTextNode(`${input} = `));
        var i = 0;
        while (true) {
            const x = answer[i];
            output.appendChild(document.createTextNode(x));
            const y = answer.filter(z => z == x).length;
            if (y > 1) {
                const sup = document.createElement("sup");
                sup.appendChild(document.createTextNode(y));
                output.appendChild(sup);
            }
            i += y;
            if (i == answer.length) {
                const print = document.getElementById("print");
                print.innerHTML = "";
                print.appendChild(output);
                return;
            } else {
                output.appendChild(document.createTextNode(" * "));
            }
        }
    } else {
        alert("Invalid input!");
    }
});

function calc(input) {
    const answer = [];
    primes = [2];
    while (true) {
        if (Math.pow(primes[primes.length - 1], 2) > input) {
            answer.push(input);
            return answer;
        } else if (input % primes[primes.length - 1] == 0) {
            answer.push(primes[primes.length - 1]);
            input = input / primes[primes.length - 1];
        } else {
            primes.push(newPrime());
        }
    }
}

function newPrime() {
    for (var x = primes[primes.length - 1] + 1;; x++) {
        if (eratosthenes(x)) {
            return x;
        }
    }
}

function eratosthenes(x) {
    for (var i = 0;; i++) {
        if(Math.pow(primes[i], 2) > x) {
            return true;
        } else if (x % primes[i] == 0) {
            return false;
        }
    }
}