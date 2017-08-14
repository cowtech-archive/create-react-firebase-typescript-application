// Polyfills for Mobile Safari 9 and 10
require('whatwg-fetch');
require('core-js/fn/object/values');
require('core-js/fn/object/assign');
require('core-js/fn/object/entries');

if(typeof String.prototype.includes !== 'function'){ // tslint:disable-line strict-type-predicates
  String.prototype.includes = function(e: string): boolean{
    return this.indexOf(e) !== -1;
  };
}

if(typeof Array.prototype.includes !== 'function'){ // tslint:disable-line strict-type-predicates
  Array.prototype.includes = function(e: any): boolean{
    return this.indexOf(e) !== -1;
  };
}
