$(document).ready(function(){
    var primeList = [3],
    answer = [],
    number;

    $(document).on("click", "button", function(){
        number = Number($("input").val());
        if(Number.isSafeInteger(number)){
            var content = number + " = ";
            checkNumber(2);
            checkNumber(3);
            while(number > 1){
                primeList.push(newPrime());
                checkNumber(primeList[primeList.length - 1]);
            }
            var check = answer.length - 2;
            answer.forEach(function(item, i){
                content += item.toLocaleString();
                if(i <= check){
                    content += " * ";
                }
            });
            $("div").html(content);
            primeList.splice(1, primeList.length - 1);
            answer.splice(0, answer.length); 
        } else {
            alert("The input is to high to calculate with!");
        }
    });

    function checkNumber(item){
        if(item * item > number){
            answer.push(number);
            number = 1;
        } else {
            var check = number / item;
            if(Number.isInteger(check)){
                number = check;
                answer.push(item);
                checkNumber(item);
            }
        }
    }

    function newPrime(){
        for(x = primeList[primeList.length - 1] + 2;;x += 2){
            if(eratosthenes(x)){
                return x;
            }
        }
    }

    function eratosthenes(x){
        for(i = 0;;i++){
            if(Math.pow(primeList[i], 2) > x){
                return true;
            }
            if(Number.isInteger(x / primeList[i])){
                return false;
            }
        }
    }
});