/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
      return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var length = array.length;
    if (n > length)
      return array;
    else
      return n === undefined ? array[(length-1)] : array.slice(length-n);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.

  // get rid of else if
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)){
      for (var i=0; i<collection.length; i++){
        iterator(collection[i], i, collection);
      }
    }
    else {
      for (var i in collection){
        iterator(collection[i], i, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.

  // refactor each
  _.filter = function(collection, test) {
    var array = [];
    for (var i=0; i<collection.length; i++){
      if (test (collection[i]))
        array.push(collection[i]);
    }
    return array;
  };

  // Return all elements of an array that don't pass a truth test.

  // use anonymous functions
  // could return filter with collection and anonymous fucntion pass value, return opp of test of value
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    
    var isEven = function(num) { return num % 2 === 0; };
    var isOdd = function(num) { return num % 2 !== 0; };
    if(test(2)){
      var array = _.filter(collection, isOdd);
    }
    else {
      var array = _.filter(collection, isEven);
    }
    
    return array;
  };

  // Produce a duplicate-free version of the array.
 
  // use each loop iterator
  // set key of object to value (true), cause keys are not duplicated
  _.uniq = function(array) {
    for (var i=0; i<array.length; i++){
      // no need to run the test on the last element of the array
      if (array.length-1){
        var x = i + 1;
        while (x<array.length){
          if (array[i]===array[x]) {
            array.splice(x,1);
          }
          else {
            //only need to add 1 to x if a splice wasn't done
            x++;
          }
        }
      }
    }
    return array;
  };


  // Return the results of applying an iterator to each element.

  //use each
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    // use .each and kill array
    if (Array.isArray(array)){
      var collection = [];
      for (var i=0; i<array.length; i++){
        collection.push(iterator(array[i]));
      }
      return collection;
    }
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.


  // use map (diff between map and each is map returns something), so return map
  // could return method.apply
  // do test right above return map
  // test within map
  _.invoke = function(collection, functionOrKey, args) {
    var array = [];
    if (typeof(functionOrKey) == "function") {
      for (var i=0; i<collection.length; i++){
        array.push(functionOrKey.apply(collection[i], args));
      }
    }
    else {
      for (var i=0; i<collection.length; i++){
        var x = 'cat'[functionOrKey]();
        array.push(collection[i][functionOrKey]());
      } 
    }
    return array;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6

// use .each
  _.reduce = function(collection, iterator, accumulator) {
    if (Array.isArray(collection)){
      for (var i=0; i<collection.length; i++){
        accumulator = iterator(accumulator, collection[i]);
      }
    }
    else if (typeof collection === "object") {
      for (var i in collection){
        accumulator = iterator(accumulator, collection[i]);
      }
    }
  return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.

  // set iterator = iterator or identity

  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    // default is true for an empty collection
    if (typeof collection === 'undefined') {
      return true;
    }
    return _.reduce(collection, function(isTruthy, item){
      // once one untruthy item is found false is going to be returned in the end
      if (!isTruthy){
        return false;
      }
      // handles no callback being provided
      if (typeof iterator === 'undefined') {
        return item;
      }
      // does the test using the callback
      if (iterator(item))
        return true;
      else
        return false;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one

  // use opposite of every, return iterator of item, similar to reject
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    // makes identitity the default iterator
    if (typeof iterator === 'undefined') {
      iterator = _.identity;
    }
    // empty set is false
    if (collection.length === 0) 
      return false; 

    var isTruthy = false;
    // goes through collection one iteam at at time, passes an even number so it always passes the truthy test
    // and iseven test
    for (var i=0; i<collection.length; i++) {
      isTruthy = _.every([collection[i], 2], iterator);
      // as soon as it becomes true that is returned
      if (isTruthy) {
        return isTruthy;
      }
    }
    return isTruthy;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla

// refactor with eaches
  _.extend = function(obj) {
    for(var i=1; i<arguments.length; i++){
      var param = arguments[i];
      for (var x in param){
        obj[x] = param[x];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj

  // use eachs, pretty much same as extend
  _.defaults = function(obj) {
        for(var i=1; i<arguments.length; i++){
      var param = arguments[i];
      for (var x in param){
        // only updates the object if that key doesn't already exist
        if (!(x in obj))
          obj[x] = param[x];
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  // might have to us jsonstring on arguments
  // memo, setting key for first time is func.apply, key is arguments
  _.memoize = function(func) {
    var memo = {};
   return function() {
      var result = func.apply(this, arguments);
      return result;
   };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms

  // array.prototype.slice.call grab arguments
  // set timeout has anonymous function return func.apply in agruments
  _.delay = function(func, wait) {
    var length = arguments.length;
     //if length is greater than 2 there are arguments to add to the function
    if (length>2){
      var array = [];
      for (var i=2; i<length; i++) {
        array.push(arguments[i]);
      }
    }
    function run() {
      if (length>2){
        func(array[0], array[1]);
      }
      else {
        func();
      }
    }
    setTimeout(function() { run(); }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
      var myArray = array.slice();
      var currentIndex = myArray.length
    , temporaryValue
    , randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = myArray[currentIndex];
    myArray[currentIndex] = myArray[randomIndex];
    myArray[randomIndex] = temporaryValue;
  }

  return myArray;
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
