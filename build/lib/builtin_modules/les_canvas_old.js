class LesCanvasItem{
    constructor(){

    }
}

class LesCanvasRectangle extends LesCanvasItem{
    constructor(canvas, x, y, width, height, fill=undefined, color=undefined, stroke_width=1){
        super()
        console.log(fill)
        this.canvas = canvas;
        this._2d_context = canvas._2d_context;
        this.x = x; this.y = y;
        this.width = width; this.height = height;
        this.fill = fill; this.color = color; this.stroke_width = stroke_width;
    }

    draw(){
        let x = this.canvas.calc_x(this.x); let y = this.canvas.calc_y(this.y);
        let width = this.canvas.calc_x(this.width); let height = this.canvas.calc_y(this.height);
        console.log("draw: ", this.x, this.y, this.width, this.height)
        this._2d_context.beginPath()
        this._2d_context.rect(x, y, width, height);
        if (this.fill){
            this._2d_context.fillStyle = this.fill;
            this._2d_context.fill();
        } else {
            this._2d_context.lineWidth = this.stroke_width;
            this._2d_context.strokeStyle = this.color;
            this._2d_context.stroke();  
        }
        console.log("item drawn");
    }
}


class LesCanvas{
    constructor(id, pixel_size=100){
        this.canvas = document.getElementById(id);
        this._2d_context = this.canvas.getContext("2d");

        let canvas_ratio = this.canvas.width / this.canvas.height;
        this.x_pixel_size = pixel_size;
        this.y_pixel_size = ~~(pixel_size/canvas_ratio);
        console.log(this.y_pixel_size)
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

    rect(x, y, width, height, fill=undefined, color=undefined, stroke_width=1){
        // this._2d_context.beginPath();
        let hozzaadva = new LesCanvasRectangle(this, x, y, width, height, fill, color, stroke_width);
        this.registered_items.push(hozzaadva); // FIXME
        // console.log("hozzaadva:", hozzaadva)
        this.draw_items();
    }

    draw_items(){
        this._2d_context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        console.log(this.registered_items);
        for (let item of this.registered_items){
            // console.log(item)
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
    canvas.rect(400, 200, 300, 150, fill="green");
    canvas.rect(0, 10, 30, 15, fill="red");
    // canvas._2d_context.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    // canvas.rect(0, 100, 300, 15, fill="yellow");
    var button = document.getElementById("test_button");
    var hossz = 0;
    button.addEventListener("click", (event)=>{ hossz+=100;canvas.rect(hossz, 10, 30, 15, fill="red")})

}