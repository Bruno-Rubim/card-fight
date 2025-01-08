export function countValueInArray(array, value) {
    let count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

export function removeAllValueFromArray(array, value) {
  let i = 0;
  while (i < array.length) {
    if (array[i] === value) {
      array.splice(i, 1);
    } else {
      ++i;
    }
  }
  return array;
}

export function removeSomeValueFromArray(array, value, ammount) {
  let i = 0;
  let n = 0;
  while (i < array.length && n < ammount) {
    if (array[i] === value) {
      array.splice(i, 1);
      n++
    } else {
      ++i;
    }
  }
  return array;
}