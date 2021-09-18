imports = ["./_quick_promises"]


class AlgorithmTimer{
    constructor(){
        this.paused = false;
        this.current_promise = undefined;

        this.next = this.timed;
        this.wait_time = 700; // in miliseconds

        this.ended = true;

        this.state = {count:0};
    }

    timed(){
        // console.log("timed...")
        this.current_promise = this.current_promise.then((result) => setTimeout( ()=> this.round(), this.wait_time ) )
    }

    round(){
        console.log(this.state.count++);
        if (!this.paused && !this.ended) this.next();
    }    

    reset(){
        this.state.count = 0;
    }

    start(){
        // console.log('started')
        this.ended = false;
        this.paused = false;
        this.reset();
        // FIXME: second start
        this.current_promise = new Promise((resolve) => timeOut( resolve, ()=> this.round(), this.wait_time )).then();
    }

    pause_resume(){
        if (!this.ended){
            if (this.paused) {
                // console.log("resume")
                this.paused = !this.paused;

                this.current_promise.then( ()=>this.before_resume() );
                this.next();
                
            } else{
                // console.log("pause")
                this.paused = !this.paused;
                
                setTimeout( ()=>this.current_promise.then( ()=>this.after_pause() ), this.wait_time );
            };
        }
    }

    stop(){
        // console.log("stopped")
        this.ended = true;
        
        setTimeout( ()=>this.current_promise.then( ()=>this.end() ), this.wait_time );
    }

    after_pause(){
        // console.log("after pause")
    }

    before_resume(){
        // console.log("before resume")
    }

    end(){
        // console.log("ended")
    }
}

window.onload = function (){
    let at = new AlgorithmTimer()
    document.getElementById("start").addEventListener("click", () => at.start())
    document.getElementById("pause_resume").addEventListener("click", () => at.pause_resume())
    document.getElementById("stop").addEventListener("click", () => at.stop())
}