
export function createTypes(types, namespace, separator = '.') {
  const typeObj = {};

  const flattenedTypes = types.reduce((latestAry, curType) => {
    return latestAry.concat(Array.isArray(curType) ? curType : [curType]);
  }, []);

  flattenedTypes.forEach((type) => {
    typeObj[type] = namespace ? `${namespace}${separator}${type}` : type;
  });

  return typeObj;
}

export function asyncVariants(type, fail = 'FAILURE', success = 'SUCCESS', clean = 'CLEANUP') {
  return [
    type,
    `${type}_${fail}`,
    `${type}_${success}`,
    `${type}_${clean}`
  ];
}
