'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactIntl = require('react-intl');

var _es = require('react-intl/locale-data/es');

var _es2 = _interopRequireDefault(_es);

var _reactBsNotifier = require('react-bs-notifier');

var _store = require('../services/store');

var _messages = require('../services/messages');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } /**
                                                                                                                                                                                                     * Alberto ECM 
                                                                                                                                                                                                     * (c) 2017-08-18 01:26:34 DOX, LTDA. http://www.dox.cl
                                                                                                                                                                                                     * License:  Esta  aplicación esta bajo una licencia Attribution-NoDerivs 3.0 Unported  La  licencia 
                                                                                                                                                                                                     * permite  redistribucion,  comercial  y  no comercial, con la condición que  el  producto  no  sea 
                                                                                                                                                                                                     * alterado,  sea  manejado  como un todo, sin separar sus partes, y los creditos por  autoria  sean 
                                                                                                                                                                                                     * preservados a nombre de DOX. Para ver una copia de esta licencia, visite
                                                                                                                                                                                                     * http://creativecommons.org/licenses/by-nd/3.0/legalcode.
                                                                                                                                                                                                     */

(0, _reactIntl.addLocaleData)([].concat(_toConsumableArray(_es2.default)));

var _DoxIntlProvider = function (_Component) {
    _inherits(_DoxIntlProvider, _Component);

    function _DoxIntlProvider() {
        _classCallCheck(this, _DoxIntlProvider);

        return _possibleConstructorReturn(this, (_DoxIntlProvider.__proto__ || Object.getPrototypeOf(_DoxIntlProvider)).apply(this, arguments));
    }

    _createClass(_DoxIntlProvider, [{
        key: 'render',
        value: function render() {
            var notifications = this.props.notifications;

            console.log('_DoxIntlProvider.render', this.props);
            return _react2.default.createElement(
                _reactIntl.IntlProvider,
                { locale: _messages.browserLng, messages: this.props.messages },
                _react2.default.createElement(
                    'div',
                    { className: 'f-h' },
                    _react2.default.createElement(_reactBsNotifier.AlertList, {
                        showIcon: false,
                        className: 'bgm-indigo growl-animated animated fadeInDown',
                        position: 'bottom-left',
                        alerts: notifications,
                        onDismiss: this.onAlertDismissed
                    }),
                    _react2.default.createElement(
                        'div',
                        { className: 'f-h' },
                        this.props.children
                    )
                )
            );
        }
    }]);

    return _DoxIntlProvider;
}(_react.Component);

var DoxIntlProvider = (0, _reactRedux.connect)(function (state) {
    return {
        messages: state.app.messages,
        notifications: state.notifications
    };
})(_DoxIntlProvider);

var DoxPlatform = function (_Component2) {
    _inherits(DoxPlatform, _Component2);

    function DoxPlatform() {
        _classCallCheck(this, DoxPlatform);

        return _possibleConstructorReturn(this, (DoxPlatform.__proto__ || Object.getPrototypeOf(DoxPlatform)).apply(this, arguments));
    }

    _createClass(DoxPlatform, [{
        key: 'render',
        value: function render() {
            console.log('DoxPlatform.render');
            return _react2.default.createElement(
                _reactRedux.Provider,
                { store: _store.store },
                _react2.default.createElement(
                    DoxIntlProvider,
                    null,
                    this.props.children
                )
            );
        }
    }]);

    return DoxPlatform;
}(_react.Component);

exports.default = DoxPlatform;