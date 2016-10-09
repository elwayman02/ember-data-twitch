export default {

  clientID: '',
  clientSecret: '',
  redirectURI: '',

  load(options) {
    const ownPropNames = Object.getOwnPropertyNames(this) || [] ;

    for (let propName in options) {
      if (ownPropNames.indexOf(propName) >= 0 && typeof this[propName] !== 'function') {
        this[propName] = options[propName];
      }
    }
  }
};
