imports = ["canvas_raw/managers/_base"]

class ArrayItem{
    constructor(value, index){
        [this.index,this.value] =  index, value;
        this.drawn = false; 
    }
}


class ArrayManager extends CanvasManager{
    constructor(canvas,  array_size=undefined, {
            spacing: spacing_ratio = 0.4, value_height = 30, min_padding=200,
          default_cell_color="black",
        //   separator_color="black",
        }={}){
            
        super(canvas);
        // [this.start_width, this.start_height] = [this.canvas.width, this.canvas.height];

        this.min_padding = min_padding;
        this._array_size = array_size;
        [this.spacing_ratio, this.value_height] = [spacing_ratio, value_height];

        this.drawings = [];
        // this.relative_resize()

        // this._separatorlines = [];
        this._2d_context = canvas._2d_context;
        this.calculate_sizes(array_size);
    }

    set array_size(new_value){
        this.delete_all();
        this._array_size = new_value;
        this.calculate_sizes();
    }

    delete_all(){
        for (let drawing of this.drawings){
            drawing?.delete();
        }
    }

    calculate_sizes(){
        // console.log("calcs:  ", this.canvas.width, this.array_size);
        const spacing_units = this.spacing_ratio*(this._array_size-1);
        this.item_width = ~~((this.canvas.width-2*this.min_padding)/(this._array_size+spacing_units));
        this.spacing = ~~(this.spacing_ratio*this.item_width);
        const content_width = this.item_width*this._array_size + this.spacing*(this._array_size-1)
        this.padding = ~~((this.canvas.width - content_width)/2);
        // this.canvas.fillRect(0, 600, this.padding, 700, "yellow")
        // this.canvas.fillRect(0, 500, this.min_padding/2, 500, "blue")
        // console.log("calcs:  ", this.spacing, this.item_width, this.padding)
        // console.log("calcs:  ", )

        // this.fix_sizes();
    }

    draw_value(index, value){
        let x1 = index*this.item_width,
        height = value*this.value_height;
        
        this.drawings[index]?.delete()

        let spacing_before = this.spacing*(index)
        // console.log("draw valuw:  ", spacing_before, this.padding)
        // console.log("draw value:  ", x1+spacing_before+this.padding, height)
        this.drawings[index] = this.canvas.fillRect(x1+spacing_before+this.padding, 0, this.item_width, height);
    }
    
    
}