define("PubSub", function() {
var PubSub={};(function(d){var c={};var a=-1;var b=function(f,h,e){if(!c.hasOwnProperty(f)){return false}var g=function(){var o=c[f];var k=function(i){return function(){throw i}};for(var m=0,l=o.length;m<l;m++){try{o[m].func(f,h)}catch(n){setTimeout(k(n),0)}}};if(e===true){g()}else{setTimeout(g,0)}return true};d.version="0.1";d.publish=function(e,f){return b(e,f,false)};d.publishSync=function(e,f){return b(e,f,true)};d.subscribe=function(g,f){if(!c.hasOwnProperty(g)){c[g]=[]}var e=(++a).toString();c[g].push({token:e,func:f});return e};d.unsubscribe=function(h){for(var e in c){if(c.hasOwnProperty(e)){for(var g=0,f=c[e].length;g<f;g++){if(c[e][g].token===h){c[e].splice(g,1);return h}}}}return false}}(PubSub));

return PubSub;
});