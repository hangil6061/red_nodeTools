const fs = require('fs');

let dirList = [
    '../assets',
    '../assets/atlas/',
    '../assets/csv/',
    '../assets/font/',
    '../assets/image/',
    '../assets/layout/',
    '../assets/sound/',
    '../assets/spine/',
    '../scripts/'
];

for( let i = 0; i < dirList.length; i++ )
{
    if( !fs.existsSync( dirList[i] ) )
    {
        fs.mkdirSync(dirList[i]);
    }
}