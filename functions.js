$(document).ready(function(){
    var list = [3],
    answer = [],
    number;

    $(document).on("click", "button", function(){
        number = Number($("input").val());
        checkNumber(2);
        checkNumber(3);
        while(number > 1){
            list.push(newNumber());
            setTimeout(checkNumber(list[list.length - 1]), 10);
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
        list.splice(1, list.length - 1);
        answer.splice(0, answer.length);
    });

    function checkNumber(item){
        var check = number / item;
        if(Number.isInteger(check)){
            number = check;
            answer.push(item);
            checkNumber(item);
        }
    }

    function newNumber(){
        for(start = list[list.length - 1] + 2;;start += 2){
            if(list.findIndex(x => Number.isInteger(start / x)) == -1){
                return start;
            }
        }
    }
});