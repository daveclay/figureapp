var performancetest = {};

(function(p) {

    function AppContext() {
        var self = this;
        var elem = div('sprite');

        document.addEventListener('touchstart', function(event) {

        }, false);

        document.addEventListener('touchstart', function(event) {

        }, false);

        this.buidlUI = function() {
            return elem;
        };

        this.handleTouch = function(event) {
            event.preventDefault();
            var touch = event.touches[0];
            console.log("Touch x:" + touch.pageX + ", y:" + touch.pageY);

            elem.css({
                top: touch.pageX,
                top: touch.pageY
            });
        };
    }

    p.AppContext = new AppContext();

})(performancetest);