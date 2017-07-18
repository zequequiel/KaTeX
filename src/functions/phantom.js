import defineFunction, {ordargument} from "../defineFunction";
import buildCommon from "../buildCommon";
import mathMLTree from "../mathMLTree";

import * as html from "../buildHTML";
import * as mml from "../buildMathML";

defineFunction(
    "\\phantom",
    {
        numArgs: 1,
    },
    (context, args) => {
        const body = args[0];
        return {
            type: "phantom",
            value: ordargument(body),
        };
    },
    "phantom",
    (group, options) => {
        const elements = html.buildExpression(
            group.value.value,
            options.withPhantom(),
            false
        );

        // \phantom isn't supposed to affect the elements it contains.
        // See "color" for more details.
        return new buildCommon.makeFragment(elements);
    },
    (group, options) => {
        const inner = mml.buildExpression(group.value.value, options);
        return new mathMLTree.MathNode("mphantom", inner);
    },
);
