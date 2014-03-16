var fs = require('fs');
var _ = require('lodash');
var ejs = require('ejs');

function readAllText(f) {
    return fs.readFileSync(f).toString();
};


var json = readAllText("app/public/icomoon/selection.json")
var icons = JSON.parse(json).icons;

var names = _.map(icons, function(icon) {
    return icon.properties.name
});

var str = readAllText('icons.ejs')

var ret = ejs.render(str, {
    names: names
});

console.log(ret)



