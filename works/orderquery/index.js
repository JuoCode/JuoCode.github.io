jade.templates = jade.templates || {};
jade.templates['index'] = (function(){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<!DOCTYPE html><html lang="en"><head><title>Simple Web App</title><link href="styles/main.css" type="text/css" rel="stylesheet"></head><body><h1>Herrooo!</h1><script src="scripts/app.js" type="text/javascript"></script><script src="//localhost:35729/livereload.js"></script></body></html>');
}
return buf.join("");
};
})();