/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let total = 0;
  let newString = "";

  if (isNaN(size)) return string;

  for (let i=0; i<string.length; ) {
    if (i==0 || string[i]!= string[i-1]) {
      total = 0;
    }

    if (total < size) {
      newString+=string[i];
    }

    total++;
    i++;
  }

  return newString;
}
