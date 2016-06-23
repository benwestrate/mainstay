/**
 *  This is the main file for componentInitializer
 */

'use strict';
/**
 *  This is the main file for componentInitializer
 */

var React               = require( 'react' );
var ReactDOM            = require( 'react-dom' );
var _                   = require( 'lodash' );
var Provider            = require( 'react-redux' ).Provider;


module.exports = function( pageComponents, templateComponents ){


    /*
     * Loop over each component on the page
     */

    pageComponents.components.forEach( ( component, number, componentArry ) => {

        /**
         * Check to see if the component matches one included
         * in the template
         */

        if( templateComponents[ component.name ] ){
            initilizeComponents( templateComponents[ component.name ], component, store, useRedux );
        }

    } );

    return store;

};

function initilizeComponents( templateComponent, pageComponent, store,  useRedux ){

    pageComponent.instances.forEach( ( component, number, componentArry ) => {

        /*
         * check to see if the component is a basic component
         */
        if( templateComponent.hasOwnProperty( 'init' ) ){

            if( useRedux ) {
                templateComponent.init( component.config, component.data, store );
            } else{
                templateComponent.init( component.config, component.data );
            }

        }

        /*
         * check to see if the component is a react component
         */
        if( templateComponent.hasOwnProperty( 'component' ) ){

            if( useRedux ){
                /**
                 *  Wrap component in a provider component that will provide
                 *  the component with the hooks to access the global redux
                 *  store
                 */

                let elementToBindTo = document.querySelector('[data-hook="' + component.config.hook + '"]');

                if( elementToBindTo ){
                    ReactDOM.render(
                        <Provider store={store}>
                            <templateComponent.component data={component.config}/>
                        </Provider>,
                        elementToBindTo
                    );
                }
            } else {

                /**
                 * loop over each instance of the component found on
                 * the page and initilize it
                 */
                let elementToBindTo = document.querySelector('[data-hook="' + component.config.hook + '"]');

                if( elementToBindTo ){
                    ReactDOM.render(
                        <templateComponent.component data={component.config}/>,
                        document.querySelector('[data-hook="' + component.config.hook + '"]')
                    );
                }

            }


        }

    } );

}
