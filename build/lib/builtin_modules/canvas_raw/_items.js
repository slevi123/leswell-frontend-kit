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