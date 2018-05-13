const fs = require('fs');

function CreateHtml( title, root, dist, srcRoot, fwRoot, htmlName )
{
    title = title || 'title';
    root = root || '../';
    srcRoot = srcRoot || 'scripts/';
    fwRoot = fwRoot || 'framework/';
    dist = dist || root;
    htmlName = htmlName || 'index.html';

    let lang = 'en';
    let css = [];
    let framework = [];
    let script = [];

    addFile( '', 'css', css, root );
    addFile( fwRoot, 'js', framework, root );
    addFile( srcRoot, 'js', script, root );

    let str =
        '<!DOCTYPE html>\n' +
        '<html lang="{0}">\n' +
        '<head>\n' +
        '    <meta charset="UTF-8">\n' +
        '\n' +
        '    <title>{1}</title>\n' +
        '{2}\n' +
        '\n' +
        '{3}\n' +
        '\n' +
        '</head>\n' +
        '<body>\n' +
        '\n' +
        '{4}\n' +
        '\n' +
        '</body>\n' +
        '</html>';
    str = stringFormat( str, lang, title, getCssToString(css), getSrcTagToString(framework), getSrcTagToString( script ) );
    writeFileToString( dist + htmlName, str );
}

function addFile( path, extension, fileList, root )
{
    root = root || '';

    fs.readdirSync(root + path).forEach(function (file)
    {
        let curPath = path + file;

        if( file.indexOf('.git') !== -1 || file.indexOf('node_modules') !== -1)
        {

        }
        else if (!fs.lstatSync(root + curPath).isDirectory())
        {
            if( file.indexOf( extension ) !== -1)
            {
                fileList.push( curPath );
            }
        }
        else
        {
            addFile( curPath + "/", extension, fileList, root );
        }
    });
}

function getSrcTagToString( list )
{
    let str = '';
    for( let i = 0; i < list.length; i++ )
    {
        str += stringFormat('    <script src="{0}"></script>\n', list[i]);
    }
    return str;
}

function getCssToString( list )
{
    let str = '';
    for( let i = 0; i < list.length; i++ )
    {
        str += stringFormat('    <link rel="stylesheet" href="{0}" />\n', list[i]);
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

module.exports = CreateHtml;