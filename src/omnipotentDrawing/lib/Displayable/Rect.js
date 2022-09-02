import * as od from "zrender";
/**
 * @description 矩形
    opts	Object	 	配置项，继承得到的配置项参见 zrender.Displayable。
    opts.shape	Object	 	形状属性。
    opts.shape.r	number|number[]	0	用于创建圆角矩形。左上、右上、右下、左下角的半径依次为 r1、 r2、 r3、 r4。r 缩写为 1 相当于 [1, 1, 1, 1]；r 缩写为 [1] 相当于 [1, 1, 1, 1]；r 缩写为 [1, 2] 相当于 [1, 2, 1, 2]；r 缩写为 [1, 2, 3] 相当于 [1, 2, 3, 2]。
    opts.shape.x	number	0	左上角的横坐标。
    opts.shape.y	number	0	左上角的纵坐标。
    opts.shape.width	number	0	宽度。
    opts.shape.height	number	0	高度。
*/
export function Rect(opts,zr) {
    if (!zr) return;
    if (typeof opts != "object") return;
    const el = new od.Rect(opts);
    zr.add(el);
    return el;
}