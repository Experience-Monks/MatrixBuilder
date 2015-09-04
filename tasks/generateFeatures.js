var fs = require('fs');
var path = require('path');

var features = fs.readdirSync(path.join(path.dirname(require.resolve("caniuse-db/package.json")), "features-json"))
                 .map(function(feature) {
                   feature = feature.replace(/.json$/, '');

                   return "\"" + feature + "\": function() { return require(\"caniuse-db/features-json/" + feature + "\")}";
                 });

fs.writeFileSync(path.join(__dirname, "..", "lib/util/features.js"), "module.exports = {" + features.join(",\n") + "}");