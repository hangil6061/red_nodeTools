const fs = require('fs');

let lang = 'en';
let title = 'title';
let framework = [];
let script = [];

addFile( 'framework/', 'js', framework );
addFile( 'scripts/', 'js', script );

let str =
    '<!DOCTYPE html>\n' +
    '<html lang="{0}">\n' +
    '<head>\n' +
    '    <meta charset="UTF-8">\n' +
    '\n' +
    '    <title>{1}</title>\n' +
    '\n' +
    '{2}\n' +
    '\n' +
    '</head>\n' +
    '<body>\n' +
    '\n' +
    '{3}\n' +
    '\n' +
    '</body>\n' +
    '</html>';
str = stringFormat( str, lang, title, getSrcTagToString(framework), getSrcTagToString( script ) );
writeFileToString( 'index.html', str );


function addFile( path, extension, fileList )
{
    fs.readdirSync(path).forEach(function (file)
    {
        let curPath = path + file;

        if( file.indexOf('.git') !== -1)
        {

        }
        else if (!fs.lstatSync(curPath).isDirectory())
        {
            if( file.indexOf( extension ) !== -1)
            {
                fileList.push( curPath );
            }
        }
        else
        {
            addFile( curPath + "/", extension, fileList );
        }
    });
}

function getSrcTagToString( list )
{
    str = '';
    for( let i = 0; i < list.length; i++ )
    {
        str += stringFormat('    <script src="{0}"></script>\n', list[i]);
    }
    return str;
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


function stringFormat ()
{
    var theString = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
        theString = theString.replace(regEx, arguments[i]);
    }
    return theString;
}