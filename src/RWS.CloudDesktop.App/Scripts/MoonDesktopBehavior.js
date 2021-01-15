var desk, task, startmnu, mnu, timerToCloseMenu, emenu, windows, windowWithFocus, resizeCount, windowToDrag, windowToResize, mouseOffset,over;
var windowFocusManagerZI= 10;

function menuEnum()
{
   this.show = true;
   this.hide = false;
}  

function initializerVars()
{
    desk = ge('desktop');
    task = ge('taskbar');
    startmnu = ge('start');
    mnu = ge('menu');
    windows = new Array();
    windowsUserShowOrder = new Array();

    emenu = new menuEnum();    
    resizeCount = 0;
    windowToDrag = null;
    windowToResize = null;
    mouseOffset = null; 
    over = null;   
}

function handleStartEvents()
{
    startmnu.onmouseover = function(){ managerMenu(emenu.show); }
    startmnu.onmouseout = function(){  managerMenu(emenu.hide); }
    mnu.onmouseover = function(){ managerMenu(emenu.show); }
    mnu.onmouseout = function(){  managerMenu(emenu.hide); } 
    document.onmousemove = function(ev){ mouseMove(ev,"d"); }
    document.onmouseup = function(){ mouseUp(); }   
}

function callInitFunctions()
{
    resizeManager();
    menu(); 
}

function getMouseOffset(target,e) 
{
    ev = e || window.event;
    
    var docPos = getPosition(target);
    var mousePos = mouseCoords(ev);
    return { x: mousePos.x - docPos.x, y: mousePos.y - docPos.y };
}

function mouseCoords(ev) {
    if (ev.pageX || ev.pageY)
        return { x: ev.pageX, y: ev.pageY };    
    return {
        x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y: ev.clientY + document.body.scrollTop - document.body.clientTop
    };
}

function getPosition(e) 
{
    var left = 0;
    var top = 0;

    while (e.offsetParent)
    {
        left += e.offsetLeft;
        top += e.offsetTop;
        e = e.offsetParent;
    }
    left += e.offsetLeft;
    top += e.offsetTop;
    return { x: left, y: top };
}

function mouseUp() 
{
    if (windowToDrag) {
        windowToDrag.getElementsByTagName("iframe")[0].style.visibility = "visible";
        windowToDrag = null;
        
    }
    if (windowToResize) {        
        windowToResize.style.visibility = "visible";
        windowToResize = null;
    }
    over = null;
    desk.style.cursor = 'default';
    return false;
}

