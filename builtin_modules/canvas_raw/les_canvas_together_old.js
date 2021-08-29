class LesCanvasItem{
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

class LesCanvasRectangle extends LesCanvasItem{
    constructor(canvas, x, y, width, height, color="black"){
        super();
        this.canvas = canvas;
        this._2d_context = canvas._2d_context;
        console.log("I was called", this._2d_context)
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
        // console.log("item drawn");
    }
}


class LesCanvas{
    constructor(id, pixel_size=100){
        this.canvas = document.getElementById(id);
        this._2d_context = this.canvas.getContext("2d");

        let canvas_ratio = this.canvas.width / this.canvas.height;
        this.x_pixel_size = pixel_size;
        this.y_pixel_size = ~~(pixel_size/canvas_ratio);
        // console.log(this.y_pixel_size)
        this.registered_items = [];

        // this.canvas.addEventListener("change", ()=>console.log("vau"));
        // this._adapt_items();

    }

    // calc_x(x){
    //     return x
    //     return ~~((x*this.canvas.width)/this.x_pixel_size);
    // }

    // calc_y(y){
    //     return y
    //     return ~~((y*this.canvas.height)/this.y_pixel_size);
    // }

    fillRect(x, y, width, height, color){
        let item = new LesCanvasFillRectangle(this, x, y, width, height, color);
        item.add();
        return item;
    }

    draw_items(){
        this._2d_context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // console.log(this.registered_items);
        for (let item of this.registered_items){
            console.log(item)
            item.draw();
        }
    }

    // _adapt_items(){
    //     console.log("adapting")
    //     // this.canvas.height = ~~(this.canvas.width / this.canvas_ratio);
    // }
}

window.onload = function bind(){
    var canvas = new LesCanvas("testcanvas", 1000);
    let zold = canvas.fillRect(400, 200, 300, 150, fill="green");
    zold.delete();
    canvas.fillRect(0, 10, 30, 15, fill="red");
    // canvas._2d_context.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    // canvas.rect(0, 100, 300, 15, fill="yellow");
    var button = document.getElementById("test_button");
    var hossz = 0;
    button.addEventListener("click", (event)=>{ hossz+=100;canvas.fillRect(hossz, 10, 30, 15, fill="red")})

}