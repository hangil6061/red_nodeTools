const fs = require('fs');

function InitProject(root, prjName)
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
        root + 'scripts/'+prjName
    ];

    for( let i = 0; i < dirList.length; i++ )
    {
        if( !fs.existsSync( dirList[i] ) )
        {
            console.log( dirList[i] );
            fs.mkdirSync(dirList[i]);
        }
    }
}

module.exports = InitProject;