function mouseMove(ev,from) 
{
    ev = ev || window.event;
    var mousePos = mouseCoords(ev);
    
    if (windowToDrag) 
    {       
        var wtop = 0;
        var wleft = 0;
        
        if (from == "w") 
        {
            wtop = over.parentNode.parentNode.offsetTop + (mousePos.y - mouseOffset.y) + 25;

            if (wtop > (desk.offsetHeight - 25))
               wtop, windowToDrag.style.top = desk.offsetHeight - 25 + 'px';
            else
                windowToDrag.style.top = wtop + 'px';

            wleft = over.parentNode.parentNode.offsetLeft + (mousePos.x - mouseOffset.x) + 9;

            if ((mousePos.x - mouseOffset.x + 9) > (desk.offsetWidth - 5)) 
            {
                wleft,windowToDrag.style.left = desk.offsetWidth - 5 + 'px';
                alert('ok');
            }
            else if (wleft < ((1 - windowToDrag.offsetWidth) + 5)) 
            {
                wleft = windowToDrag.style.left = ((1 - windowToDrag.offsetWidth) + 5) + 'px';
                alert('od');
            }
            else
                windowToDrag.style.left = wleft + 'px';                  
        }
        else 
        {
            wtop = (mousePos.y - mouseOffset.y);

            if (wtop > (desk.offsetHeight - task.offsetHeight - 22))
                wtop = windowToDrag.style.top = desk.offsetHeight - task.offsetHeight - 22 + "px";
            else if (wtop < 0)
                wtop = windowToDrag.style.top = 0 + "px";
            else
                windowToDrag.style.top = wtop + "px";

            wleft = (mousePos.x - mouseOffset.x);

            if ((mousePos.x - mouseOffset.x) > (desk.offsetWidth - 5))
                wleft = windowToDrag.style.left = desk.offsetWidth - 4 + "px";
            else if ((mousePos.x - mouseOffset.x) < ((1 - windowToDrag.offsetWidth) + 4))
                wleft = windowToDrag.style.left = ((1 - windowToDrag.offsetWidth) + 4) + "px";
            else
                windowToDrag.style.left = wleft + "px";
        }
        windowToDrag.lastWleft = wleft;
        windowToDrag.lastWtop = wtop;
    } 
    else if (windowToResize) 
    {
        var width = 400;
        var height = 400;
        if (from == "w") 
        {
            var valor1 = windowToResize.parentNode.parentNode.offsetTop - over.parentNode.parentNode.offsetTop;

            if ((mousePos.y) > desk.offsetHeight - task.offsetHeight + 5)
               height, windowToResize.style.height = desk.offsetHeight - windowToResize.parentNode.parentNode.offsetTop + 'px';
            else {
                if (windowToResize.parentNode.parentNode.id != over.parentNode.parentNode.id && (mousePos.y - valor1) > 0)
                    height, windowToResize.style.height = (mousePos.y - valor1) + 'px';
                else if ((mousePos.y - valor1) > 0)
                    height, windowToResize.style.height = (mousePos.y - valor1) + 'px';
            }
            valor1 = windowToResize.parentNode.parentNode.offsetLeft - over.parentNode.parentNode.offsetLeft;
            if ((mousePos.x - valor1) > 395)
               width, windowToResize.parentNode.style.width = (mousePos.x - valor1) + 'px';
        }
        else 
        {
            if ((mousePos.y) > desk.offsetHeight - task.offsetHeight) 
                height, windowToResize.style.height = desk.offsetHeight - windowToResize.parentNode.parentNode.offsetTop - task.offsetHeight - 33 + 'px';
            else
                height, windowToResize.style.height = (mousePos.y - windowToResize.parentNode.parentNode.offsetTop) < 60 ? 17 + 'px' : (mousePos.y - windowToResize.parentNode.parentNode.offsetTop) - 30 + 'px';

           width, windowToResize.parentNode.style.width = (mousePos.x - windowToResize.parentNode.parentNode.offsetLeft) < 400 ? 400 + 'px' : (mousePos.x - windowToResize.parentNode.parentNode.offsetLeft) - 5 + 'px';
        }
        windowToResize.lastHeight = height;
        windowToResize.lastWidth = width;
    }
    return false;
}

function clone(obj) 
{
    var newObj = (obj instanceof Array) ? [] : {};    
    for (i in obj) {
        newObj[i] = obj[i]
    } 
    return newObj;
}     
   
function resizeManager()
{
    for(i in windows)
    {
        if(windows[i].isMaximized)
        {
            windows[i].isMaximized = false;
            windowResMax(windows[i]);
        }
        else  
          if(windows[i].divWindow.offsetHeight > (desk.offsetHeight - task.offsetHeight) && desk.offsetHeight > 100)
          {
             windows[i].divWindow.style.top = 0;
             windows[i].iframePage.style.height = desk.offsetHeight - task.offsetHeight- 30 +"px";  
          }         
    }     
}    

