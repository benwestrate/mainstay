/**
 *  This is the main file for componentInitializer
 */

 var React   	= require( 'react' );


module.exports = function( pageComponents, templateComponents ){


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

                        let instanceData = component.instances[ instanceIndex ].config;

                        React.render( React.createElement(templateComponent.component, {data: instanceData}),
                                        document.querySelector('[data-hook="' + instanceData.hook + '"]')
                                    );

                    }

                } else {

                    /**
                     * loop over each instance of the component found on
                     * the page and initilize it
                     */
                    for ( let instanceIndex = 0; instanceIndex < component.instances.length; instanceIndex++ ){

                        let instanceData = component.instances[ instanceIndex ].config;

                        templateComponent.init( instanceData );

                    }

                }

            }


        }
    }


};
