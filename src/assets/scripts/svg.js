import script from "scriptjs";

export default {
    install(Vue) {
        Vue.prototype.$SVG = new Promise(resolve => {
            script.order(
                [
                    "https://cdn.jsdelivr.net/npm/svg.js@2.7.1/dist/svg.min.js",
                    "https://cdn.jsdelivr.net/npm/svg.select.js@3.0.1/dist/svg.select.min.js",
                    "https://cdn.jsdelivr.net/npm/svg.resize.js@1.4.3/dist/svg.resize.min.js",
                    "http://static.inside.test/102/svg.draw.js"
                ],
                () => {
                    resolve(window.SVG);
                }
            );
        });
    }
};
