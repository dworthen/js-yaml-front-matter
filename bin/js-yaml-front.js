#!/usr/bin/env node

var program= require('commander')
  , jsYaml = require('../lib/js-yaml-front');

program
  .version('1.0.1')
  .usage('[options] <file>')
  .option('-c, --content [name]', 'set the property name for the files contents [__content]')
  .parse(process.argv);

if(program.args.length > 0) {
  if(program.content) {
    console.log(jsYaml.loadFront(program.args[0], program.content));
  } else {
    console.log(jsYaml.loadFront(program.args[0]));
  }  
}