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
      __content: 'Some Other Content'
    }

    
    