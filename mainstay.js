'use strict';

/**
 *  This is the main file for componentInitializer
 */

var React = require('react');
var ReactDOM = require('react-dom');

var _require = require('react-redux'),
    Provider = _require.Provider;

module.exports = function (pageComponents, templateComponents, store, useRedux) {

    /*
     * Loop over each component on the page
     */

    for (var i in pageComponents.components) {

        var component = pageComponents.components[i];

        /*
         * Loop over each component included in the template and
         * render it if its a react component, or initilize it if
         * its not
         */

        for (var templateComponentName in templateComponents) {

            var templateComponent = templateComponents[templateComponentName];

            /**
             * Check to see if the component matches one included
             * in the template
             */

            if (component.name === templateComponentName) {

                /*
                 * check to see if the component is a react component
                 */

                if (templateComponent.reactComponent) {

                    /**
                     * loop over each instance of the component found on
                     * the page and initilize it
                     */
                    for (var instanceIndex = 0; instanceIndex < component.instances.length; instanceIndex++) {

                        var instance = component.instances[instanceIndex];

                        for (var z = 0; z < instance.data.length; z++) {
                            var data = instance.data[z];

                            if (useRedux) {
                                ReactDOM.render(React.createElement(
                                    Provider,
                                    { store: store },
                                    React.createElement(templateComponent.component, {
                                        config: instance.config,
                                        data: data })
                                ), document.querySelector('[data-hook="' + data.hook + '"]'));
                            } else {
                                ReactDOM.render(React.createElement(templateComponent.component, {
                                    config: instance.config,
                                    data: data }), document.querySelector('[data-hook="' + data.hook + '"]'));
                            }
                        }
                    }
                } else {

                    /**
                     * loop over each instance of the component found on
                     * the page and initilize it
                     */
                    for (var _instanceIndex = 0; _instanceIndex < component.instances.length; _instanceIndex++) {

                        var _instance = component.instances[_instanceIndex];

                        for (var z = 0; z < _instance.data.length; z++) {

                            var data = _instance.data[z];

                            templateComponent.init({
                                config: _instance.config,
                                data: data
                            });
                        }
                    }
                }
            }
        }
    }
};
