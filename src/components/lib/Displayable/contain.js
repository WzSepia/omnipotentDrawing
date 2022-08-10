// import * as od from "zrender";

export function contain(opts,els) {
    return new Promise((resolve)=>{
        let el = null;
        const {x,y} = opts;
        els.forEach(element => {
            if(element.contain(x,y)){
                el = element;
                return;
            }
        });
        resolve(el);
    })
}