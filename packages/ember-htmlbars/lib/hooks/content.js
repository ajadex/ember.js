/**
@module ember
@submodule ember-htmlbars
*/

import { appendSimpleBoundView } from "ember-views/views/simple_bound_view";
import { isStream } from "ember-metal/streams/utils";
import lookupHelper from "ember-htmlbars/system/lookup-helper";

export default function content(morph, env, scope, path) {
  var helper = lookupHelper(path, scope.self, env);
  var result;

  if (helper) {
    var options = {
      morph: morph,
      isInline: true
    };
    result = helper.helperFunction.call(scope.self, [], {}, options, env);
  } else {
    result = scope.self.getStream(path);
  }

  if (isStream(result)) {
    appendSimpleBoundView(scope.self, morph, result);
  } else {
    morph.setContent(result);
  }
}
