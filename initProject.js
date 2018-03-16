const fs = require('fs');

function InitProject(root, prjName, namespaceName)
{
    root = root || '../';
    prjName = prjName || '';
    prjName += '/';

    let dirList = [
        root,
        root + 'assets',
        root + 'assets/'+prjName,
        root + 'assets/'+prjName+'atlas/',
        root + 'assets/'+prjName+'csv/',
        root + 'assets/'+prjName+'font/',
        root + 'assets/'+prjName+'image/',
        root + 'assets/'+prjName+'layout/',
        root + 'assets/'+prjName+'sound/',
        root + 'assets/'+prjName+'spine/',
        root + 'scripts/',
        root + 'scripts/'+prjName,
        root + 'scripts/'+prjName+'00_data/',
        root + 'scripts/'+prjName+'01_scene/',
        root + 'scripts/'+prjName+'02_game/',
        root + 'scripts/'+prjName+'03_logic/',
        root + 'scripts/'+prjName+'04_ui/',
    ];

    for( let i = 0; i < dirList.length; i++ )
    {
        if( !fs.existsSync( dirList[i] ) )
        {
            console.log( dirList[i] );
            fs.mkdirSync(dirList[i]);
        }
    }

    let mainStr = stringFormat( mainSample, prjName, namespaceName);
    writeFileToString2( root + 'scripts/'+prjName+'main.js', mainStr );

    let sceneStr = stringFormat( gameSceneSample,  namespaceName);
    writeFileToString2( root + 'scripts/'+prjName+'01_scene/scene_game.js', sceneStr );

    let configStr = stringFormat( dataGameSample,  namespaceName);
    writeFileToString2( root + 'scripts/'+prjName+'00_data/data_config.js', configStr );

    let dataStr = stringFormat( dataConfigSample,  namespaceName);
    writeFileToString2( root + 'scripts/'+prjName+'00_data/data_game.js', dataStr );
}


function writeFileToString( filePath, str )
{
    fs.open(filePath,'w',function(err)
    {
        if( err ) {
            console.log( err );
        }
        fs.writeFile(filePath, str, function (error)
        {
            if( error ) console.log( error );
        })
    });
}

function writeFileToString2( filePath, str )
{
    fs.open(filePath,'wx',function(err)
    {
        if( err ) {
            if( err.code === "EEXIST" )
            {
                console.log( filePath + " 파일이 이미 존재합니다." );
                return;
            }
        }
        fs.writeFile(filePath, str, function (error)
        {
            if( error ) console.log( error );
        })
    });
}


function stringFormat ()
{
    var theString = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }
    return theString;
}

let mainSample = "var CONTAINER = {\n" +
    "    bg : 'bg',\n" +
    "    game : 'game',\n" +
    "    ui : 'ui',\n" +
    "};\n" +
    "\n" +
    "var SCENE = {\n" +
    "    game : 'game',\n" +
    "};\n" +
    "\n" +
    "var EVENT = {\n" +
    "    gameStart : 'gameStart',\n" +
    "    gameOver : 'gameOver',\n" +
    "};\n" +
    "\n" +
    "(function ()\n" +
    "{\n" +
    "\n" +
    "    Red.Preload.load( 'assets/{0}preload.json', function (resources)\n" +
    "    {\n" +
    "        var game = new Red.Game({width:720, height:1280, resolution : 1, antialias : false, backgroundColor : 0x000000});\n" +
    "        game.resources = resources;\n" +
    "\n" +
    "        Object.keys(CONTAINER).forEach(function (t) {\n" +
    "            game.factory.container(t);\n" +
    "        });\n" +
    "\n" +
    "        game.sceneManager.addScne( SCENE.game, new {1}.SceneGame( game ) );\n" +
    "        game.sceneManager.changeScene( SCENE.game );\n" +
    "    } );\n" +
    "\n" +
    "})();";

let gameSceneSample = "var {0} = {0} || {};\n" +
    "{0}.SceneGame = (function ()\n" +
    "{\n" +
    "    function SceneGame(game)\n" +
    "    {\n" +
    "        this.game = game;\n" +
    "    }\n" +
    "\n" +
    "    SceneGame.prototype = {\n" +
    "\n" +
    "        create : function ()\n" +
    "        {\n" +
    "            this.game.config = new {0}.Data_config();\n" +
    "            this.game.data = new {0}.Data_game();\n" +
    "        },\n" +
    "\n" +
    "        start : function ()\n" +
    "        {\n" +
    "        },\n" +
    "\n" +
    "        finish : function ()\n" +
    "        {\n" +
    "        },\n" +
    "\n" +
    "        update : function (delta)\n" +
    "        {\n" +
    "        },\n" +
    "\n" +
    "        onKeyDown : function (e)\n" +
    "        {\n" +
    "        },\n" +
    "\n" +
    "        onKeyUp : function (e)\n" +
    "        {\n" +
    "        },\n" +
    "\n" +
    "        onMouseUp : function (e)\n" +
    "        {\n" +
    "        },\n" +
    "\n" +
    "        onMouseDown : function (e)\n" +
    "        {\n" +
    "        },\n" +
    "    };\n" +
    "\n" +
    "    return SceneGame;\n" +
    "})();";

let dataGameSample = "var {0} = {0} || {};\n" +
    "\n" +
    "{0}.Data_game = (function ()\n" +
    "{\n" +
    "    function Data_game()\n" +
    "    {\n" +
    "        this.score = 0;\n" +
    "        this.isPlay = false;\n" +
    "    }\n" +
    "\n" +
    "    return Data_game;\n" +
    "})();";

let dataConfigSample = "var {0} = {0} || {};\n" +
    "\n" +
    "{0}.Data_config = (function ()\n" +
    "{\n" +
    "    Data_config.startDelay = 1;\n" +
    "\n" +
    "\n" +
    "    function Data_config()\n" +
    "    {\n" +
    "        this.startDelay = Data_config.startDelay;\n" +
    "    }\n" +
    "\n" +
    "    Data_config.set = function (data)\n" +
    "    {\n" +
    "        data = data[0];\n" +
    "        for( var key in data )\n" +
    "        {\n" +
    "            Data_config[ key ] = parseFloat( data[key] );\n" +
    "        }\n" +
    "    };\n" +
    "\n" +
    "    return Data_config;\n" +
    "})();";

module.exports = InitProject;