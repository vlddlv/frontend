import tagsData from './../data/tags';

export default class Utils {
  static getBaseSymbol(currency = 'USD') {
    switch (currency) {
      case 'EUR':
        return '€';
      case 'GBP':
        return '£';
      case 'JPY':
        return '¥';
      case 'USD':
        return '$';
      case 'BTC':
        return 'Ƀ';
      case 'ETH':
        return 'Ξ';
      case 'PLS':
        return '🄿';
      default:
        return '$';
    }
  }
}

export const removeKey = (obj, propToDelete) => {
  const { [propToDelete]: deleted, ...objectWithoutDeletedProp } = obj;
  return objectWithoutDeletedProp;
};

// Comparator for sort function, that sorts the array while keeping all null/undefined values at the end
export const comparatorWithNullValues = (valueA, valueB) => {
  if (!valueA) return 1;
  else if (!valueB) return -1;
  else if (valueA === valueB) return 0;
  // because a & b both could be null/undefined
  else return valueA - valueB;
};

/**
 * This is a one-way diff,
 * meaning that it will return keys/values from object2 that are not identical to their counterparts in object1
 */
export const oneWayDiff = (object1, object2) => {
  return Object.keys(object2).reduce((diff, key) => {
    if (object1[key] === object2[key]) return diff;
    return {
      ...diff,
      [key]: object2[key],
    };
  }, {});
};

/* Does not work as expected */
export const uniqEs6 = arrArg => {
  return arrArg.filter((elem, pos, arr) => {
    return arr.indexOf(elem) === pos;
  });
};

/**
 * A lot of times it's difficult to get the ISO date
 * out of the various date types we have
 * Thus this function
 */
export const getISODateString = date => {
  if (!date) return date;
  if (date.__type === 'Date') {
    return date.iso;
  } else if (date instanceof Date) {
    return date.toISOString();
  } else {
    return date;
  }
};

/**
 * @param {string} str The string to pad
 * @param {number} length what should be the final length of the string after padding
 * @param {string} padChar The string to fill in the padding area
 * @return {string}
 */
export const padStart = (str, length, padChar = '0') => {
  return (padChar.repeat(length) + str).slice(-length);
};

export const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

const randBgColors = [
  '#7bbed6',
  '#82689a',
  '#75c1a5',
  '#ed837f',
  '#ffb777',
  '#19C2FF',
  '#00BCFF',
  '#B25C00',
  '#FF8300',
  '#ACB200',
  '#19FFAA',
];
export const tagsColorMatcher = tag => {
  let background =
    tagsData.filter(tagObj => tagObj.label === tag)[0] &&
    tagsData.filter(tagObj => tagObj.label === tag)[0].background;
  if (!background) {
    background = randBgColors[Math.floor(Math.random() * randBgColors.length)];
  }
  return background;
};
