imports = ["_items"]


class LesCanvas{
    constructor(id){
        this.canvas = document.getElementById(id);
        this._2d_context = this.canvas.getContext("2d");
        
        this.registered_items = [];
    }

    fillRect(x, y, width, height, color){
        let item = new LesCanvasFillRectangle(this, x, y, width, height, color);
        item.add();
        return item;
    }

    draw_items(){
        this._2d_context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let item of this.registered_items){
            console.log(item)
            item.draw();
        }
    }
}

window.onload = function bind(){
    var canvas = new LesCanvas("testcanvas");
    let zold = canvas.fillRect(400, 200, 300, 150, color="green");
    // zold.delete();
    canvas.fillRect(0, 10, 30, 15, color="red");
    // canvas._2d_context.clearRect(0, 0, canvas.canvas.width, canvas.canvas.height);
    // canvas.rect(0, 100, 300, 15, fill="yellow");
    var button = document.getElementById("test_button");
    var hossz = 0;
    button.addEventListener("click", (event)=>{ hossz+=100;canvas.fillRect(hossz, 10, 30, 15, fill="red")})

}