function newWindow(src, title) {
    var win = this;

    this.isMaximized = false;
    this.isMinimized = false;
    this.isRestore = false;
    this.lastWleft = 20;
    this.lastWtop = 20;
    this.lastHeight = 400;
    this.lastWidth = 400;
    this.number = windows.length;

    // create elements;     
    this.divWindow = document.createElement("div");
    this.divBody = document.createElement("div");
    this.divBackHead = document.createElement("div");
    this.divHead = document.createElement("div");
    this.spanTopCorner = document.createElement("span");
    this.divTitle = document.createElement("div");
    this.spanMenu = document.createElement("span");
    this.spanMin = document.createElement("span");
    this.spanMax = document.createElement("span");
    this.spanClose = document.createElement("span");
    this.iframePage = document.createElement("iframe");
    this.divBackBottom = document.createElement("div");
    this.divBottom = document.createElement("div");
    this.spanBottomCorner = document.createElement("span");
    this.spanRes = document.createElement("span");

    this.divWinTaskBar = document.createElement("div");
    this.divWinTaskBarTitle = document.createElement("div");
    this.divWinTaskBarClose = document.createElement("div");

    //build structure;      
    this.divWindow.appendChild(this.divBody);
    this.divBody.appendChild(this.divBackHead);
    this.divBody.appendChild(this.iframePage);
    this.divBody.appendChild(this.divBackBottom);
    this.divBackHead.appendChild(this.divHead);
    this.divHead.appendChild(this.spanTopCorner)
    this.divHead.appendChild(this.divTitle)
    this.divHead.appendChild(this.spanMenu);
    this.spanMenu.appendChild(this.spanMin)
    this.spanMenu.appendChild(this.spanMax)
    this.spanMenu.appendChild(this.spanClose);
    this.divBackBottom.appendChild(this.divBottom);
    this.divBottom.appendChild(this.spanBottomCorner);
    this.divBottom.appendChild(this.spanRes);

    this.divWinTaskBar.appendChild(this.divWinTaskBarTitle);
    this.divWinTaskBar.appendChild(this.divWinTaskBarClose);

    //setting properties;
    this.divWindow.className = "window";
    this.divWindow.setAttribute("id", "window" + windows.length);
    this.divBody.className = "windowBorderLeft";
    this.divBackHead.className = "windowBackHead";
    this.divHead.className = "windowBorderTop";
    this.divHead.setAttribute("id", "windowHead" + windows.length);
    this.spanTopCorner.className = "windowTopCorner";
    this.divTitle.className = "windowTitle";
    this.divTitle.setAttribute("id", "windowTitle" + windows.length);
    this.divTitle.innerHTML = title;
    this.spanMenu.className = "windowMnu";
    this.spanMin.className = "windowMnuMin";
    this.spanMax.className = "windowMnuMax";
    this.spanClose.className = "windowMnuClose";
    this.iframePage.className = "windowPage";
    this.iframePage.setAttribute("frameborder", "0");
    this.iframePage.setAttribute("src", src);
    this.divBackBottom.className = "windowBackBottom";
    this.divBottom.className = "windowBorderBottom";
    this.spanBottomCorner.className = "windowBottomCorner";
    this.spanRes.className = "windowResize";
    this.divWinTaskBar.className = "windowTaskbar";
    this.divWinTaskBarTitle.className = "windowTaskbarTitle";
    this.divWinTaskBarTitle.innerHTML = title;
    this.divWinTaskBarClose.className = "windowTaskbarClose";

    //handle events
    this.divWindow.onmousedown = function () { windowSetFocus(win) };
    this.divWindow.ondblclick = function () { windowResMax(win) };
    this.divHead.onmousedown = function (e) { windowDrag(win, e) };
    this.spanRes.onmousedown = function (e) { windowResize(win, e) };
    this.spanClose.onclick = function () { windowClose(win) };
    this.spanMax.onclick = function () { windowResMax(win) };
    this.spanMin.onclick = function (e) { windowMin(win, e) };
    this.divWinTaskBarTitle.onclick = function (e) { windowMin(win, e) };
    this.divWinTaskBarClose.onclick = function () { windowClose(win) };

    //add Window on Environment      
    desk.appendChild(this.divWindow);
    task.appendChild(this.divWinTaskBar);

    //setting window position on Environment      
    
    //this.divWindow.style.left = (20) + "px";
    //this.divWindow.style.top = (20) + "px";

    //add window to window List      
    windows[(windows.length?windows.length:0)] = win;
    
    windowResMax(win);
    windowSetFocus(win);
    return false;
}

function windowDrag(win,e)
{
    if (!win.isMaximized) 
    {
        var ev = window.event || e;
        windowToDrag = win.divWindow;
        win.iframePage.style.visibility = "hidden";
        mouseOffset = getMouseOffset(win.divHead, ev);
        desk.style.cursor = 'move';

    }
    windowSetFocus(win);
    return false;
}

