/**
 * Module Dependencies
 */

var assert = require('assert');
var domify = require('domify');
var inject = require('inject-at-cursor');
var selection = window.getSelection;

/**
 * Tests
 */

describe('inject(content)', function() {
  var el;

  beforeEach(function() {
    el = domify('<p>hi there, jane!</p>');
    document.body.appendChild(el);
    sel = selection();
    sel.removeAllRanges();
  });

  afterEach(function() {
    document.body.removeChild(el);
  });

  it('should insert text at the cursor', function() {
    selectAt(el, 'j');
    inject('mary');
    assert('hi there, maryjane!' == el.textContent);
  });

  it('should insert html at the cursor', function() {
    selectAt(el, 'j');
    inject('<strong>mary</strong>');
    assert('hi there, <strong>mary</strong>jane!' == el.innerHTML);
  });

  // TODO: fix me. Getting the selection node / offset is different
  // on safari and firefox. Should be fixed in another component..
  //
  // it('should place cursor after injected html', function() {
  //   selectAt(el, 'j');
  //   inject('<strong>mary</strong>');
  //   var sel = selection();
  //   console.log(sel.focusNode);
  // });
});


function selectAt(elem, str) {
  var range = document.createRange();
  var i = elem.textContent.indexOf(str);
  range.setStart(elem.firstChild, i);
  range.setEnd(elem.firstChild, i);
  sel.addRange(range);
}
