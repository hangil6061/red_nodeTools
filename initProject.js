const fs = require('fs');

function InitProject(root, prjName, namespaceName)
{
    root = root || '../';

    if( prjName )
    {
        prjName = prjName || '';
        prjName += '/';
    }
    else
    {
        prjName = '';
    }


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
        root + 'assets/'+prjName+'data/',
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

    let configStr = stringFormat( dataConfigSample,  namespaceName);
    writeFileToString2( root + 'scripts/'+prjName+'00_data/data_config.js', configStr );

    let dataStr = stringFormat( dataGameSample,  namespaceName);
    writeFileToString2( root + 'scripts/'+prjName+'00_data/data_game.js', dataStr );

    let configJsonStr = stringFormat( dataConfigJsonSample,  namespaceName);
    writeFileToString2( root + 'assets/'+prjName+'data/config.json', configJsonStr );
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

let mainSample = "const CONTAINER = {\n" +
    "    bg : 'bg',\n" +
    "    game : 'game',\n" +
    "    ui : 'ui',\n" +
    "};\n" +
    "\n" +
    "const SCENE = {\n" +
    "    game : 'game',\n" +
    "};\n" +
    "\n" +
    "const EVENT = {\n" +
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
    "        game.config = new {1}.Data_config(resources[\"config\"].data);\n" +
    "        game.data = new {1}.Data_game();\n" +
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
    "    function Data_config()\n" +
    "    {\n" +
    "    }\n" +
    "\n" +
    "    Data_config.parse = function (parseObject)\n" +
    "    {\n" +
    "        return parse( {}, parseObject );\n" +
    "    };\n" +
    "\n" +
    "    function parse( obj, parseObject )\n" +
    "    {\n" +
    "        for( var o in parseObject )\n" +
    "        {\n" +
    "            if( !parseObject.hasOwnProperty( o ) ) continue;\n" +
    "\n" +
    "            if( parseObject[o].def !== undefined)\n" +
    "            {\n" +
    "                obj[ o ] = parseObject[o].def;\n" +
    "            }\n" +
    "            else\n" +
    "            {\n" +
    "                obj[ o ] = {};\n" +
    "                parse( obj[ o ], parseObject[o] )\n" +
    "            }\n" +
    "        }\n" +
    "        return obj;\n" +
    "    }\n" +
    "\n" +
    "    return Data_config;\n" +
    "})();";

let dataConfigJsonSample = "{\n" +
    "  \"Sample\" : {\n" +
    "    \"def\" : 15,\n" +
    "    \"min\" : 1,\n" +
    "    \"max\" : 99,\n" +
    "    \"step\" : 1\n" +
    "  },\n" +
    "}";

module.exports = InitProject;