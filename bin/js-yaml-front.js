#!/usr/bin/env node

var program = require('commander')
    , yamlFront = require('../')
    , package = require('../package.json');

program
    .version(package.version, '-v, --version')
    .usage('[options] <string>')
    .option('-c, --content [name]', 'set the property name for the files contents [__content]')
    .option('--pretty', 'prints the json output with spaces.')
    .on('--help', function() {
        console.log('');
        console.log('   Examples')
        console.log('');
        console.log('     Basic');
        console.log('       yaml-front-matter <yaml-front-matter>');
        console.log('');
        console.log('     Piping content from an input file to an output file')
        console.log('       cat ./some/file.txt | yaml-front-matter > output.txt');
    });
    
program.parse(process.argv);

if (program.args.length > 0) {
    processData(program.args[0]);
} else {
    var data = '';
    process.stdin.on('readable', function () {
        var chunk;
        while (chunk = process.stdin.read()) {
            data += chunk;
        }
    });

    process.stdin.on('end', function () {
        // There will be a trailing \n from the user hitting enter. Get rid of it.
        // data = data.replace("\r\n", '\n');
        processData(data);
    });
}

function processData(data) {
    console.log(JSON.stringify(yamlFront.safeLoadFront(data,
        { contentKeyName: program.content || '__content' }), 
        undefined, 
        program.pretty ? 2 : 0));
}