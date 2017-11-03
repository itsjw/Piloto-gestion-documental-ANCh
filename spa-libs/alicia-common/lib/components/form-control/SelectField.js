'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reduxForm = require('redux-form');

require('react-select/dist/react-select.css');

require('./SelectField.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Alberto ECM 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * (c) 2017-09-26 10:33:14 DOX, LTDA. http://www.dox.cl
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var SelectField = function (_Component) {
    _inherits(SelectField, _Component);

    function SelectField() {
        _classCallCheck(this, SelectField);

        return _possibleConstructorReturn(this, (SelectField.__proto__ || Object.getPrototypeOf(SelectField)).apply(this, arguments));
    }

    _createClass(SelectField, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                input = _props.input,
                placeholder = _props.placeholder,
                className = _props.className,
                readOnly = _props.readOnly,
                _props$meta = _props.meta,
                error = _props$meta.error,
                warning = _props$meta.warning,
                labelId = _props.labelId,
                autoFocus = _props.autoFocus,
                options = _props.options,
                displayOptions = _props.displayOptions;

            var fieldClass = (0, _classnames2.default)({ 'form-group': true, 'has-error': error, 'fg-line': true }, className);
            var labelId1 = labelId || input.name;

            var _showLabel$displayOpt = _extends({ showLabel: true }, displayOptions),
                showLabel = _showLabel$displayOpt.showLabel,
                furtherOptions = _objectWithoutProperties(_showLabel$displayOpt, ['showLabel']);

            return _react2.default.createElement(
                'div',
                { className: fieldClass },
                showLabel && _react2.default.createElement(_reactIntl.FormattedMessage, { id: labelId1, tagName: 'label' }),
                _react2.default.createElement(_reactSelect2.default, _extends({
                    name: input.name,
                    value: input.value,
                    options: options,
                    className: 'form-control input-sm',
                    onChange: function onChange(val) {
                        return input.onChange(val);
                    }
                }, furtherOptions)),
                error && _react2.default.createElement(
                    'small',
                    { className: 'help-block' },
                    _react2.default.createElement(_reactIntl.FormattedMessage, { id: error })
                ) || warning && _react2.default.createElement(
                    'small',
                    { className: 'c-orange' },
                    _react2.default.createElement(_reactIntl.FormattedMessage, { id: warning })
                )
            );
        }
    }]);

    return SelectField;
}(_react.Component);

exports.default = SelectField;