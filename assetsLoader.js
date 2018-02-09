const fs = require('fs');

let detectExtensions = ['json', 'csv', 'mp3'];

let preload = {};
preload.atlas = getFileArr( 'assets/atlas/' );
preload.csv = getFileArr( 'assets/csv/' );
preload.font = getFileArr( 'assets/font/' );
preload.image = getFileArr( 'assets/image/' );
preload.layout = getFileArr( 'assets/layout/' );
preload.sound = getFileArr( 'assets/sound/' );
preload.spine = getFileArr( 'assets/spine/' );
writeFileToString( 'assets/preload.json', JSON.stringify( preload, null, 2 ));

function getFileArr( path )
{
    let fileArr = [];
    addFile( path, fileArr );
    return fileArr;
}

function addFile( path, fileList )
{
    fs.readdirSync(path).forEach(function (file)
    {
        let curPath = path + file;

        if( file.indexOf('.git') !== -1)
        {

        }
        else if (!fs.lstatSync(curPath).isDirectory())
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
            addFile( curPath + "/", fileList );
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