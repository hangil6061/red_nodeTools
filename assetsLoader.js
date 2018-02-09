const fs = require('fs');

let detectExtensions = ['json', 'csv', 'mp3', 'fnt'];
let root = '../';

let preload = {};
preload.atlas = getFileArr( 'assets/atlas/', root );
preload.csv = getFileArr( 'assets/csv/', root );
preload.font = getFileArr( 'assets/font/', root );
preload.image = getFileArr( 'assets/image/', root );
preload.layout = getFileArr( 'assets/layout/', root );
preload.sound = getFileArr( 'assets/sound/', root );
preload.spine = getFileArr( 'assets/spine/', root );
writeFileToString(root + 'assets/preload.json', JSON.stringify( preload, null, 2 ));

function getFileArr( path, root )
{
    let fileArr = [];
    addFile( path, fileArr, root );
    return fileArr;
}

function addFile( path, fileList, root )
{


    fs.readdirSync(root + path).forEach(function (file)
    {
        let curPath = path + file;

        if( file.indexOf('.git') !== -1)
        {

        }
        else if (!fs.lstatSync(root + curPath).isDirectory())
        {
            for( let i = 0; i < detectExtensions.length; i++ )
            {
                if( file.indexOf( detectExtensions[i] ) === -1) continue;

                fileList.push( { key : file.replace('.' + detectExtensions[i], ''), path : curPath } );
                break;
            }
        }
        else
        {
            addFile( curPath + "/", fileList, root );
        }
    });
}

function writeFileToString( filePath, str )
{
    fs.open(filePath,'w',function(err)
    {
        if( err ) console.log( err );

        fs.writeFile(filePath, str, function (error)
        {
            if( error ) console.log( error );
        })

    });
}