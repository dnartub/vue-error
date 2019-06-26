import { ClientException, ClientExceptionType } from "./ClientException.ts";

export default {
    name: 'error-overlay',
    props: [
        /*
         * объект класса ClientException
         * */
        "clientError",
        /*
         * Функция обработки кнопки "Обновить"
         * 
         */
        "cbRefresh"],
    data() {
        return {
        }
    },

    created() {
    },

    watch: {
    },

    computed: {
        errorMessage() {
            if (!this.clientError) {
                return "";
            }
            return (this.clientError as ClientException).message;
        },
        errorType() {
            if (!this.clientError) {
                return ClientExceptionType.Error;
            }
            return (this.clientError as ClientException).type;
        },
        errorTypeString() {
            switch (this.errorType) {
                case ClientExceptionType.Warning:
                    return "Warning";
                case ClientExceptionType.Error:
                    return "Error";
            }
            return "";
        },
        errorStack() {
            if (!this.clientError) {
                return "";
            }
            let clError = this.clientError as ClientException
            return clError.stack + "\r\n" + clError.savedStack;
        },

        showIconWarning() {
            return this.errorType == ClientExceptionType.Warning;
        },
        showIconError() {
            return this.errorType == ClientExceptionType.Error;
        },
        showRefreshBtn() {
            return (typeof this.cbRefresh == "function");
        }
    },

    methods: {
        onRefresh() {
            this.cbRefresh();
        },
    }
}