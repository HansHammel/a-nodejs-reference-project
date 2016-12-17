
// handle optional dependencies
const packagejson = require('./package.json');
const isOptionalDependencyInstalled = function (packagejson, refresh) {
  if (refresh || typeof this.availableOptionalDependencies === 'undefined') {
    const availableOptionalDependencies = [];
    for (let dependency in packagejson.optionalDependencies) {
      console.log(dependency);
      if (packagejson.optionalDependencies.hasOwnProperty(dependency)) {
        try {
          let optionalDependency = require.resolve(dependency);
          if (typeof optionalDependency !== 'undefined' && optionalDependency != null) {
            availableOptionalDependencies[dependency] = true;
          }
        } catch (err) {
          availableOptionalDependencies[dependency] = false;
        }
      }
    }
    this.availableOptionalDependencies = availableOptionalDependencies;
    return availableOptionalDependencies;
  } else {
    return this.availableOptionalDependencies;
  }
};

console.log(isOptionalDependencyInstalled(packagejson));

