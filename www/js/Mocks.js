
figureapp.MockContext = {};

(function(mockContext) {

    var logger = figureapp.LoggingContext.logger;

	var files = [
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
		"nedah040_24-scaled.png",
		"nedah040_25-scaled.png",
		"nedah040_26-scaled.png",
		"nedah040_27-scaled.png",
		"nedah040_28-scaled.png"
	];

    function MockReader(path) {
        this.readEntries = function(successCallback, errorCallback) {
            $.each(files, function(i, filename) {
                successCallback(new MockFileEntry(path + filename));
            });
        }
    }

    function MockFileEntry(path) {
        this.fullPath = function() {
            return path;
        };

        this.isDirectory = function() {
            var dir = path.indexOf("png") < 0;
            return dir;
        };

        this.isFile = function() {
            return ! this.isDirectory();
        };

        this.createReader = function() {
            return new MockReader(path);
        };
    }

    mockContext.newMockFileEntry = function(path) {
        return new MockFileEntry(path);
    }

})(figureapp.MockContext);
