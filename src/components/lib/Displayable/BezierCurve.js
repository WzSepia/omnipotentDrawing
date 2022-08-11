import * as od from "zrender";
/**
 * @description 贝塞尔曲线
    opts	Object	 	配置项，继承得到的配置项参见 zrender.Displayable。
    opts.shape	Object	 	形状属性。
    opts.shape.x1	number	0	起始点横坐标。
    opts.shape.y1	number	0	起始点纵坐标。
    opts.shape.x2	number	0	终止点横坐标。
    opts.shape.y2	number	0	终止点纵坐标。
    opts.shape.cpx1	number	0	控制点横坐标。
    opts.shape.cpy1	number	0	控制点纵坐标。
    opts.shape.percent	number	1	已显示的百分比，用于绘制动画。
*/
export function BezierCurve(opts, zr) {
  if (!zr) return;
  if (typeof opts != "object") return;
  const el = new od.BezierCurve(opts);
  zr.add(el);
  return el;
}