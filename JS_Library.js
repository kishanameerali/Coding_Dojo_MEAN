function each(array, callback){
    for (let index = 0; index < array.length; index++){
        callback(array[index], index);
    }
}

const stringArray = ['1', 'cat', '2', '3', '4', '5', '6', '7', '8', 'dog'];

//anonymous function way
each(stringArray, function(element, index) {
    console.log(`element: ${ element } and index: ${ index }`); //ES6 way using ` instead of string concatonation
});

//
each(stringArray, listItem);

function listItem(item){
    console.log(item);
};

function map(array, callback){
    const results = [];

    for (let index = 0; index < array.length; index++){
        results.push(callback(array[index], index));
    }
    return results;
}

let results = map(stringArray, function(element, index){
    return parseInt(element, 10);
});

console.log(results);

function filter(array, callback){
    const results = [];

    for (let index = 0; index < array.length; index++){
        if (callback(array[index], index)){
            results.push(array[index]);
        }
    }

    return results;
}

function reject(array, callback){
    const results = [];

    for (let index = 0; index < array.length; index++){
        if (!callback(array[index], index)){
            results.push(array[index]);
        }
    }

    return results;
}

results = reject(results, function(element){
    return isNaN(element);
});

results = filter(results, function(element){
    return element % 2 === 0;
});

console.log(results);

function find(array, callback){
    for (let index = 0; index < array.length; index++){
        if (callback(array[index], index)){
            return array[index];
        }
    }
}

console.log(find(results, function(element){
    return element === 4;
}));

function reduce(array, callback, memo){
    const results = [].concat(array);

    if (memo === undefined){
        memo = results.pop();
    }
    
    for (let index = 0; index < array.length; index++){
        memo = callback(memo, array[index], index);
    }

    return memo;
}

results = reduce(results, add);

function add(num1, num2){
    return num1 + num2;
}

console.log(results);