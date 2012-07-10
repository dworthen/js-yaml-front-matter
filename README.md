## yaml-front-matter

parses yaml at the top of a file, plus the file content into an object literal.

### Example

This 

    ---
    name: Derek Worthen
    age: young
    contact: 
     email: email@domain.com
     address: some location
    pets: 
     - cat
     - dog
     - bat
    match: !!js/regexp /pattern/gim
    run: !!js/function function() { }
    ---
    Some Other content
    
becomes

    { name: 'Derek Worthen',
      age: 'young',
      contact: { email: 'email@domain.com', address: 'some location' },
      pets: [ 'cat', 'dog', 'bat' ],
      match: /pattern/gim,
      run: [Function],
      __content: 'Some Other Content' }
      
### Install with npm

    $ npm install yaml-front-matter -g
    # or locally
    $ npm install yaml-front-matter
    
### Command Line

    Usage: js-yaml-front.js [options] <file>
    # If installed locally you may have to run 
    # node_modules/yaml-front-matter/js-yaml-front.js [options] <file>

    Options:

    -h, --help            output usage information
    -V, --version         output the version number
    -v, --version         displays version number then exits
    -c, --content [name]  set the property name for the files contents [__content]
    
    


      


    
    