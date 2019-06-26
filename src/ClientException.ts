import ErrorOverlay from "./error-overlay.vue"
import Vue from "vue";

export enum ClientExceptionType {
    Error = 0,
    Warning = 1,
}

/**
 *  Class-inheritor of Error
 *  with saved stack and error-ui managment
 * */

export class ClientException extends Error{
    type: ClientExceptionType;
    savedStack: string;

    static exception(err: any, type?: ClientExceptionType) {
        return new ClientException(err, type);
    }

    constructor(err: any, type?: ClientExceptionType) {
        if (typeof err === "string") {
            super(err);
        }
        // http error
        else if (err.hasOwnProperty('statusText')) {
            super(`Error at request. StatusCode ${err.status}. ${err.statusText}`);
        }
        else if (err.hasOwnProperty('message')) {
            super(err.message);
        }
        else {
            super(JSON.stringify(err));
        }

        if (err instanceof ClientException) {
            this.type = err.type;
        }
        else if (type) {
            this.type = type;
        }
        else {
            this.type = ClientExceptionType.Error
        }

        this.savedStack = "";
        if (err.hasOwnProperty('stack')) {
            this.savedStack += err.stack;
        }
        if (err.hasOwnProperty('savedStack')) {
            this.savedStack += "\r\n"+err.savedStack;
        }
    };

    /**
     * Write to console
     * */
    toConsole() {
        switch (this.type) {
            case ClientExceptionType.Warning:
                console.warn(this);
                return;
            case ClientExceptionType.Error:
                console.error(this);
                return;
        }
    }

    /**
     * show ui-notification
     * 'Vue.prototype.$notify' initialization required
     * */
    notify() {
        switch (this.type) {
            case ClientExceptionType.Warning:
                Vue.prototype.$notify({/*options for warning*/});
                return;
            case ClientExceptionType.Error:
                Vue.prototype.$notify({/*options for error*/ });
                return;
        }
    }

    /**
     * Show info over the top component
     * (dynamicaly create ErrorOverlayComponent)
     * @param componentInstance
     */
    toComponent(componentInstance: Vue, cbRefresh) {
        let clientError = this;

        // create class
        let ErrorOverlayComponent = Vue.extend({
            extends: ErrorOverlay,
        });

        // create component-instance (hook 'creted()' triggered)
        let instance = new ErrorOverlayComponent({
            parent: componentInstance,
            propsData: { // pass clientError and cbRefresh to ErrorOverlayComponent props
                clientError: clientError,
                cbRefresh: cbRefresh
            } 
        });

        // create $el (hook 'mounted()' triggered)
        instance.$mount();

        // add $el to parent (overlay parent by error-info)
        Vue.nextTick(() => {
            componentInstance.$el.appendChild(instance.$el);
        });
    }
}

// assign with vue-prototype ('this' inside all vue options)
Vue.prototype.$exception = ClientException.exception;
