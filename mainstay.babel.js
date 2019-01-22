/**
 *  This is the main file for componentInitializer
 */

import DataStoar    from 'data-stoar';


const defaultOptions = {
    rootElementKey    : 'hook',
    libraryComponents : [],
    renderKey         : null,
    additionalProps   : null
}

export class Mainstay {
    pageComponents       = [];
    componentsToRender   = [];
    renderComponents     = [];
    javascriptComponents = [];
    instances            = [];

    constructor( options ){

        options = {
            ...defaultOptions,
            ...options
        }

        if( options.renderFunction ) {
            if( !options.renderKey ) throw "You need a 'renderKey' if you intend to use the render function";
            if( !options.unmount ) throw "You need to define an 'unmount' function if intend to use the render function";
        }

        this.options = options;

        this.getPageData                   = this.getPageData.bind( this );
        this.getPageComponents             = this.getPageComponents.bind( this );
        this.filterComponents              = this.filterComponents.bind( this );
        this.render                        = this.render.bind( this );
        this.renderFunction                = this.renderFunction.bind(this);
        this.customRenderFunction          = this.customRenderFunction.bind( this );
        this.initializeJS                  = this.initializeJS.bind( this );
        this.initializeAllJSComponents     = this.initializeAllJSComponents.bind( this );

        this.getPageComponents()


    }

    getPageComponents(){
        this.pageComponents = null;
        let pageComponents  = new DataStoar();
        this.pageComponents = pageComponents.components;

        this.getPageData()
    }

    getPageData() {

        this.componentsToRender = this.pageComponents.map( ( pageComponent, index ) => {

            let libComponent = this.options.libraryComponents.find( ( libraryComponent ) => {
                if( libraryComponent.name === 'Connect' ){
                    return libraryComponent.WrappedComponent.name === pageComponent.name;
                } else {
                    return libraryComponent.name === pageComponent.name;
                }
            } )

            if( libComponent ){
                return {
                    instances : pageComponent.instances,
                    jsClass   : libComponent
                }
            } else {
                return {
                    instances: [],
                    jsClass: null
                }
            }
        } )

        this.filterComponents();

    }

    filterComponents() {

        this.componentsToRender.forEach( ( component ) => {

            component.instances.forEach( ( instance ) => {
                let type = null;
                if( instance.data[ this.options.renderKey ] ){
                    this.renderComponents.push( {
                        data  : instance.data,
                        jsClass : component.jsClass
                    } )
                    type = 'renderFunction'
                } else {
                    this.javascriptComponents.push( {
                        data  : instance.data,
                        jsClass : component.jsClass
                    } )
                    type = 'js'
                }

                this.instances.push( {
                    data    : instance.data,
                    jsClass : component.jsClass,
                    type    : type
                } )
            } )

        } )

    }

    render(){

        if( this.renderComponents.length > 0 ){
            this.customRenderFunction()
        }

        if( this.javascriptComponents.length > 0 ){
            this.initializeAllJSComponents()
        }

    }

    customRenderFunction(){
        this.renderComponents.forEach( this.renderFunction )
    }

    initializeAllJSComponents(){
        this.javascriptComponents.forEach( this.initializeJS )
    }

    renderFunction({ jsClass : Component, data } ) {
        let el = data.element
            ? data.element
            : document.querySelector(
                `[data-${this.options.rootElementKey}="${data[this.options.rootElementKey]}"]`);
        this.options.additionalProps ?
            this.options.renderFunction( {...this.options.additionalProps,...data}, el, Component ) :
            this.options.renderFunction( data, el, Component );
    }

    initializeJS({ jsClass : Component, data } ) {
        let el = data.element
            ? data.element
            : document.querySelector(
                `[data-${this.options.rootElementKey}="${data[this.options.rootElementKey]}"]`);
        this.options.additionalProps
            ? new Component( {...this.options.additionalProps,...data}, el)
            : new Component( data, el )
    }

    unmount(){

        this.renderComponents.forEach( ({ jsClass : Component, data }) => {

            let el = data.element
                ? data.element
                : document.querySelector(
                    `[data-${this.options.rootElementKey}="${data[this.options.rootElementKey]}"]`);

            this.options.unmount(el, data, Component);
        })

    }

    reset(){
        this.unmount();
        this.componentsToRender   = [];
        this.renderComponents     = [];
        this.javascriptComponents = [];
        this.instances            = [];
    }

    reRender(){
        this.unmount();

        this.componentsToRender = [];
        this.renderComponents = [];
        this.javascriptComponents = [];

        this.getPageComponents();

        setTimeout( () => {
            this.render();
        }, 100 )

    }

    reRenderComponent( componentId ) {
        this.getPageComponents();

        this.instances.forEach( ( component ) => {

            if( component.data[this.options.rootElementKey] === componentId ){

                if( component.type === 'renderFunction' ) this.renderFunction( component )
                if( component.type === 'js' ) this.initializeJS( component )

            }

        } )

    }
}

export default Mainstay
