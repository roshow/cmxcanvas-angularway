<!doctype html>
  <head>
    <base href="/">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- Currently deploying to an apache server, so using php to generate metatags for that.-->
    <?php include 'metatags.php' ?>
    <link rel="stylesheet" href="styles/vendor.20833e0b.css">
    
    <link rel="stylesheet" href="styles/main.69d3bd7b.css">
    <script type="text/javascript">var switchTo5x=true;</script>
    <script type="text/javascript" src="http://w.sharethis.com/button/buttons.js"></script>
    <script type="text/javascript">stLight.options({
        publisher: "06ea2066-6c1c-4ec3-8a42-64b3a3399360",
        shorten:false
    });
    </script>
  </head>

  <body ng-app="angularcmxApp">
    <script type="text/javascript">
        // Good old fashion javascript for a random body class.
        if ( Date.now()%2 === 1 ) { document.querySelector('body').className += ' alt'; }
    </script>
    
    <div class="appcontainer" ng-view=""></div>


    <script src="scripts/vendor.189dac8d.js"></script>

    <script src="scripts/canvasbook.4b9e23b2.js"></script>
    <script src="scripts/scripts.b0998df9.js"></script>


</body>
</html>
