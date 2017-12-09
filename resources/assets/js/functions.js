webpackJsonp([2],{

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(37);


/***/ }),

/***/ 37:
/***/ (function(module, exports) {

function getLatLong(data) {
    $.each(data, function () {
        var counter = 0;
        var longitude = "";
        var latitude = "";
        for (var property in this) {
            if (counter == 0) {
                counter++;
            } else if (counter == 1) {
                longitude = this[property];
                counter++;
            } else if (counter == 2) {
                latitude = this[property];
            }
        }
        c = longitude + "," + latitude + "<br>";
        document.getElementById('text').innerHTML += c;
    });
}

/***/ })

},[36]);