/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export const pick = (obj, ...fields) => {
  const newObj = {};

  for (const field of fields) {
    for (const key of Object.keys(obj)) {
      if (field === key) {
        newObj[key] = obj[key];
      }
    }
  }

  return newObj;
};
