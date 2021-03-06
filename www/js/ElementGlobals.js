function span(cssClass) {
    var elem = $('<span/>');
    if (cssClass) elem.addClass(cssClass);
    return elem;
}

function div(cssClass) {
    var div = $('<div/>');
    if (cssClass) div.addClass(cssClass);
    return div;
}

function img(src, cssClass) {
    var img = $('<img/>');
    if (src) img.attr("src", src);
    if (cssClass) img.addClass(cssClass);
    return img;
}

function button(value, css) {
    var button = inputElem("button", css);
    button.val(value);
    return button;
}

function textInputElem(name, value, css) {
    var input = inputElem("text", css);
    input.attr("name", name);
    input.attr("value", value);
    return input;
}

function inputElem(type, css) {
    var input = $('<input/>');
    if (css) input.addClass(css);
    input.attr("type", type);
    return input;
}

function textareaElem(name, value, css) {
    var elem = $("<textarea/>");
    if (css) elem.addClass(css);
    elem.attr("name", name);
    elem.attr("value", value);
    return elem;
}

