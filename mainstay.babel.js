/**
 *  This is the main file for componentInitializer
 */

var React            = require('react');
var ReactDOM 	     = require( 'react-dom' );
var { Provider } 	 = require( 'react-redux' );


module.exports = function( pageComponents, templateComponents, store, useRedux ){


    /*
     * Loop over each component on the page
     */

    for( var i in pageComponents.components ) {

        var component = pageComponents.components[ i ];

        /*
         * Loop over each component included in the template and
         * render it if its a react component, or initilize it if
         * its not
         */

        for( var templateComponentName in templateComponents ){

            var templateComponent = templateComponents[ templateComponentName ];

            /**
             * Check to see if the component matches one included
             * in the template
             */

            if( component.name === templateComponentName ){

                /*
                 * check to see if the component is a react component
                 */

                if( templateComponent.reactComponent ){

                    /**
                     * loop over each instance of the component found on
                     * the page and initilize it
                     */
                    for ( let instanceIndex = 0; instanceIndex < component.instances.length; instanceIndex++ ){

                        let instance = component.instances[ instanceIndex ];

                        for (var z = 0; z < instance.data.length; z++) {
                            var data = instance.data[z];

                            if( useRedux ) {
                                ReactDOM.render(
                                    <Provider store={ store }>
                                        <templateComponent.component
                                            config={instance.config}
                                            data={data} />
                                    </Provider>,
                                    document.querySelector('[data-hook="' + data.hook + '"]')
                                );
                            } else {
                                ReactDOM.render(
                                    <templateComponent.component
                                        config={instance.config}
                                        data={data} />,
                                    document.querySelector('[data-hook="' + data.hook + '"]')
                                );
                            }

                        }

                    }

                } else {

                    /**
                     * loop over each instance of the component found on
                     * the page and initilize it
                     */
                    for ( let instanceIndex = 0; instanceIndex < component.instances.length; instanceIndex++ ){

                        let instance = component.instances[ instanceIndex ];

                        for (var z = 0; z < instance.data.length; z++) {

                            var data = instance.data[z];

                            templateComponent.init(
                                {
                                    config : instance.config,
                                    data: data
                                }
                            );

                        }

                    }

                }

            }


        }
    }


};
