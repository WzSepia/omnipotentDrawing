// import * as od from "zrender";

/**
 * @description 判断坐标 (x, y) 是否在图形上。
*/
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