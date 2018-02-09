/**
 *  This is the main file for componentInitializer
 */

import React        from 'react';
import ReactDOM 	from 'react-dom';
import { Provider } from 'react-redux';
import DataStoar    from 'data-stoar';


const defaultOptions = {
    useReduxProvider  : false,
    reactComponentKey : 'react',
    rootElementKey    : 'hook',
    reduxStore        : null,
    libraryComponents : [],
}

export class Mainstay {
    pageComponents       = [];
    componentsToRender   = [];
    reactComponents      = [];
    javascriptComponents = [];

    constructor( options ){

        options = {
            ...defaultOptions,
            ...options
        }

        if( options.reduxStore !== null ) options.useReduxProvider = true

        this.options = options;

        this.getPageData       = this.getPageData.bind( this );
        this.getPageComponents = this.getPageComponents.bind( this );
        this.filterComponents  = this.filterComponents.bind( this );
        this.render            = this.render.bind( this );
        this.renderReact       = this.renderReact.bind( this );
        this.renderReactRedux  = this.renderReactRedux.bind( this );
        this.initilizeJS       = this.initilizeJS.bind( this );

        this.getPageComponents()
        this.getPageData()

    }

    getPageComponents(){
        let pageComponents  = new DataStoar();
        this.pageComponents = pageComponents.components;
    }

    getPageData() {

        this.componentsToRender = this.pageComponents.map( ( pageComponent, index ) => {

            let libComponent = this.options.libraryComponents.find( ( lcpt ) => {
                return lcpt.name === pageComponent.name
            } )

            if( libComponent ){
                return {
                    instances : pageComponent.instances,
                    jsClass     : libComponent
                }
            }
        } )

        this.filterComponents();

    }

    filterComponents() {

        this.componentsToRender.forEach( ( component ) => {

            component.instances.forEach( ( instance ) => {

                if( instance.data[ this.options.reactComponentKey ] ){
                    this.reactComponents.push( {
                        data  : instance.data,
                        jsClass : component.jsClass
                    } )
                } else {
                    this.javascriptComponents.push( {
                        data  : instance.data,
                        jsClass : component.jsClass
                    } )
                }

            } )

        } )

    }

    render(){

        if( this.reactComponents.length > 0 ){
            this.options.useReduxProvider ?
                  this.renderReactRedux()
                : this.renderReact()
        }

        if( this.javascriptComponents.length > 0 ){
            this.initilizeJS()
        }

    }

    renderReact(){
        this.reactComponents.forEach( ({ jsClass : Component, data }) => {
            let el = data.element
                ? data.element
                : document.querySelector(
                    `[data-${this.options.rootElementKey}="${data[this.options.rootElementKey]}"]`);
            ReactDOM.render( <Component {...data}/>, el);
        } )
    }

    renderReactRedux(){
        this.reactComponents.forEach( ({ jsClass : Component, data }) => {
            let el = data.element
                ? data.element
                : document.querySelector(
                    `[data-${this.options.rootElementKey}="${data[this.options.rootElementKey]}"]`);

            ReactDOM.render(
                <Provider store={ this.options.reduxStore }>
                    <Component {...data} />
                </Provider>, el );
        } )
    }

    initilizeJS(){
        this.javascriptComponents.forEach( ( { jsClass : Component, data } ) => {
            let el = data.element
                ? data.element
                : document.querySelector(
                    `[data-${this.options.rootElementKey}="${data[this.options.rootElementKey]}"]`);
            this.options.useReduxProvider
                ? new Component( data, el )
                : new Component( data, el, this.options.reduxStore )
        } )
    }


}

export default Mainstay
