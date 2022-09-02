import * as od from "zrender";
/**
 * @description 椭圆
    opts	Object	 	配置项，继承得到的配置项参见 zrender.Displayable。
    opts.shape	Object	 	形状属性。
    opts.shape.cx	number	0	圆心横坐标。
    opts.shape.cy	number	0	圆心纵坐标。
    opts.shape.rx	number	0	横向半径。
    opts.shape.ry	number	0	纵向半径。
*/
export function Ellipse(opts, zr) {
  if (!zr) return;
  if (typeof opts != "object") return;
  const el = new od.Ellipse(opts);
  zr.add(el);
  return el;
}