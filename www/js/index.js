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

var AppContext = { };

(function(AppContext) {
    function Logger() {
        this.log = function(msg) {
            console.log(new Date() + ": " + msg);
        };

        this.error = function(msg) {
            alert(msg);
        }
    }

    var logger = new Logger();

    /**
     // http://docs.phonegap.com/en/3.3.0/cordova_file_file.md.html#FileSystem
     * @constructor
     */
    function FileSystemHelper() {
        var self = this;
        var fileSystem;

        this.getAbsoluteFilePath = function(file) {
            var path = window.location.pathname;
            path = path.substr( 0, path.length - 10 );
            return 'file://' + path + "/" + file;
        };

        /**
         Properties

         isFile: Always true. (boolean)
         isDirectory: Always false. (boolean)
         name: The name of the FileEntry, excluding the path leading to it. (DOMString)
         fullPath: The full absolute path from the root to the FileEntry. (DOMString)

         NOTE: The following attribute is defined by the W3C specification, but is not supported:
         filesystem: The file system on which the FileEntry resides. (FileSystem)

         Methods

         getMetadata: Look up metadata about a file.
         setMetadata: Set metadata on a file.
         moveTo: Move a file to a different location on the file system.
         copyTo: Copy a file to a different location on the file system.
         toURL: Return a URL that can be used to locate a file.
         remove: Delete a file.
         getParent: Look up the parent directory.
         createWriter: Creates a FileWriter object that can be used to write to a file.
         file: Creates a File object containing file properties.

         * @param path
         * @param successCallback
         * @param errorCallback
         */
        this.openFileFromRelativePath = function(path, successCallback, errorCallback) {
            var absolutePath = this.getAbsoluteFilePath(path);
            if (!errorCallback) {
                errorCallback = function(error) {
                    logger.error(error);
                }
            }
            this.openFileFromAbsolutePath(absolutePath, successCallback, errorCallback);
        };

        this.openFileFromAbsolutePath = function(path, successCallback, errorCallback) {
            window.resolveLocalFileSystemURI(path, successCallback, errorCallback);
        };

        this.requestFileSystemStorage = function() {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, this.onFilesystemSuccess, this.onFileSystemFail);
        };

        this.onFilesystemSuccess = function(_fileSystem) {
            logger.log("success opening file system: " + _fileSystem);
            fileSystem = _fileSystem;
        };

        this.onFileSystemFail = function(error) {
            logger.error("error opening file system: " + error);
        }
    }

    function App() {
        var logger = null;
        var fileSystemHelper = null;

        this.initialize = function() {
            fileSystemHelper = new FileSystemHelper();
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
            fileSystemHelper = this.getFileSystemHelper();
            imageApi = new ImageApi(fileSystemHelper);
            rootView = new RootView();
            imageGallery = new ImageGallery();

            imageApi.loadFigureImage(function(image) {
                rootView.clearLoadingPage();
                rootView.setView(imageGallery);
                imageGallery.imageWasLoaded(image);
            });
        };
    }

    /**
     *
     * @param fileSystemHelper
     * @constructor
     */
    function ImageApi(fileSystemHelper) {

        this.loadFigureImage = function(successCallback) {
            var path = "images/figures/nedah040/nedah040_19-scaled.png";
            fileSystemHelper.openFileFromRelativePath(path, successCallback);
        };
    }

    function View(viewElement) {

        this.setView = function(view) {
            var elem = view.buildUI();
            viewElement.append(elem);
        };
    }

    function RootView() {
        var body = $('body');
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

        this.imageWasLoaded = function(image) {
            var elem = img(image.fullPath);
            container.append(elem);
        };

        this.buildUI = function() {
            return container;
        };
    }

    AppContext.app = new FigureDrawingApp();

    if ( ! isMobileDevice()) {

        // tests.
        if ( ! window.resolveLocalFileSystemURI) {
            window.resolveLocalFileSystemURI = function(path, successCallback, errorCallback) {
                successCallback({
                    fullPath: path
                });
            };
        }

        setTimeout(function() {
            var evento = document.createEvent('Events');
            evento.initEvent('deviceready',true,false);
            document.dispatchEvent(evento);
        }, 3000);
    }
})(AppContext);
