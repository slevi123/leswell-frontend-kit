# leswell-frontend-kit
frontend solutions for myself.

### Installation
download it from Pypi
**link coming**

## Javascript ModuleLoader

_import rule in js files_:\
` imports = [ "builtin-module", "submodule",... ] `\
**note:** _space is neccesary after `imports`_ keyword

cli tool:\
`lesjs inputfile outputfolder`\
or\
`lesjs inputfile -o outputfile`

### Builtin modules
<br>

#### LesCanvas

_**description:** item deletion support from js and scss responsive resizing._
<!-- TODO: recompose description -->

Usage:
* import `les_canvas` scss and builtin js modules. 
* in html:\
    `<canvas class="responsive-canvas" id="yourcanvasid"></canvas>`\
    **note:** canvas style and imaging sizes differ!
* in stylesheet:
    ```
    #yourcanvasid{
        width: x%;
        height: y%;
    }
    ```
    **note:** replace x and y with your preffered style ratios.
* in javascript:

    ```
    imports = ["canvas/_les_canvas"]

    let canvas = new LesCanvas("yourcanvasid");

    //to create filled rectangle
    let rect = canvas.fillRect(x, y, width, height, color="green");

    //to delete canvas item
    rect.delete();
    ```