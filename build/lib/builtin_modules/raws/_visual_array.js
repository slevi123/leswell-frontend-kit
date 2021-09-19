imports = ["_quick_promises", "canvas/les_canvas", "canvas_raw/managers/_array"]

class VisualArray{
    constructor(canvas, minimum_item_width=5){
        this.canvas = canvas;
        this.array_manager = new ArrayManager(canvas, {array_size: 10})

        this.minimum_item_width = this.minimum_item_width;

        // canvas.fillRect(0,0, 100, 100)

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
        this.array_manager.draw_value(prop, new_value);
        console.log("aalllitva", target[prop])
    }

    get maximum_item_count(){
        return ~~(this.canvas.width/this.minimum_item_width);
    }

}

// window.onload = function(){
//     // let canvas = this.canvas = document.getElementById("testcanvas");
//     // console.log(canvas.getContext("2d"))
//     let canvas = new LesCanvas("testcanvas");
//     // console.log(canvas.canvas)
//     let va = VisualArray.new(canvas);
//     // va[3] = 40;
//     // va[9] = 20;
//     // va[0] =10;
//     for (let i =1; i<=10;i++){
//         va[i-1] = i*5;
//     }
//     let testing = 2
//     document.getElementById("test_button").addEventListener("click", () => {
//         if (va[testing]) va[testing] = 0
//         else va[testing] = 60;
//     })
//     // console.log(va[3]);
// }