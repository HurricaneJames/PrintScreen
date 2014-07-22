function __PrintScreen__removePrintMedia() {
  function isPrintQuery(mediaText) {
    var media = mediaText.toLowerCase();
    // not the greatest logic, but basically look for print rules that do not also include screen
    return media.indexOf('print') >= 0 && !isScreenQuery(media);
  }

  function isScreenQuery(mediaText) {
    var media = mediaText.toLowerCase();
    return media.indexOf('screen') >= 0;
  }

  function convertMedia(media) {
    if(media && media.mediaText) {
      if(isPrintQuery(media.mediaText)) {
        media.mediaText = media.mediaText.replace(/print/i, "not all");
      }else if(isScreenQuery(media.mediaText)) {
        media.mediaText = media.mediaText.replace(/screen/i, "all");
      }
    }
  }

  function convertStyleSheet(stylesheet) {
    convertMedia(stylesheet.media);
    if(stylesheet.rules) {
      for(var i=0; i<stylesheet.rules.length; i++) {
        convertMedia(stylesheet.rules[i].media);
      }
    }
  }

  var stylesheets = document.styleSheets;
  for(var i=0; i<stylesheets.length; i++) {
    convertStyleSheet(stylesheets[i]);
  }

  // it seems to print a blank page if the DOM does not have time to rebuild
  setTimeout(function() { window.print(); }, 1000);
}
__PrintScreen__removePrintMedia();