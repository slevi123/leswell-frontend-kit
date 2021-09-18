Object.values = Object.values || function(o){return Object.keys(o).map(function(k){return o[k]})};
class LesCanvasItem{
    constructor(canvas){
        this.canvas = canvas;
        this._2d_context = canvas._2d_context;
    }

    delete(){
        let index = this.canvas.registered_items.indexOf(this);
        this.canvas.registered_items.splice(index, 1);
        this.canvas.draw_items();
    }

    add(){
        this.canvas.registered_items.push(this);
        this.canvas.draw_items();
    }
}

class LesCanvasFillText extends LesCanvasItem{
    constructor(canvas, x, y, _text, {font="30px Arial", color="black"} = {}){
        super(canvas);
        [this.x, this.y, this._text, this.font, this.color] = [x, y, _text, font, color];
        console.log(color)
    }

    draw(){
        this._2d_context.font = this.font;
        this._2d_context.fillStyle = this.color;
        this._2d_context.fillText(this._text, this.x, this.y)
    }

    get text(){
        return this._text;
    }

    set text(new_value){
        this._text = new_value;
        this.canvas.draw_items();
    }
}


class LesCanvasLine extends LesCanvasItem{
    constructor(canvas, x1, y1, x2, y2, color="black", width="1"){
        super(canvas);
        [this.x1, this.y1, this.x2, this.y2] = [x1, y1, x2, y2];
        [this.color, this.width] = [color, width];
    };

    draw(){
        this._2d_context.beginPath();
        this._2d_context.strokeStyle = this.color;
        this._2d_context.lineWidth = this.width;
        this._2d_context.moveTo(this.x1, this.y1);
        this._2d_context.lineTo(this.x2, this.y2);
        this._2d_context.stroke()
    }
}

class LesCanvasRectangle extends LesCanvasItem{
    constructor(canvas, x, y, width, height, color="black"){
        super(canvas);
        this.x = x; this.y = y;
        this.width = width; this.height = height;
        this.color = color;
    }
}

class LesCanvasStrokeRectangle extends LesCanvasRectangle{
    constructor(canvas, x, y, width, height, color="black", stroke_width=1){
        super(canvas, x, y, width, height, color)
        this.stroke_width = stroke_width;
    }

    draw(){
        this._2d_context.lineWidth = this.stroke_width;
        this._2d_context.strokeStyle = this.color;
        this._2d_context.strokeRect(this.x, this.y, this.width, this.height);
    }
}
class LesCanvasFillRectangle extends LesCanvasRectangle{

    draw(){
        this._2d_context.fillStyle = this.color;
        this._2d_context.fillRect(this.x, this.y, this.width, this.height);
    }
}
class LesCanvas{
    constructor(id){
        this.canvas = document.getElementById(id);
        this._2d_context = this.canvas.getContext("2d");
        
        this.registered_items = [];
    }

    get width(){
        return this.canvas.width;
    }

    set width(new_value){
        this.canvas.width = new_value;
    }

    get height(){
        return this.canvas.height;
    }

    set height(new_value){
        this.canvas.height = new_value;
    }

    createItem(Item, ...args){
        let item = new Item(this, ...args);
        // console.log("item added: ", item)
        item.add();
        return item;
    }

    fillRect(...args){
        return this.createItem(LesCanvasFillRectangle, ...args);
    }
    
    strokeRect(...args){
        return this.createItem(LesCanvasStrokeRectangle, ...args);
    }

    line(...args){
        return this.createItem(LesCanvasLine, ...args);
    }

    fillText(...args){
        return this.createItem(LesCanvasFillText, ...args);
    }

    draw_items(){
        this._2d_context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let item of this.registered_items){
            item.draw();
        }
    }

    get bounding_box(){
        return this.canvas.getBoundingClientRect();
    }

    get borderWidth(){
        return parseInt(window.getComputedStyle(this.canvas).borderWidth)
    }

    get scales(){
        let rect = this.canvas.getBoundingClientRect();
        // let border_width = this.borderWidth;
        let scaleX = (this.canvas.width ) / (this.canvas.clientWidth);  
        let scaleY = (this.canvas.height ) / (this.canvas.clientHeight);
        return [scaleX, scaleY]
    }

    get_mouse_position(event){
        let rect = this.canvas.getBoundingClientRect();
        let [scaleX, scaleY] = this.scales;
        // console.log(this.canvas, border_width*scaleX)
        // console.log("bbox", rect.width*scaleX, rect.height*scaleY)
        let x = ~~((event.clientX - rect.left - this.borderWidth)*scaleX);
        let y = ~~((event.clientY - rect.top - this.borderWidth)*scaleY);
        return [x, y];
        
        
        
        // let [scaleX, scaleY] = this.scales;
        // var stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(this.canvas, undefined)['paddingLeft'], 10) || 0;
        // var stylePaddingTop = parseInt(document.defaultView.getComputedStyle(this.canvas, undefined)['paddingTop'], 10) || 0;
        // var styleBorderLeft = parseInt(document.defaultView.getComputedStyle(this.canvas, undefined)['borderLeftWidth'], 10) || 0;
        // var styleBorderTop = parseInt(document.defaultView.getComputedStyle(this.canvas, undefined)['borderTopWidth'], 10) || 0;
        // var html = document.body.parentNode;
        // var htmlTop = html.offsetTop;
        // var htmlLeft = html.offsetLeft;


        // var element = this.canvas,
        // offsetX = 0,
        // offsetY = 0,
        // mx, my;


        // // Compute the total offset
        // if (element.offsetParent !== undefined) {
        //     do {
        //         offsetX += element.offsetLeft;
        //         offsetY += element.offsetTop;
        //     } while ((element = element.offsetParent));
        // }

        // // Add padding and border style widths to offset
        // // Also add the <html> offsets in case there's a position:fixed bar
        // offsetX += stylePaddingLeft + styleBorderLeft + htmlLeft;
        // offsetY += stylePaddingTop + styleBorderTop + htmlTop;

        // mx = ~~((event.pageX - offsetX)*scaleX);
        // my = ~~((event.pageY - offsetY)*scaleY);

        // // We return a simple javascript object (a hash) with x and y defined
        // return [mx, my];
    }
}

window.onload = function bind(){
    var canvas = new LesCanvas("testcanvas");
    // let zold = canvas.fillRect(400, 200, 300, 150, color="green");
    // zold.delete();
    // canvas.fillRect(0, 10, 30, 15, color="red");
    // canvas._2d_context.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    // canvas.rect(0, 100, 300, 15, fill="yellow");
    var button = document.getElementById("test_button");
    var hossz = 0;
    button.addEventListener("click", (event)=>{ hossz+=100;canvas.fillRect(hossz, 10, 30, 15, fill="red")})
    gm = new GridManager(canvas, {cell_size: 30, grid_color: "red", show_grid:true});
    // gm.fillCell(GridCell.get_cell(1,1));
    gm.onCellClick(GridManager.alternateFillRect);
    let texts = {font: "60px Arial"}

    // canvas.fillText(100, 700, `border: ${canvas.borderWidth}`, texts);
    clienttext = canvas.fillText(100, 100, "calc", texts);
    // pagetext = canvas.fillText(100, 300, "page", texts);
    // sitetext = canvas.fillText(100, 600, "site", texts);


    canvas.canvas.addEventListener("mousemove", (event)=>{
        // console.log('.')
        let [relX, relY] = canvas.get_mouse_position(event);
        clienttext.text = `calc: ${relX}, ${relY}`;
    });
}