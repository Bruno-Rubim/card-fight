export function countValueInArray(array, value) {
    let count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

export function removeAllValueFromArray(array, value) {
    var i = 0;
    while (i < array.length) {
      if (array[i] === value) {
        array.splice(i, 1);
      } else {
        ++i;
      }
    }
    return array;
}