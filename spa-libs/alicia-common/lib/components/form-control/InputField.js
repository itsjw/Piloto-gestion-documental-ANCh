'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Alberto ECM 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * (c) 2016-12-28 12:46:03 DOX, LTDA. http://www.dox.cl
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// import {connect} from 'react-redux'

var InputField = function (_Component) {
    _inherits(InputField, _Component);

    function InputField() {
        _classCallCheck(this, InputField);

        return _possibleConstructorReturn(this, (InputField.__proto__ || Object.getPrototypeOf(InputField)).apply(this, arguments));
    }

    _createClass(InputField, [{
        key: 'renderDefault',
        value: function renderDefault() {
            var _props = this.props,
                input = _props.input,
                placeholder = _props.placeholder,
                className = _props.className,
                readonly = _props.readonly,
                type = _props.type,
                _props$meta = _props.meta,
                error = _props$meta.error,
                warning = _props$meta.warning,
                labelId = _props.labelId,
                autoFocus = _props.autoFocus;

            var fieldClass = (0, _classnames2.default)({ 'form-group': true, 'has-error': error, 'fg-line': true }, className);
            var labelId1 = labelId || input.name;

            return _react2.default.createElement(
                'div',
                { className: fieldClass },
                _react2.default.createElement(_reactIntl.FormattedMessage, { id: labelId1, tagName: 'label' }),
                _react2.default.createElement('input', _extends({
                    id: input.name
                }, input, {
                    type: type,
                    className: 'form-control input-sm',
                    placeholder: placeholder,
                    readOnly: readonly,
                    autoFocus: autoFocus
                })),
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
    }, {
        key: 'renderInline',
        value: function renderInline() {
            var _props2 = this.props,
                input = _props2.input,
                placeholder = _props2.placeholder,
                readonly = _props2.readonly,
                type = _props2.type,
                autoFocus = _props2.autoFocus,
                autoComplete = _props2.autoComplete;


            return _react2.default.createElement(
                'div',
                { className: 'form-group', style: { display: 'inline' } },
                _react2.default.createElement('input', _extends({}, input, {
                    type: type,
                    className: 'form-control input-sm',
                    placeholder: placeholder,
                    readOnly: readonly,
                    autoFocus: autoFocus,
                    autoComplete: autoComplete
                }))
            );
        }
    }, {
        key: 'renderHorizontal',
        value: function renderHorizontal() {
            var _props3 = this.props,
                input = _props3.input,
                placeholder = _props3.placeholder,
                readonly = _props3.readonly,
                type = _props3.type,
                error = _props3.meta.error,
                labelId = _props3.labelId,
                autoFocus = _props3.autoFocus,
                intl = _props3.intl;

            var labelId1 = labelId || input.name;

            return _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                    'label',
                    { htmlFor: input.name, className: 'col-sm-2 control-label' },
                    intl.formatMessage({ id: labelId1 })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'col-sm-10' },
                    _react2.default.createElement(
                        'div',
                        { className: '' },
                        _react2.default.createElement('input', _extends({
                            id: input.name
                        }, input, {
                            type: type,
                            className: 'form-control input-sm',
                            placeholder: placeholder,
                            readOnly: readonly,
                            autoFocus: autoFocus
                        })),
                        error && _react2.default.createElement(
                            'small',
                            { className: 'help-block' },
                            _react2.default.createElement(_reactIntl.FormattedMessage, { id: error })
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var mode = this.props.mode;
            // console.log(mode)

            switch (mode) {
                case 'inline':
                    return this.renderInline();

                case 'horizontal':
                    return this.renderHorizontal();

                default:
                    return this.renderDefault();
            }
        }
    }]);

    return InputField;
}(_react.Component);

exports.default = (0, _reactIntl.injectIntl)(InputField);