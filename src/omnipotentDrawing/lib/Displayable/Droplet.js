import * as od from "zrender";
/**
 * @description 水滴
    opts	Object	 	配置项，继承得到的配置项参见 zrender.Displayable。
    opts.shape	Object	 	形状属性。
    opts.shape.cx	number	0	圆心横坐标。
    opts.shape.cy	number	0	圆心纵坐标。
    opts.shape.width	number	0	宽度。
    opts.shape.height	number	0	高度。
*/
export function Droplet(opts, zr) {
  if (!zr) return;
  if (typeof opts != "object") return;
  const el = new od.Droplet(opts);
  zr.add(el);
  return el;
}