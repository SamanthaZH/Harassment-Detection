'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _decorateComponentWithProps = require('decorate-component-with-props');

var _decorateComponentWithProps2 = _interopRequireDefault(_decorateComponentWithProps);

var _CharCounter = require('./CharCounter');

var _CharCounter2 = _interopRequireDefault(_CharCounter);

var _WordCounter = require('./WordCounter');

var _WordCounter2 = _interopRequireDefault(_WordCounter);

var _LineCounter = require('./LineCounter');

var _LineCounter2 = _interopRequireDefault(_LineCounter);

var _CustomCounter = require('./CustomCounter');

var _CustomCounter2 = _interopRequireDefault(_CustomCounter);

var _styles = {
  "counter": "draftJsUndoPlugin__counter__2wZYK",
  "counterOverLimit": "draftJsUndoPlugin__counterOverLimit__3_8bn"
};

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultTheme = {
  counter: _styles2.default.counter,
  counterOverLimit: _styles2.default.counterOverLimit
};

exports.default = function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var store = {
    getEditorState: undefined,
    setEditorState: undefined
  };
  // Styles are overwritten instead of merged as merging causes a lot of confusion.
  //
  // Why? Because when merging a developer needs to know all of the underlying
  // styles which needs a deep dive into the code. Merging also makes it prone to
  // errors when upgrading as basically every styling change would become a major
  // breaking change. 1px of an increased padding can break a whole layout.
  var theme = config.theme ? config.theme : defaultTheme;
  return {
    CharCounter: (0, _decorateComponentWithProps2.default)(_CharCounter2.default, { theme: theme, store: store }),
    WordCounter: (0, _decorateComponentWithProps2.default)(_WordCounter2.default, { theme: theme, store: store }),
    LineCounter: (0, _decorateComponentWithProps2.default)(_LineCounter2.default, { theme: theme, store: store }),
    CustomCounter: (0, _decorateComponentWithProps2.default)(_CustomCounter2.default, { theme: theme, store: store }),
    initialize: function initialize(_ref) {
      var getEditorState = _ref.getEditorState,
          setEditorState = _ref.setEditorState;

      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
    }
  };
};