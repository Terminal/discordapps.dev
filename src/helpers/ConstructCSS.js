const ConstructCSS = (...args) => args
  .filter(argument => argument) // Get arguments that are truthy
  .join(' ');

export default ConstructCSS;
