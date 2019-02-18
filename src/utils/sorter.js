export const dynamicSort = property => {
  let sortOrder = 1;
  if(property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return (a,b) => {
    const isString = typeof a[property] === 'string'
    const value1 = isString ? a[property].toLowerCase() : a[property]
    const value2 = isString ? b[property].toLowerCase() : b[property]
    const result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
    return result * sortOrder;
  }
}


