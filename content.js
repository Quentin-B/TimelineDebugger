var fa;
var jqueryScript;
var scrubberLib;
var mainScript;
var el;

//Inject overlay html in the main page if the URL is match (localhost)
function show(){

    $.get(chrome.extension.getURL('/index.html'), function(data) {  
        $(data).appendTo('body');


        /* Fonts */
        fa = document.createElement('style');
        fa.type = 'text/css';
        fa.id = "styleTLD";
        fa.textContent = '@font-face { '
            + 'font-family: CaviarDreams; '
            + 'src: url("' + chrome.extension.getURL('fonts/CaviarDreams-webfont.eot') + '"); '
            + 'src: url("' + chrome.extension.getURL('fonts/CaviarDreams-webfont.eot?#iefix') + '") format("embedded-opentype"), '
            + 'url("' + chrome.extension.getURL('fonts/CaviarDreams-webfont.woff') + '") format("woff"), '
            + 'url("' + chrome.extension.getURL('fonts/CaviarDreams-webfont.ttf') + '") format("truetype"), '
            + 'url("' + chrome.extension.getURL('fonts/CaviarDreams-webfont.svg#CaviarDreams') + '") format("svg");'
            + '}';
        document.head.appendChild(fa);
        
        /* draggableLib */
        draggableLib = document.createElement('script');
        draggableLib.src = chrome.extension.getURL('libs/Draggable.js');
        (document.head||document.documentElement).appendChild(draggableLib);
        draggableLib.onload = function() {
            draggableLib.parentNode.removeChild(draggableLib);

            /* scrubberLib */
            scrubberLib = document.createElement('script');
            scrubberLib.src = chrome.extension.getURL('libs/scrubber-master/scrubber.js');
            (document.head||document.documentElement).appendChild(scrubberLib);
            scrubberLib.onload = function() {
                scrubberLib.parentNode.removeChild(scrubberLib);

                //Inject javascript in the main page
                mainScript = document.createElement('script');
                mainScript.src = chrome.extension.getURL('main.js');
                (document.head||document.documentElement).appendChild(mainScript);
                mainScript.onload = function() {
                    mainScript.parentNode.removeChild(mainScript);
                };
            };
        };
    });
}

function showHide() {  
    el = document.getElementById("TLDContainer");
    fa = document.getElementById("styleTLD");
    if(el){
        window.dispatchEvent(new CustomEvent('remove_listeners'));
    }else{  
        show();
        window.addEventListener('listeners_removed', listenersRemoved);
    }
}

function listenersRemoved(){
    el = document.getElementById("TLDContainer");
    fa = document.getElementById("styleTLD");
    if(fa)
        fa.parentNode.removeChild(fa);
    if(el)
        el.parentNode.removeChild(el);
}

showHide();