'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Mainstay = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  This is the main file for componentInitializer
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _dataStoar = require('data-stoar');

var _dataStoar2 = _interopRequireDefault(_dataStoar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
    useReduxProvider: false,
    reactComponentKey: 'react',
    rootElementKey: 'hook',
    reduxStore: null,
    libraryComponents: []
};

var Mainstay = exports.Mainstay = function () {
    function Mainstay(options) {
        _classCallCheck(this, Mainstay);

        this.pageComponents = [];
        this.componentsToRender = [];
        this.reactComponents = [];
        this.javascriptComponents = [];


        options = _extends({}, defaultOptions, options);

        if (options.reduxStore !== null) options.useReduxProvider = true;

        this.options = options;

        this.getPageData = this.getPageData.bind(this);
        this.getPageComponents = this.getPageComponents.bind(this);
        this.filterComponents = this.filterComponents.bind(this);
        this.render = this.render.bind(this);
        this.renderReact = this.renderReact.bind(this);
        this.renderReactRedux = this.renderReactRedux.bind(this);
        this.initilizeJS = this.initilizeJS.bind(this);

        this.getPageComponents();
        this.getPageData();
    }

    _createClass(Mainstay, [{
        key: 'getPageComponents',
        value: function getPageComponents() {
            var pageComponents = new _dataStoar2.default();
            this.pageComponents = pageComponents.components;
        }
    }, {
        key: 'getPageData',
        value: function getPageData() {
            var _this = this;

            this.componentsToRender = this.pageComponents.map(function (pageComponent, index) {

                var libComponent = _this.options.libraryComponents.find(function (lcpt) {
                    return lcpt.name === pageComponent.name;
                });

                if (libComponent) {
                    return {
                        instances: pageComponent.instances,
                        jsClass: libComponent
                    };
                }
            });

            this.filterComponents();
        }
    }, {
        key: 'filterComponents',
        value: function filterComponents() {
            var _this2 = this;

            this.componentsToRender.forEach(function (component) {

                component.instances.forEach(function (instance) {

                    if (instance.data[_this2.options.reactComponentKey]) {
                        _this2.reactComponents.push({
                            data: instance.data,
                            jsClass: component.jsClass
                        });
                    } else {
                        _this2.javascriptComponents.push({
                            data: instance.data,
                            jsClass: component.jsClass
                        });
                    }
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {

            if (this.reactComponents.length > 0) {
                this.options.useReduxProvider ? this.renderReactRedux() : this.renderReact();
            }

            if (this.javascriptComponents.length > 0) {
                this.initilizeJS();
            }
        }
    }, {
        key: 'renderReact',
        value: function renderReact() {
            var _this3 = this;

            this.reactComponents.forEach(function (_ref) {
                var Component = _ref.jsClass,
                    data = _ref.data;

                _reactDom2.default.render(_react2.default.createElement(Component, data), document.querySelector('[data-' + _this3.options.rootElementKey + '="' + data[_this3.options.rootElementKey] + '"]'));
            });
        }
    }, {
        key: 'renderReactRedux',
        value: function renderReactRedux() {
            var _this4 = this;

            this.reactComponents.forEach(function (_ref2) {
                var Component = _ref2.jsClass,
                    data = _ref2.data;

                _reactDom2.default.render(_react2.default.createElement(
                    _reactRedux.Provider,
                    { store: _this4.options.reduxStore },
                    _react2.default.createElement(Component, data)
                ), document.querySelector('[data-' + _this4.options.rootElementKey + '="' + data[_this4.options.rootElementKey] + '"]'));
            });
        }
    }, {
        key: 'initilizeJS',
        value: function initilizeJS() {
            this.javascriptComponents.forEach(function (_ref3) {
                var Component = _ref3.jsClass,
                    data = _ref3.data;


                new Component(data);
            });
        }
    }]);

    return Mainstay;
}();

exports.default = Mainstay;
