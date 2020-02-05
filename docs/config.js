let path = require("path");
let pkg = require("./package.json");

module.exports = {
    "source": __dirname,
    "target": path.join(__dirname, "www"),
    "theme": "@siimple/press-theme-siimple/config.js",
    "base": "/",
    "title": "{{page.data.title}} | siimple documentation",
    "site": {
        "analytics": null
    },
    //Custom head tags
    "head": [
        ["link", {"rel": "stylesheet", "href": "/assets/css/style.css"}]
    ],
    //Plugins
    "plugins": []
};

