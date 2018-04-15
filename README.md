# cubx-grunt-webpackage-rte-update

[![Build Status](https://travis-ci.org/cubbles/cubx-grunt-webpackage-rte-update.svg?branch=develop)](https://travis-ci.org/cubbles/cubx-grunt-webpackage-rte-update)

Grunt plugin for updating the rte version of a webpackage

## Usage:

### Default

Install the grunt plugin 

```
npm install cubx-grunt-webpackage-rte-update --save-dev
```

Gruntfile

* Load the grunt plugin
    
```    
grunt.loadNpmTasks(cubx-grunt-webpackage-rte-update)
```
        
* Set config (path to webpackage containing the artifact to be renamed) 
    
```        
grunt.initConfig({
   webpackagepath: ...
});
```

 
### Integrate in [devtools](https://github.com/cubbles/cubbles-coder-devtools): 
Just install grunt plugin
  
```
npm install cubx-grunt-webpackage-rte-update --save
```