function windowResize(win,e)
{    
    if (!win.isMaximized) 
    {
        var ev = window.event || e;
        windowToResize = win.iframePage;
        win.iframePage.style.visibility = "hidden";
        mouseOffset = getMouseOffset(win.spanRes, ev);
        desk.style.cursor = 'se-resize';
    }
    windowSetFocus(win);
    return false;
}

function windowSetFocus(win)
{
    if (windowWithFocus && (windowWithFocus.number == win.number))
        return;

    if(windowWithFocus && !windowWithFocus.isMinimized)
    {
        windowWithFocus.divWinTaskBar.style.backgroundColor = "transparent";  
        windowWithFocus.divWindow.className = "windowNoFocus";
    }    
    win.divWinTaskBar.style.backgroundColor = "#333333";
    win.divWindow.className = "window";
    win.divWindow.style.zIndex = (windows.length + windowFocusManagerZI);

    windowFocusManagerZI++;
      
    windowWithFocus = win;    
}

function windowClose(win)
{
    if(win.number == (windows.length -1))
        windows.pop();
    else
        windows[win.number] = windows.pop();     
    desk.removeChild(win.divWindow);
    task.removeChild(win.divWinTaskBar);  
}

function windowResMax(win)
{
     if(win.isMaximized)
      {
        win.divWindow.style.left = (win.lastWleft) + "px";
        win.divWindow.style.top =  (win.lastWtop) + "px";
        win.divWindow.style.right = '';
        win.divWindow.style.bottom = '';
        win.iframePage.style.height = win.lastHeight+"px";
        win.divBody.style.width = win.lastWidth+"px";
        win.spanMax.className = "windowMnuMax";
        win.isMaximized = false;
      }
      else
      {
        win.divWindow.style.left = -6+"px";
        win.divWindow.style.right = -6+"px";
        win.divWindow.style.top = -1+"px";
        win.divWindow.style.bottom = task.offsetHeight-6+"px";
        win.divBody.style.width = win.divWindow.offsetWidth - 16 + "px";
        win.iframePage.style.height = win.divWindow.offsetHeight - 28+"px";
        win.spanMax.className = "windowMnuRes";
        win.isMaximized = true;             
      }               
}
function windowMin(win,e)
{    
    var from = e? e.target.nodeName : window.event.srcElement.nodeName;
    
    if(from == "DIV")
        if(!win.isMinimized)
            if(windowWithFocus && !(win.number === windowWithFocus.number))
            {
                windowSetFocus(win);
                return;
            }        
    if(win.isMinimized)
    {
        win.divWindow.style.display = "inline";        
        win.isMinimized = false;
        windowSetFocus(win);
    }
    else
    {
        win.divWindow.style.display = "none";
        win.divWinTaskBar.style.background = "gray";
        win.isMinimized = true;
    }
}
function managerMenu(state) {
    if (state) {
        if (typeof (timerToCloseMenu) != "undefined")
            clearTimeout(timerToCloseMenu)

        mnu.style.display = 'block';
        mnu.style.bottom = task.offsetHeight + 'px';
    }
    else
        timerToCloseMenu = setTimeout('mnu.style.display="none"', 500);
}  
    
function menu() {

    var lis = mnu.getElementsByTagName('li');
    for (x in lis) {
        lis[x].onmouseover = function() {
            window.clearTimeout(this.time);
            this.mul = this.getElementsByTagName('ul')[0];
            if (this.mul != null) {
                this.mul.style.display = 'block';
                this.mul.style.top = "0px";
                if(!this.topmul)
                    this.topmul = (-this.mul.offsetHeight-30) + 'px';
                this.mul.style.top = this.topmul;
                this.mul.childNodes[this.mul.childNodes.length - 2].style.borderBotton = "1px solid black";
            }
        }
        lis[x].onmouseout = function() {
            this.mul = this.getElementsByTagName('ul')[0];
            if (this.mul != null) {
                var ul = this.mul;
                this['time'] = setTimeout(function() { ul.style.display = "none"; }, 200);
            }
        }
    }
}

window.addEventListener("load", function () {
    initializerVars();
    handleStartEvents();
    callInitFunctions();
});
window.onresize = function () { resizeManager(); }