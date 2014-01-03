
figureapp.ImageManager = (function() {

    var fileManager = figureapp.FileManager;

    function ImageManager() {
        var fileNames = [
            "nedah040_01-scaled.png",
            "nedah040_01-thumbnail.png",
            "nedah040_02-scaled.png",
            "nedah040_03-scaled.png",
            "nedah040_04-scaled.png",
            "nedah040_05-scaled.png",
            "nedah040_06-scaled.png",
            "nedah040_07-scaled.png",
            "nedah040_08-scaled.png",
            "nedah040_09-scaled.png",
            "nedah040_10-scaled.png",
            "nedah040_11-scaled.png",
            "nedah040_12-scaled.png",
            "nedah040_13-scaled.png",
            "nedah040_14-scaled.png",
            "nedah040_15-scaled.png",
            "nedah040_16-scaled.png",
            "nedah040_17-scaled.png",
            "nedah040_18-scaled.png",
            "nedah040_19-scaled.png",
            "nedah040_20-scaled.png",
            "nedah040_21-scaled.png",
            "nedah040_22-scaled.png",
            "nedah040_23-scaled.png",
            "nedah040_24-scaled.png"
        ];

        var imageDirectory = "images/figures/nedah040/";

        var files = [];
        $.each(fileNames, function(i, filename) {
            var file = fileManager.getAbsoluteFilePath(imageDirectory + filename);
            files.push(file);
        });

        this.getImageFilePaths = function() {
            return files;
        }
    }

    return new ImageManager();
})();

