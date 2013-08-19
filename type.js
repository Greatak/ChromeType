function isCharacterKeyPress(evt) {
    if (typeof evt.which == "undefined") {
        // This is IE, which only fires keypress events for printable keys
        return true;
    } else if (typeof evt.which == "number" && evt.which > 0) {
        // In other browsers except old versions of WebKit, evt.which is
        // only greater than zero if the keypress is a printable key.
        // We need to filter out backspace and ctrl/alt/meta key combinations
        return !evt.ctrlKey && !evt.metaKey && !evt.altKey && evt.which != 8;
    }
    return false;
}

var typeNoise = [];
var tn = document.createElement('audio');
tn.src = chrome.extension.getURL('sound/key.ogg');
typeNoise.push(tn);
var tn = document.createElement('audio');
tn.src = chrome.extension.getURL('sound/return.ogg');
typeNoise.push(tn);
typeNoise[0].play();

var textAreas = document.getElementsByTagName("textarea");
for (var i = 0; i <= textAreas.length; i++){
	var input = textAreas[i];
	input.onkeypress = function(evt) {
		evt = evt || window.event;

		if (isCharacterKeyPress(evt)) {
			if (evt.which == 13){
				typeNoise[1].currentTime = 0;
				typeNoise[1].play();
			} else{
				typeNoise[0].currentTime = 0;
				typeNoise[0].play();
			}
		}
	};
}