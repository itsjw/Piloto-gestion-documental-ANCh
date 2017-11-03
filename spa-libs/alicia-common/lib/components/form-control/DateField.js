'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactIntl = require('react-intl');

var _reactDatetime = require('react-datetime');

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reduxForm = require('redux-form');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('react-datetime/css/react-datetime.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Alberto ECM 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * (c) 2017-10-04 13:55:33 DOX, LTDA. http://www.dox.cl
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Alberto ECM 
 * (c) 2017-05-18 17:23:45 DOX, LTDA. http://www.dox.cl
 * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
 * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
 * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
 * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
 * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
 */

var Date = function (_Component) {
    _inherits(Date, _Component);

    function Date(props) {
        _classCallCheck(this, Date);

        var _this = _possibleConstructorReturn(this, (Date.__proto__ || Object.getPrototypeOf(Date)).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Date, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            // console.log('Date.render', this.props)
            var _props = this.props,
                input = _props.input,
                className = _props.className,
                defaultValue = _props.defaultValue,
                _props$meta = _props.meta,
                dispatch = _props$meta.dispatch,
                form = _props$meta.form,
                error = _props$meta.error,
                labelId = _props.labelId;

            var fieldClass = (0, _classnames2.default)({ 'form-group': true, 'has-error': error, 'fg-line': true }, className);
            var labelId1 = labelId || input.name;

            if (defaultValue && !this.state[input.name]) {
                setTimeout(function () {
                    dispatch((0, _reduxForm.change)(form, input.name, defaultValue));
                    _this2.setState(_extends({}, _this2.state, _defineProperty({}, input.name, true)));
                });
            }

            return _react2.default.createElement(
                'div',
                { className: fieldClass },
                _react2.default.createElement(_reactIntl.FormattedMessage, { id: labelId1, tagName: 'label' }),
                _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_reactDatetime2.default, {
                        defaultValue: defaultValue,
                        onChange: function onChange(date) {
                            return _moment2.default.isMoment(date) && date.isValid() ? dispatch((0, _reduxForm.change)(form, input.name, date)) : dispatch((0, _reduxForm.change)(form, input.name, ""));
                        }
                    })
                ),
                error && _react2.default.createElement(
                    'small',
                    { className: 'help-block' },
                    _react2.default.createElement(_reactIntl.FormattedMessage, { id: error })
                )
            );
        }
    }]);

    return Date;
}(_react.Component);

exports.default = Date;