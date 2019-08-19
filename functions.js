$(document).ready(function(){
    var primeList = [3],
    answer = [],
    count = 0,
    notPrime = 9,
    number;

    $(document).on("click", "button", function(){
        number = Number($("input").val());
        if(Number.isSafeInteger(number)){
            checkNumber(2);
            checkNumber(3);
            while(number > 1){
                primeList.push(newPrime());
                checkNumber(primeList[primeList.length - 1]);
            }
            var content = "",
            check = answer.length - 2;
            answer.forEach(function(item, i){
                content += item.toLocaleString();
                if(i <= check){
                    content += " * ";
                }
            });
            $("div").html(content);
            primeList.splice(1, primeList.length - 1);
            answer.splice(0, answer.length);
            count = 0;
            notPrime = 9; 
        } else {
            alert("The input is to high to calculate with!");
        }
    });

    function checkNumber(item){
        var check = number / item;
        if(Number.isInteger(check)){
            number = check;
            answer.push(item);
            checkNumber(item);
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
        if(x == notPrime){
            var temp = primeList[count] * primeList[count];
            count++;
            if(Number.isSafeInteger(temp)){
                notPrime = temp;
            }
            return false;
        }
        for(i = 0; i < count; i++){
            if(Number.isInteger(x / primeList[i])){
                return false;
            }
        }
        return true;
    }
});