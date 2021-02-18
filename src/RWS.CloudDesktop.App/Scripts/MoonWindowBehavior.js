
var Me;
window.onload = function () {
    var windows = window.parent;
    Me = windows.windows[parseInt(window.frameElement.parentNode.parentNode.getAttribute("id").replace("window", ""))];
    var parent = window.location.indexOf("parentWindow");
    var parentWindow = (parent > 0)
    var childs;
 
}

document.onmousemove = function(e) {    
    e = window.event || e;
    if (!window.top.over) {
        window.top.over = window.frameElement;

    } else if (window.top.over.parentNode.parentNode.id != window.frameElement.parentNode.parentNode.id) {
        window.top.over = window.frameElement;
    }
    window.top.mouseMove(e, "w");
    return e;
}

document.onmouseup = function(e) 
{
    e = window.event || e;
    window.top.mouseUp(e);    
    return e;
}
//document.onmousedown = function() {
//   // window.parent.childrequestfocus(window.frameElement.id);
//}
