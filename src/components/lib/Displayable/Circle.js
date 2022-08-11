import * as od from "zrender";
/**
 * @description 圆
    opts	Object	 	配置项，继承得到的配置项参见 zrender.Displayable。
    opts.shape	Object	 	形状属性。
    opts.shape.cx	number	0	圆心横坐标。
    opts.shape.cy	number	0	圆心纵坐标。
    opts.shape.r	number	0	半径。
*/
export function Circle(opts,zr) {
    if (!zr) return;
    if (typeof opts != "object") return;
    const el = new od.Circle(opts);
    zr.add(el);
    return el;
}