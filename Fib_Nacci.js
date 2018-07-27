function fib(){
    var count = 0;
    var count2 = 1;
    function nacci(){
        console.log(count2);
        var count3 = count + count2;
        count = count2;
        count2 = count3;
    }
    return nacci;
}

var fibCounter = fib();

fibCounter();
fibCounter();
fibCounter();
fibCounter();
fibCounter();
fibCounter();