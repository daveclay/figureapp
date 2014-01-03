/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

figureapp.AppContext = { };

(function(AppContext) {

    var logger = figureapp.LoggingContext.logger;
    var MockContext = figureapp.MockContext;
    var fileManager = figureapp.FileManager;
    var imageManager = figureapp.ImageManager;

    var IMAGES_DIR = "images/figures/nedah040";

    function App() {
        var logger = null;

        this.initialize = function() {
            this.bindEvents();
        };

        this.bindEvents = function() {
            var self = this;
            document.addEventListener('deviceready', function() {
                self.onDeviceReady();
            }, false);
        };

        this.getLogger = function() {
            return logger;
        };

        this.getFileSystemHelper = function() {
            return fileSystemHelper;
        };
    }

    function FigureDrawingApp() {
        var self = $.extend(this, new App());

        var fileSystemHelper = null;
        var imageApi = null;
        var rootView = null;
        var imageGallery = null;

        this.onDeviceReady = function() {
            // injection
            imageApi = new ImageApi(imageManager);
            rootView = new RootView();
            imageGallery = new ImageGallery();

            /*
            imageApi.loadFigureImage(function(image) {
                rootView.setView(imageGallery);
                imageGallery.addImage(image);
            });
            */

            imageApi.loadFigureImages(function(images) {
                rootView.clearLoadingPage();
                rootView.setView(imageGallery);
                $.each(images, function(i, image) {
                    imageGallery.addImage(image);
                });
            });
        };
    }

    /**
     * @constructor
     */
    function ImageApi(imageManager) {
        var self = this;

        this.loadFigureImages = function(successCallback) {
            var imagePaths = imageManager.getImageFilePaths();
            successCallback(imagePaths);
        };

        this.loadFigureImage = function(successCallback) {
            var path = "images/figures/nedah040/nedah040_19-scaled.png";
            // Note: this works.
            // fileSystemHelper.openFileFromRelativePath(path, successCallback);
        };
    }

    function View(viewElement) {

        this.setView = function(view) {
            var elem = view.buildUI();
            viewElement.append(elem);
        };
    }

    function RootView() {
        var body = $('#main');
        var self = $.extend(this, new View(body));

        this.clearLoadingPage = function() {
            $(body.find(".ui-loader")).each(function(i, elem) {
                elem.remove();
            });
        };
    }

    /**
     *
     * @constructor
     */
    function ImageGallery() {
        var container = div('image-gallery-container');
        var self = $.extend(this, new View(container));

        this.addImage = function(image) {
            var elem = img(image);
            container.append(elem);
        };

        this.buildUI = function() {
            return container;
        };
    }

    AppContext.app = new FigureDrawingApp();
    AppContext.initialize = function() {
        AppContext.app.initialize();
    };

    if ( ! isMobileDevice()) {

        // tests.
        if ( ! window.resolveLocalFileSystemURI) {
            window.resolveLocalFileSystemURI = function(path, successCallback, errorCallback) {
                successCallback(MockContext.newMockFileEntry(path));
            };
        }

        setTimeout(function() {
            var evento = document.createEvent('Events');
            evento.initEvent('deviceready',true,false);
            document.dispatchEvent(evento);
        }, 1000);
    }
})(figureapp.AppContext);
