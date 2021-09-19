imports = ["canvas_raw/managers/_base"]

class GridCell{
    static cells = {};

    constructor(row, column){
        [this.row, this.column] = [row, column];

        this.drawn = false; 
    }

    static get_cell(row, column){
        let id = `${row}:${column}`;
        if (id in this.cells) return this.cells[id];
        let new_cell = new this(row, column)
        this.cells[id] = new_cell;
        return new_cell;
    }
}


class GridManager extends CanvasManager{
    constructor(canvas, { rows=undefined, columns=undefined, show_grid=true, cell_size=false, 
        min_rows=1, min_columns=1, grid_color="black", default_cell_color="black"}={}){
            
        super(canvas);
        // [this.start_width, this.start_height] = [this.canvas.width, this.canvas.height];

        this._gridlines = [];
        this._2d_context = canvas._2d_context;
        this._resize_timeout = false;

        this.showing_grid = show_grid;
        this.resize_settings = {start_rows: rows, start_columns:columns, cell_size:cell_size,
                                min_rows:min_rows, min_columns:min_columns,
                                start_width: this.canvas.width, start_height: this.canvas.height};

        [this.grid_color, this.default_cell_color] = [grid_color, default_cell_color];
        
        if (cell_size){
            this.relative_resize();
            window.addEventListener('resize', (event)=> {
                if (!this._resize_timeout){
                    this._resize_timeout = window.setTimeout(()=>{
                        this.relative_resize();
                        console.log("resize")
                    }, 1000);
                }
            })
        } else this.calculate_sizes(rows, columns);
    }

    before_resize(){
        this.removeItems();
    }
    
    relative_resize(){
        this.before_resize()
        let bbox = this.canvas.bounding_box, rows, columns;

        if (!this.resize_settings.start_rows) {
            rows = ~~(bbox.height/this.resize_settings.cell_size);
            if (rows < this.resize_settings.min_rows){
                rows = this.resize_settings.min_rows;
            }
        }
        if (!this.resize_settings.start_columns){
            columns = ~~(bbox.width/this.resize_settings.cell_size);
            if (columns < this.resize_settings.min_columns){
                columns = this.resize_settings.min_columns;
            }
        }

        this.calculate_sizes(rows, columns)
    }

    calculate_sizes(rows, columns){
        [this.columns, this.rows] = [columns, rows];
        
        let x_size = ~~(this.resize_settings.start_width/rows),
            y_size = ~~(this.resize_settings.start_height/columns);

        this.cell_size = Math.min(x_size, y_size);
        this.fix_sizes();
        

        this.create_grid();
        if (!this.showing_grid) this.hide_grid();
    }
    
    fix_sizes(){
        this.canvas.height = this.cell_size*this.rows;
        this.canvas.width = this.cell_size*this.columns;
    }

    create_grid(){
        this._resize_timeout = false;
        //remove old grid
        for (let gridline of this._gridlines) gridline.delete();
        this._gridlines = [];

        //draw new gridlines (horizontals and verticals)
        for (let row=1; row<this.rows; row++){
            let y = row*this.cell_size;
            this._gridlines.push(this.canvas.line(0, y, this.canvas.width, y, this.grid_color));
        }
        for (let column=1; column<this.columns; column++){
            let x = column*this.cell_size;
            this._gridlines.push(this.canvas.line(x, 0, x, this.canvas.height, this.grid_color));    
        }
    }

    hide_grid(){
        for (let gridline of this._gridlines){
            gridline.delete();
        }
    }

    show_grid(){
        for (gridline of this._gridlines){
            gridline.add();
        }
    }

    fillCellAnimation(gridcell){

    }

    fillCell(gridcell, {color="red"}={}){
        console.log(!color)
        if (!color) color = this.default_cell_color;
        let rect = this.canvas.fillRect(gridcell.row*this.cell_size, gridcell.column*this.cell_size, 
            this.cell_size, this.cell_size, color=color);
        gridcell.drawn = rect;
    }

    fillCircleCell(){

    }

    customDrawCell(){

    }

    removeItems(){
        for ( let gridcell of Object.values(GridCell.cells)){
            if (gridcell.drawn){
                gridcell.drawn.delete();
                gridcell.drawn = false;
            }
        }
    }

    onCellClick(func){
        console.log("added")
        this.canvas.canvas.addEventListener("click", event=>{
        let [x, y] = this.canvas.get_mouse_position(event);
        // console.log
        let cell_x = Math.floor(x/this.cell_size),
            cell_y = Math.floor(y/this.cell_size);
            func(GridCell.get_cell(cell_x, cell_y));
        })
    }

    //basic event functions
    static alternateFillRect(gridcell){
        if (gridcell.drawn) {
            gridcell.drawn.delete()
            gridcell.drawn = false;
        } else gm.fillCell(gridcell);
    }
}