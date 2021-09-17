imports = ["_quick_promises"]

class VisualArray{
    constructor(canvas, minimum_item_width=5){
        this.canvas = new LesCanvas(canvas);

        this.minimum_item_width =this.minimum_item_width;

        canvas.fillRectangle(0,0, 100, 100)

        this.target = [];
        this.proxy = new Proxy(this.target, {
            set: (target, prop, new_value) => this.set_item(target, prop, new_value)
        })
    }

    static new(...args){
        return new this(...args).proxy;
    }

    set_item(target, prop, new_value){
        Reflect.set(target, prop, new_value);
        console.log("aalllitva", target[prop])
    }

    get maximum_item_count(){
        return ~~(this.canvas.width/this.minimum_item_width);
    }

}

window.onload = function(){
    let canvas = new LesCanvas("testcanvas");
    console.log(canvas.canvas)
    let va = VisualArray.new(canvas);
    va[3] = 4;
    console.log(va[3]);
}