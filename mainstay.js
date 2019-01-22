'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Mainstay = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *  This is the main file for componentInitializer
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _dataStoar = require('data-stoar');

var _dataStoar2 = _interopRequireDefault(_dataStoar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultOptions = {
    rootElementKey: 'hook',
    libraryComponents: [],
    renderKey: null,
    additionalProps: null
};

var Mainstay = exports.Mainstay = function () {
    function Mainstay(options) {
        _classCallCheck(this, Mainstay);

        this.pageComponents = [];
        this.componentsToRender = [];
        this.renderComponents = [];
        this.javascriptComponents = [];
        this.instances = [];


        options = _extends({}, defaultOptions, options);

        if (options.renderFunction) {
            if (!options.renderKey) throw "You need a 'renderKey' if you intend to use the render function";
            if (!options.unmount) throw "You need to define an 'unmount' function if intend to use the render function";
        }

        this.options = options;

        this.getPageData = this.getPageData.bind(this);
        this.getPageComponents = this.getPageComponents.bind(this);
        this.filterComponents = this.filterComponents.bind(this);
        this.render = this.render.bind(this);
        this.renderFunction = this.renderFunction.bind(this);
        this.customRenderFunction = this.customRenderFunction.bind(this);
        this.initializeJS = this.initializeJS.bind(this);
        this.initializeAllJSComponents = this.initializeAllJSComponents.bind(this);

        this.getPageComponents();
    }

    _createClass(Mainstay, [{
        key: 'getPageComponents',
        value: function getPageComponents() {
            this.pageComponents = null;
            var pageComponents = new _dataStoar2.default();
            this.pageComponents = pageComponents.components;

            this.getPageData();
        }
    }, {
        key: 'getPageData',
        value: function getPageData() {
            var _this = this;

            this.componentsToRender = this.pageComponents.map(function (pageComponent, index) {

                var libComponent = _this.options.libraryComponents.find(function (libraryComponent) {
                    if (libraryComponent.name === 'Connect') {
                        return libraryComponent.WrappedComponent.name === pageComponent.name;
                    } else {
                        return libraryComponent.name === pageComponent.name;
                    }
                });

                if (libComponent) {
                    return {
                        instances: pageComponent.instances,
                        jsClass: libComponent
                    };
                } else {
                    return {
                        instances: [],
                        jsClass: null
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
                    var type = null;
                    if (instance.data[_this2.options.renderKey]) {
                        _this2.renderComponents.push({
                            data: instance.data,
                            jsClass: component.jsClass
                        });
                        type = 'renderFunction';
                    } else {
                        _this2.javascriptComponents.push({
                            data: instance.data,
                            jsClass: component.jsClass
                        });
                        type = 'js';
                    }

                    _this2.instances.push({
                        data: instance.data,
                        jsClass: component.jsClass,
                        type: type
                    });
                });
            });
        }
    }, {
        key: 'render',
        value: function render() {

            if (this.renderComponents.length > 0) {
                this.customRenderFunction();
            }

            if (this.javascriptComponents.length > 0) {
                this.initializeAllJSComponents();
            }
        }
    }, {
        key: 'customRenderFunction',
        value: function customRenderFunction() {
            this.renderComponents.forEach(this.renderFunction);
        }
    }, {
        key: 'initializeAllJSComponents',
        value: function initializeAllJSComponents() {
            this.javascriptComponents.forEach(this.initializeJS);
        }
    }, {
        key: 'renderFunction',
        value: function renderFunction(_ref) {
            var Component = _ref.jsClass,
                data = _ref.data;

            var el = data.element ? data.element : document.querySelector('[data-' + this.options.rootElementKey + '="' + data[this.options.rootElementKey] + '"]');
            this.options.additionalProps ? this.options.renderFunction(_extends({}, this.options.additionalProps, data), el, Component) : this.options.renderFunction(data, el, Component);
        }
    }, {
        key: 'initializeJS',
        value: function initializeJS(_ref2) {
            var Component = _ref2.jsClass,
                data = _ref2.data;

            var el = data.element ? data.element : document.querySelector('[data-' + this.options.rootElementKey + '="' + data[this.options.rootElementKey] + '"]');
            this.options.additionalProps ? new Component(_extends({}, this.options.additionalProps, data), el) : new Component(data, el);
        }
    }, {
        key: 'unmount',
        value: function unmount() {
            var _this3 = this;

            this.renderComponents.forEach(function (_ref3) {
                var Component = _ref3.jsClass,
                    data = _ref3.data;


                var el = data.element ? data.element : document.querySelector('[data-' + _this3.options.rootElementKey + '="' + data[_this3.options.rootElementKey] + '"]');

                _this3.options.unmount(el, data, Component);
            });
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.unmount();
            this.componentsToRender = [];
            this.renderComponents = [];
            this.javascriptComponents = [];
            this.instances = [];
        }
    }, {
        key: 'reRender',
        value: function reRender() {
            var _this4 = this;

            this.unmount();

            this.componentsToRender = [];
            this.renderComponents = [];
            this.javascriptComponents = [];

            this.getPageComponents();

            setTimeout(function () {
                _this4.render();
            }, 100);
        }
    }, {
        key: 'reRenderComponent',
        value: function reRenderComponent(componentId) {
            var _this5 = this;

            this.getPageComponents();

            this.instances.forEach(function (component) {

                if (component.data[_this5.options.rootElementKey] === componentId) {

                    if (component.type === 'renderFunction') _this5.renderFunction(component);
                    if (component.type === 'js') _this5.initializeJS(component);
                }
            });
        }
    }]);

    return Mainstay;
}();

exports.default = Mainstay;
