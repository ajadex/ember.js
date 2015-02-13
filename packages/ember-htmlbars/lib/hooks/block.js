/**
@module ember
@submodule ember-htmlbars
*/

import { appendSimpleBoundView } from "ember-views/views/simple_bound_view";
import { isStream } from "ember-metal/streams/utils";
import lookupHelper from "ember-htmlbars/system/lookup-helper";
import { wrap } from "htmlbars-runtime/hooks";

export default function block(morph, env, scope, path, params, hash, template, inverse) {
  var helper = lookupHelper(path, scope.self, env);

  Ember.assert("A helper named `"+path+"` could not be found", helper);

  var options = {
    morph: morph,
    template: wrap(template),
    inverse: wrap(inverse),
    isBlock: true
  };

  var result = helper.helperFunction.call(scope.self, params, hash, options, env);

  if (isStream(result)) {
    appendSimpleBoundView(scope.self, morph, result);
  } else {
    morph.setContent(result);
  }
}
