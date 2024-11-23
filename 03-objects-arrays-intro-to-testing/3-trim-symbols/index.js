/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let arr = string.split('');
  let total = 0;
  let newArr = [];

  return newArr = arr.filter(function(item, index) {
      if (arr[index - 1] && item != arr[index - 1]) {
        total = 0;
      }
      total++;

      if (size && (total <= size) || isNaN(size)   ) {
        return item;
      }
    }

  ).join('');
}
