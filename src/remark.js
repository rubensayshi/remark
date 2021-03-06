var api = require('./remark/api')
  , dom = require('./remark/dom')
  , controller = require('./remark/controller')
  , dispatcher = require('./remark/dispatcher')
  , highlighter = require('./remark/highlighter')
  , slideshow = require('./remark/slideshow')
  , resources = require('./remark/resources')
  ;

dom.exports.remark = api;

dom.on('load', function () {
  var sourceElement = dom.getElementById('source')
    , slideshowElement = dom.getElementById('slideshow')
    ;

  if (!assureElementsExist(sourceElement, slideshowElement)) {
    return;
  }

  sourceElement.style.display = 'none';

  styleDocument();
  setupSlideshow(sourceElement, slideshowElement);
});

function assureElementsExist (sourceElement, slideshowElement) {
  if (!sourceElement) {
    dom.alert('remark error: source element not present.');
    return false;
  }

  if (!slideshowElement) {
    dom.alert('remark error: slideshow element not present.');
    return false;
  }

  return true;
}

function styleDocument () {
  var styleElement = dom.createElement('style')
    , headElement = dom.getElementsByTagName('head')[0]
    ;

  styleElement.type = 'text/css';
  styleElement.innerHTML = resources.documentStyles;
  styleElement.innerHTML += highlighter.cssForStyle();

  headElement.insertBefore(styleElement, headElement.firstChild);
}

function setupSlideshow (sourceElement, slideshowElement) {
  var source = sourceElement.innerHTML
    , show
    ;

  show = slideshow.create(source, slideshowElement);
  controller.initialize(show);
  dispatcher.initialize();
}
