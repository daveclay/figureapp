figureapp.ImageRotator = (function() {

    function ImageRotator() {
        var self = this;
        var container = div('rotation-container');

        var imageElems = [];
        var maxPixels;
        var pixelsPerImage;
        var lastIndex = 0;
        var previousImage;
        var currentIndex = 0;
        var onCloseCallback = function() {};

        var closeButton = button('X', 'rotator-close-button');
        closeButton.click(function() {
            container.hide();
            onCloseCallback();
        });

        var debug = div('debug');
        var menu = div('rotator-menu');
        menu.append(closeButton);
        menu.append(debug);
        container.append(menu);
        container.hide();

        this.getElement = function() {
            return container;
        };

        this.onClose = function(callback) {
            onCloseCallback = callback;
        };

        this.showImages = function(images) {
            $.each(imageElems, function(elem) {
                elem.remove();
            });
            imageElems = [];

            $.each(images, function(i, imageUrl) {
                if (imageUrl.indexOf("-thumbnail") < 0) {
                    var imgElem = img(imageUrl, 'rotation-image');
                    imgElem.on("mousedown", function(event) {
                        event.preventDefault();
                    });

                    imgElem.css({
                        '-moz-transform': 'scale(.6)',
                        '-webkit-transform': 'scale(.6)'
                    });

                    imageElems.push(imgElem);
                }
            });

            $.each(imageElems, function(idx, elem) {
                elem.hide();
                container.append(elem);
            });

            var width = 500;
            maxPixels = width - (width * 0.1); // leave a little room on the sides.
            pixelsPerImage = Math.round(maxPixels / imageElems.length);

            previousImage = imageElems[0];

            container.show();
            self.showImageAtIndex(0);
        };

        this.init = function() {
            container.hammer({
                drag_lock_to_axis: true
            }).on("dragleft dragright", function(event) {
                    event.preventDefault();
                    event.gesture.preventDefault();
                    self.handleHammer(event);
                });
            $('html').bind("keydown", function(event) {
                if (event.keyCode == 37) {
                    self.previousImage();
                } else if (event.keyCode == 39) {
                    self.nextImage();
                }
            });
        };

        this.showImageAtIndex = function(idx) {
            var newImage = imageElems[idx];
            if (previousImage !== newImage) {
                newImage.show();
                previousImage.hide();
                previousImage = newImage;
            }
            newImage.show();
        };

        this.previousImage = function() {
            currentIndex++;
            currentIndex = currentIndex % imageElems.length;
            this.showImageAtIndex(currentIndex);
        };

        this.nextImage = function() {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = imageElems.length + currentIndex;
            }
            currentIndex = currentIndex % imageElems.length;
            this.showImageAtIndex(currentIndex);
        };

        this.backward = function(gesture) {
            this.forward(gesture);
        };

        this.forward = function(gesture) {
            var deltaX = gesture.deltaX;
            currentIndex = Math.floor(Math.abs(deltaX) / pixelsPerImage);
            if (deltaX < 0) {
                currentIndex = lastIndex - currentIndex;
                if (currentIndex < 0) {
                    currentIndex = imageElems.length + currentIndex;
                }
            } else {
                currentIndex = lastIndex + currentIndex;
            }

            currentIndex = currentIndex % imageElems.length;

            debug.text(lastIndex + "  " + currentIndex);
            this.showImageAtIndex(currentIndex);
        };

        this.handleHammer = function(ev) {
            ev.gesture.preventDefault();
            switch (ev.type) {
                case 'dragright':
                    this.forward(ev.gesture);
                    break;
                case 'dragleft':
                    this.backward(ev.gesture);
                    break;
                case 'swipeleft':
                    ev.gesture.stopDetect();
                    lastIndex = currentIndex;
                    break;
                case 'swiperight':
                    ev.gesture.stopDetect();
                    lastIndex = currentIndex;
                    break;
                case 'release':
                    lastIndex = currentIndex;
                    break;
            }
        };
    }

    return new ImageRotator();
})();
