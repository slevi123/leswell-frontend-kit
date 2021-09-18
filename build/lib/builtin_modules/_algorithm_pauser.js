function timeOut(resolve, func, ms){
    // console.log("resolved: ", resolve)
    return setTimeout(()=>{
        func();
        resolve();
    },ms)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
class AlgorithmPauser{
    constructor(mode="auto-sort"){
        this.next = this.sleeping; //or next_step
        this.mode = mode;

        this.wait_time = 300; 

        this.started = false;
        this.paused = false;
        this.initialized = true;

        this.stepping = false;
    }

    get mode(){
        return this._mode;
    }

    set mode(new_mode){
        // console.log(new_mode)
        this._mode = new_mode;
        if (new_mode == "auto-sort") {
            this.next = this.sleeping;
            this.stepping = true;
        }
        else this.next = this.next_step;
        // console.log(this.next)
    }

    async next_step(){
        while (true){
            if (this.started){
                if (this.stepping && this.initialized) {
                    this.stepping = false;
                    break;
                }
                await sleep(200);
            } else return false;
        }
        return true;
    }

    async sleeping(){
        await sleep(this.wait_time)
        while (true){
            if (this.started){
                if (!this.paused && this.initialized) break;
                await sleep(200);
            } else return false;
        }
        return true;

        // todo: consider returning bool value or not?
    }

    start(){
        if (!this.started){
            console.log("start")
            this.initialized = false;
            this.started = true;
            this.paused = false;

            this.stepping = false;
            // this.reset_data();
            
            this.initialized = true;
            this.algorithm().then( () => this.started=false );
        }
    }

    // reset_data(){

    // }

    async algorithm(){
        for (let i=1; i<200 && this.started; i++){
            console.log(i);
            await this.next();
       }

    }

    pause_resume(){
        this.paused = !this.paused;
    }

    stop(){
        this.started = false;
    }

    step(){
        this.stepping = true;
    }


}

window.onload = function (){
    let at = new AlgorithmPauser()
    document.getElementById("start").addEventListener("click", () => at.start())
    document.getElementById("pause_resume").addEventListener("click", () => at.pause_resume())
    document.getElementById("stop").addEventListener("click", () => at.stop())
    let checkbox_dom = document.getElementById("auto-sort");
    checkbox_dom.addEventListener("change", () => {
        if (checkbox_dom.checked) at.mode = "auto-sort"
        else at.mode = "stepper";
    })

    let speed_select_dom = document.getElementById("speed");
    speed_select_dom.addEventListener("change", () => at.wait_time = parseInt(speed_select_dom.value))
    
    document.getElementById("step").addEventListener("click", () => at.step())
}