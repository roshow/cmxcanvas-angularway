'use strict';
  
angular.module('angularcmxApp', [
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngTouch',
  'ngAnimate',
  'ui.bootstrap'
])
  .factory('myCache', function($cacheFactory) {
    return $cacheFactory('myData');
  })
  .value('templateStrings', function (){
    var strVar="";
    strVar += "<div class=\"navbar navbar-inverse navbar-static-top\" role=\"navigation\">";
    strVar += "  <div class=\"container\">";
    strVar += "    <div class=\"navbar-header\">";
    strVar += "      <button type=\"button\" class=\"navbar-toggle\" ng-init=\"navbarCollapsed = true\" ng-click=\"navbarCollapsed = !navbarCollapsed\">";
    strVar += "        <span class=\"sr-only\">Toggle navigation<\/span>";
    strVar += "        <span class=\"icon-bar\"><\/span>";
    strVar += "        <span class=\"icon-bar\"><\/span>";
    strVar += "        <span class=\"icon-bar\"><\/span>";
    strVar += "      <\/button>";
    strVar += "      <a class=\"navbar-brand\" href=\"#\">CAPTAIN JONES<\/a>";
    strVar += "    <\/div>";
    strVar += "    <div class=\"navbar-collapse collapse\" collapse=\"navbarCollapsed\">";
    strVar += "      <ul class=\"nav navbar-nav navbar-right\">";
    strVar += "      <li>";
    strVar += "        <a ng-href=\"http:\/\/pete-lepage.squarespace.com\/\">Back to Pete's<\/a>";
    strVar += "      <\/li>";
    strVar += "        <li class=\"dropdown\">";
    strVar += "          <a href class=\"dropdown-toggle\">More Books <span class=\"caret\"><\/span><\/a>";
    strVar += "          <ul class=\"dropdown-menu\" role=\"menu\">";
    strVar += "            <li ng-repeat=\"book in books\">";
    strVar += "              <a href=\"#\/books\/{{book.id}}\">{{book.series.name}} #{{book.issue}}<\/a>";
    strVar += "            <\/li>";
    strVar += "          <\/ul>";
    strVar += "        <\/li>     ";
    strVar += "      <\/ul>";
    strVar += "      <ul class=\"nav navbar-nav navbar-right\">";
    strVar += "      <\/ul>";
    strVar += "    <\/div><!--\/.nav-collapse -->";
    strVar += "  <\/div>";
    strVar += "<\/div>";
    strVar += "<div class=\"top-container\">";
    strVar += "    <div class=\"book-info\">";
    strVar += "        <h3 class=\"cmx-credits\">";
    strVar += "            <span class=\"issue-name\">#{{bookData.issue}}: {{bookData.title}}<\/span>";
    strVar += "            <br \/>";
    strVar += "            <a ng-repeat=\"creator in bookData.creators\" ng-href=\"{{creator.url}}\"><span ng-if=\"$middle || $last\">, <\/span>{{creator.credit}}: {{creator.name}}<\/a>";
    strVar += "        <\/h3>";
    strVar += "";
    strVar += "        <ul class=\"book-style\" ng-if=\"bookData.formats\">";
    strVar += "            <li class=\"btn-format\" ng-if=\"bookData.formats.length > 1\" ng-repeat=\"format in bookData.formats\"  ng-class=\"{ 'current-panel': bookData.view.id === format.view_id }\" ng-click=\"getBook(bookData.id, format.format)\">{{format.format}}<\/li>";
    strVar += "        <\/ul>";
    strVar += "        <div class=\"clearfix\"><\/div>";
    strVar += "";
    strVar += "    <\/div>";
    strVar += "";
    strVar += "    <div class=\"canvas-wrapper\">";
    strVar += "        ";
    strVar += "        <canvasbook book-data=\"bookData\" current-view=\"currentView\" animate-resize><\/canvasbook>";
    strVar += "        ";
    strVar += "        <div class=\"my-elm\" ng-show=\"currentView === 'wasFirst' || currentView === 'wasLast'\">";
    strVar += "            <div class=\"canvas-overlay\" >";
    strVar += "                <div class=\"calltoaction\" ng-show=\"currentView === 'wasFirst'\">";
    strVar += "                    Previous Issue: {{books[previousBook].series.name}} #{{books[previousBook].issue}}<br \/>";
    strVar += "                    <a class=\"btn-format\" ng-click=\"goToBook(books[previousBook].id);event.stopPropogation();\">read now<\/a>";
    strVar += "                    <br \/>";
    strVar += "                    <a class=\"btn-format\" ng-click=\"hideOverlay()\">back to this issue<\/a>";
    strVar += "                <\/div>";
    strVar += "                <div class=\"calltoaction\" ng-show=\"currentView === 'wasLast'\">";
    strVar += "                    Next Issue: {{books[nextBook].series.name}} #{{books[nextBook].issue}}<br \/>";
    strVar += "                    <a class=\"btn-format\" ng-click=\"goToBook(books[nextBook].id);event.stopPropogation();\">read now<\/a>";
    strVar += "                    <br \/>";
    strVar += "                    <a class=\"btn-format\" ng-click=\"hideOverlay()\">back to this issue<\/a>";
    strVar += "                <\/div>";
    strVar += "";
    strVar += "            <\/div>";
    strVar += "        <\/div>";
    strVar += "";
    strVar += "    <\/div>";
    strVar += "";
    strVar += "";
    strVar += "    <!-- <div class=\"tocDiv\">    ";
    strVar += "        <ul class=\"cmx-toc\">";
    strVar += "            <li ng-class=\"{ 'current-panel': cmxCanvas.currentView.panel == $index }\" ng-repeat=\"panel in bookData.view.panels\" ng-click=\"cmxCanvas.goTo($index,0)\">";
    strVar += "                {{$index}}";
    strVar += "            <\/li>";
    strVar += "        <\/ul>";
    strVar += "    <\/div> -->";
    strVar += "";
    strVar += "<\/div>";
    strVar += "";

    var strVar2="";
    strVar2 += "<div id=\"cmx-container\" ng-swipe-right=\"changepanel('previous')\" ng-swipe-left=\"changepanel('next')\">";
    strVar2 += "    <canvas height=\"450\" width=\"800\"><\/canvas>";
    strVar2 += "    <ul class=\"buttons\">";
    strVar2 += "        <li class=\"book-prev\" ng-click=\"changepanel('previous');event.stopPropogation();\"><\/li>";
    strVar2 += "        <li class=\"book-next\" ng-click=\"changepanel('next');event.stopPropogation();\"><\/li>";
    strVar2 += "    <\/ul>";
    strVar2 += "<\/div> ";

    return {
      main: strVar,
      canvas: strVar2
    };

  })

  .config(function ($routeProvider, $sceDelegateProvider, templateStrings) {

    $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://roshow.net/**']);
    $routeProvider
      .when('/books', {
        templateUrl: 'http://roshow.net/captainjonessq/views/library.html',
        controller: 'LibraryCtrl'
      })
      .when('/cmx/:bookId', {
        templateUrl: 'http://roshow.net/captainjonessq/views/main.html',
        controller: 'CmxCtrl'
      })
      .when('/books/:bookId', {
        template: templateStrings.main,
        controller: 'CmxCtrl'
      })
      .when('/embed/:bookId', {
        templateUrl: 'views/iframe.html',
        controller: 'EmbedCtrl'
      })
      .when('/beth', {
        templateUrl: 'views/beth.html',
        controller: 'BethCtrl'
      })

      .when('/dev/:bookId', {
        templateUrl: 'views/main.html',
        controller: 'DevCtrl'
      })
      .otherwise({
        redirectTo: '/books/cj00'
      });
  });
