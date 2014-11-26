<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>Unblock Me</title>
    <meta name="viewport"
          content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no,target-densitydpi=device-dpi"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>

    <meta name="full-screen" content="true"/>
    <meta name="screen-orientation" content="portrait"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="360-fullscreen" content="true"/>

    <style>
        body {
            text-align: center;
            background: #666666;
            padding: 0;
            border: 0;
            margin: 0;
            height: 100%;
        }
        html {
            -ms-touch-action: none; /* Direct all pointer events to JavaScript code. */
            overflow: hidden;
        }
        div, canvas {
			border:1px solid #333333;
            display:block;
            position:absolute;
            margin: 0 auto;
            padding: 0;
        }
    </style>
</head>
<body>
<div style="position:relative;" id="gameDiv"></div>
<script>var document_class = "Main";</script><!--这部分内容在编译时会被替换，要修改文档类，请到工程目录下的egretProperties.json内编辑。-->
<script src="launcher/egret_require.js"></script>
<script src="launcher/egret_loader.js"></script>
<script src="launcher/game-min.js?v=112602"></script>
<script>
    egret_h5.startGame();
</script>
</body>
</html>