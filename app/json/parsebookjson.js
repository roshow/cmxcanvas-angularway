'use strict';

var file = (process.argv[2] || 'rev03dig.json'),
	bookjson = require('./' + file).data[0],
	fs = require('fs'),
	models = {},
	schema = {};

function clone(a) {
   return JSON.parse(JSON.stringify(a));
}

// schema.metaData = {
// 	_id: String,
// 	id: String,
//     issue: Number,
//     title: String,
//     thumb: String,
//     series: {
//         name: String,
//         id: String
//     },
//     creators: [
//         {
//             name: String,
//             credit: String,
//             url: String
//         }
//     ],
//     view: {
//     	height: Number,
//         width: Number,
//         backgroundColor: String,
//         backgroundTextColor: String,
//         move: {
//             transition: String
//         }
//     },
//     img: {
//         url: String
//     },
//     published: Number
// };

/** metaData **/
models.metaData = clone(bookjson);
delete models.metaData.cmxJSON;
models.metaData.id = models.metaData._id;

/** cmxJSON **/
models.cmxJSON = clone(bookjson.cmxJSON);
models.cmxJSON.forEach(function (panel, i){
	panel.panel = i;
	panel.bookId = models.metaData.id;

	var imgurl = bookjson.img.url || '';
	panel.src = imgurl + panel.src;

	panel.popups = panel.popups || [];
	panel.popups.forEach(function (popup, ii){
		popup.popup = ii;
		popup.src = imgurl + popup.src
	});
});

Object.keys(models).forEach(function (key){
	var filename = bookjson._id + '.' + key + '.json';
	fs.writeFile('./' + filename, JSON.stringify(models[key], null, 4));
});
// fs.writeFile(filename, data, [options], callback)
