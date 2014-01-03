figureapp.LoggingContext = {};

(function(loggingContext) {

    function Logger() {

        this.log = function(msg) {
            $('#logger').append(msg + "<br/>");
            console.log(new Date() + ": " + msg);
        };

        this.error = function(msg) {
            alert(msg);
        }
    }

    loggingContext.logger = new Logger();

})(figureapp.LoggingContext);
