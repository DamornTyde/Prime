$(document).ready(function(){
    var primeList = [3],
    answer = [],
    count = 0,
    notPrime = 9,
    number;

    $(document).on("click", "button", function(){
        number = Number($("input").val());
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
        for(y = primeList[primeList.length - 1] + 2;;y += 2){
            if(eratosthenes(y)){
                return y;
            }
        }
    }

    function eratosthenes(x){
        if(x == notPrime){
            count++;
            notPrime = primeList[count] * primeList[count];
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