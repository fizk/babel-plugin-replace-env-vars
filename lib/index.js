'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _babylon = require('babylon');

var _babylon2 = _interopRequireDefault(_babylon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (babel) {
    var t = babel.types;
    // cache for performance
    var parseMap = {};

    return {
        visitor: {
            Identifier: function Identifier(path, state) {
                if (path.parent.type === 'MemberExpression') {
                    return;
                }
                if (path.parent.type === 'ClassMethod') {
                    return;
                }
                if (path.isPure()) {
                    return;
                }

                if (!process.env.hasOwnProperty(path.node.name)) {
                    return;
                }

                var replacementDescriptor = process.env[path.node.name];
                if (replacementDescriptor === undefined || replacementDescriptor === null) {
                    replacementDescriptor = t.identifier(String(replacementDescriptor));
                }

                var type = typeof replacementDescriptor === 'undefined' ? 'undefined' : _typeof(replacementDescriptor);
                if (type === 'string' || type === 'boolean') {
                    replacementDescriptor = {
                        type: type,
                        replacement: replacementDescriptor
                    };
                } else if (t.isNode(replacementDescriptor)) {
                    replacementDescriptor = {
                        type: 'node',
                        replacement: replacementDescriptor
                    };
                } else if (type === 'object' && replacementDescriptor.type === 'node' && typeof replacementDescriptor.replacement === 'string') {
                    replacementDescriptor.replacement = parseMap[replacementDescriptor.replacement] ? parseMap[replacementDescriptor.replacement] : _babylon2.default.parseExpression(replacementDescriptor.replacement);
                }

                var replacement = replacementDescriptor.replacement;
                switch (replacementDescriptor.type) {
                    case 'boolean':
                        path.replaceWith(t.booleanLiteral(replacement));
                        break;
                    case 'node':
                        if (t.isNode(replacement)) {
                            path.replaceWith(replacement);
                        }
                        break;
                    default:
                        // treat as string
                        var str = String(replacement);
                        path.replaceWith(t.stringLiteral(str));
                        break;
                }
            }
        }
    };
};