"use strict";!function(){var a=angular.module("rgModels",[]);a.factory("rgModel",["$rootScope","$http","$q",function(a,b,c){var d={};return d.set=function(a,b){if("string"==typeof a){var c={};c[a]=b,angular.extend(this,c)}else angular.extend(this,a||{});return this},d.fetch=function(a){var d=c.defer(),e=this,f=angular.extend({url:this.uri+this.id,method:"GET"},a||{});return b(f).success(function(a){var b=e.parseResponse(a);e.set(b),d.resolve(b)}).error(function(a){d.reject(a)}),d.promise},d.parseResponse=function(a){return a},d.extend=function(a){a.prototype=angular.extend({},this,a.prototype)},d}])}(),angular.module("angularcmxApp",["ngResource","ngRoute","ngTouch","ngAnimate","ui.bootstrap","rgModels"]).value("libList",["rev01","rev02","sov01","rev03","rev04"]).factory("myCache",["$cacheFactory",function(a){return a("myData")}]).config(["$routeProvider","$locationProvider",function(a,b){b.html5Mode(!0),a.when("/",{templateUrl:"views/main.html",controller:"BookCtrl"}).when("/cmx/:bookId",{templateUrl:"views/main.html",controller:"BookCtrl"}).when("/issues/:bookId",{templateUrl:"views/main.html",controller:"BookCtrl"}).when("/issues/:bookId/:startIndex",{templateUrl:"views/main.html",controller:"BookCtrl"}).when("/embed/:bookId",{templateUrl:"views/iframe.html",controller:"EmbedCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("angularcmxApp").factory("BookList",["$http","$q","myCache","rgModel",function(a,b,c,d){function e(a){this.id="",this.list=[],this.currentIdx=0,this.uri="//canvasbookapi.herokuapp.com/books",this.set(a)}return e.prototype.parseResponse=function(a){for(var b=a.data,c=b.length;c--;)b[c].fullTitle=b[c].series.name+" #"+b[c].issue;return{list:b}},e.prototype.next=function(){var a=this.currentIdx+1===this.list.length?0:this.currentIdx+1;return this.list[a]},e.prototype.previous=function(){var a=this.currentIdx-1<0?this.list.length-1:this.currentIdx-1;return this.list[a]},d.extend(e),e}]),angular.module("angularcmxApp").factory("BookModel",["rgModel",function(a){function b(a){this.id="",this.uri="//canvasbookapi.herokuapp.com/books/",this.set(a)}return b.prototype.parseResponse=function(a){return a.data[0]},a.extend(b),b}]),angular.module("angularcmxApp").controller("BookCtrl",["$scope","$rootScope","$routeParams","$location","$modal","BookModel","BookList","libList","myCache",function(a,b,c,d,e,f,g,h,i){function j(){var b=e.open({templateUrl:"views/partials/readMoreModal.html",scope:a});return a.modalOpen=!0,a.hotkeys=!1,b.result.then(function(b){a.modalOpen=!1,a.hotkeys=!0,b&&d.url("/issues/"+b)})["finally"](function(){a.modalOpen=!1,a.hotkeys=!0}),a.readMoreModal=b,a.readMoreModal}angular.extend(a,{bookModel:new f,books:new g,bookId:c.bookId||"rev04",bookFormat:c.format||"classic",startIndex:c.startIndex?c.startIndex-1:0,embedWidth:"400",detailsMin:!1,modalOpen:!1}),a.onEnd=function(b){a.modalOpen===!1&&(a.readMore=a.books[b](),a.readMore.direction=b,j())},a.loadBook=function(b){var c={params:{format:b||a.bookFormat}};a.bookModel.set("id",a.bookId).fetch(c).then(function(){a.bookModel.view.startIndex=parseInt(a.startIndex,10)})},a.loadBookList=function(){var b=a.books;b.set({list:i.get("bookListData"),currentIdx:h.indexOf(a.bookId)}),b.list||b.fetch({params:{ids:h.join(",")}}).then(function(){i.put("bookListData",b.list)})},a.loadBook(),a.loadBookList(),a.$on("canvasbook:changepanel",function(){a.modalOpen===!0&&a.readMoreModal.dismiss()}),a.$on("canvasbook:end",function(b,c){a.onEnd(c.direction)})}]),angular.module("angularcmxApp").directive("canvasbook",["$rootScope","$document",function(a,b){return{restrict:"EA",templateUrl:"/views/partials/canvasbook.html",replace:!0,scope:{viewModel:"=",bookId:"=",bookFormat:"="},link:function(c,d,e){var f=d.find("canvas")[0],g=c.canvasbook=Canvasbook();c.changepanel=function(b){var c="next"===b?g.isLast:g.isFirst,d="canvasbook:";c?d+="end":(g[b](),document.querySelector("body").scrollIntoView(),d+="changepanel"),a.$broadcast(d,{direction:b,currentIndex:g.currentIndex})},c.$watch("viewModel",function(a){a&&(f.height=a.height||450,f.width=a.width||800,g.load(a,f))}),e.$attr.hotkeys&&b.on("keydown",function(a){if("false"!==e.hotkeys)switch(a.keyCode){case 39:document.querySelector(".forward").click();break;case 37:document.querySelector(".backward").click()}})}}}]).directive("resizeCanvas",["$window",function(a){return{restrict:"A",link:function(b,c,d){var e=c.find("canvas"),f=e[0],g=109,h=2,i=a.innerHeight-g,j=a.innerWidth-h;f.style.zoom=j/i>=16/9?i/f.height:j/f.width,"responsive"===d.resizeCanvas&&angular.element(a).on("resize",function(){var b=a.innerHeight-g,c=a.innerWidth-h;f.style.zoom=c/b>=16/9?b/f.height:c/f.width})}}}]).directive("socialShare",["$window",function(a){return{restrict:"AC",link:function(b,c){var d=c[0];b.$watch("bookModel.view",function(e,f){if(e!==f){c.empty();var g=b.bookModel,h="http://revengercomic.com/issues/"+g.id,i=g.series.name+" "+g.issue+": "+g.title,j=g.thumb;a.stWidget.addEntry({service:"twitter",element:d,url:h,title:i,type:"large",image:j}),a.stWidget.addEntry({service:"facebook",element:d,url:h,title:i,type:"large",image:j})}})}}}]);