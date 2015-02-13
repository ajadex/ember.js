/**
@module ember
@submodule ember-htmlbars
*/

import Ember from "ember-metal/core";
import { read } from "ember-metal/streams/utils";
import lookupHelper from "ember-htmlbars/system/lookup-helper";

export default function element(morph, env, scope, path, params, hash) { //jshint ignore:line
  var helper = lookupHelper(path, scope.self, env);
  var valueOrLazyValue;

  if (helper) {
    var options = {
      element: morph.element
    };
    valueOrLazyValue = helper.helperFunction.call(scope.self, params, hash, options, env);
  } else {
    valueOrLazyValue = scope.self.getStream(path);
  }

  var value = read(valueOrLazyValue);
  if (value) {
    Ember.deprecate('Returning a string of attributes from a helper inside an element is deprecated.');

    var parts = value.toString().split(/\s+/);
    for (var i = 0, l = parts.length; i < l; i++) {
      var attrParts = parts[i].split('=');
      var attrName = attrParts[0];
      var attrValue = attrParts[1];

      attrValue = attrValue.replace(/^['"]/, '').replace(/['"]$/, '');

      env.dom.setAttribute(morph.element, attrName, attrValue);
    }
  }
}

