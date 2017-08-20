// @flow
import defineFunction, {ordargument} from "../defineFunction";
import buildCommon from "../buildCommon";
import mathMLTree from "../mathMLTree";

import * as html from "../buildHTML";
import * as mml from "../buildMathML";

defineFunction({
    type: "phantom",
    names: "\\phantom",
    props: {
        numArgs: 1,
    },
    handler: (context, args) => {
        const body = args[0];
        return {
            type: "phantom",
            value: ordargument(body),
        };
    },
    htmlBuilder: (group, options) => {
        const elements = html.buildExpression(
            group.value.value,
            options.withPhantom(),
            false
        );

        // \phantom isn't supposed to affect the elements it contains.
        // See "color" for more details.
        return new buildCommon.makeFragment(elements);
    },
    mathmlBuilder: (group, options) => {
        const inner = mml.buildExpression(group.value.value, options);
        return new mathMLTree.MathNode("mphantom", inner);
    },
});
