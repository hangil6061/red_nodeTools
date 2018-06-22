const fs = require('fs');

let detectExtensions = ['json', 'csv', 'mp3', 'fnt', 'png', 'jpg'];

function LoadAssets( root, parName, dist )
{
    root = root || '../';
    parName = parName || '';
    dist = dist || root;
    let preload = {};
    preload.atlas = getFileArr( parName + 'atlas/', root );
    preload.csv = getFileArr( parName + 'csv/', root );
    preload.data = getFileArr( parName + 'data/', root );
    preload.font = getFileArr( parName + 'font/', root );
    preload.image = getFileArr( parName + 'image/', root );
    preload.layout = getFileArr( parName + 'layout/', root );
    preload.sound = getFileArr( parName + 'sound/', root );
    preload.spine = getFileArr( parName + 'spine/', root );

    writeFileToString(dist + 'preload.json', JSON.stringify( preload, null, 2 ));
}

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

module.exports = LoadAssets;