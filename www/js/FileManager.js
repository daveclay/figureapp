
figureapp.FileManager = (function() {

    /**
     // http://docs.phonegap.com/en/3.3.0/cordova_file_file.md.html#FileSystem
     * @constructor
     */
    function FileManager() {
        var self = this;
        var fileSystem;

        this.getAbsoluteFilePath = function(file) {
            var path = window.location.pathname;
            path = path.substr( 0, path.length - 10 );
            return 'file://' + path + file;
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
         */
        this.openFileFromRelativePath = function(path, successCallback) {
            var absolutePath = this.getAbsoluteFilePath(path);
            var errorCallback = function(error) {
                logger.error("Couldn't load file from " + absolutePath + ": " + error.code);
            };
            this.openFileFromAbsolutePath(absolutePath, successCallback, errorCallback);
        };

        this.openFileFromAbsolutePath = function(path, successCallback, errorCallback) {
            // http://simonmacdonald.blogspot.com/2011/12/on-fourth-day-of-phonegapping-creating.html
            //window.resolveLocalFileSystemURI(path, successCallback, errorCallback);
            /*
             var success = function(dir) {
             alert("Got a directory! " + dir);
             };
             var failure = function(error) {
             alert("Failure opening directory " + path + ": " + error.code);
             };
             fileSystem.root.getDirectory(path, {create: false}, success, failure);
             */

            /*
             var request = new XMLHttpRequest();
             request.open("GET", this.getAbsoluteFilePath(IMAGES_DIR), true);
             request.onreadystatechange = function() {//Call a function when the state changes.
             if (request.readyState == 4) {
             if (request.status == 200 || request.status == 0) {
             alert(request.responseText);
             } else {
             alert("fuck, that didnt work");
             }
             }
             };
             request.send();
             */
        };

        this.requestFileSystemStorage = function(callback) {
            var success = function(_filesystem) {
                alert("Got a filesystem! " + _filesystem);
                fileSystem = _filesystem;
                callback();
            };

            var failure = function(error) {
                alert("Failed to open file system " + error);
            };

            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, success, failure);
        };
    }

    return new FileManager();
})();
