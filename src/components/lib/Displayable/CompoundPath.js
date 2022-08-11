import * as od from "zrender";
/**
 * @description 复合路径。相当于多个路径的并集
    opts	Object	 	配置项，继承得到的配置项参见 zrender.Displayable。
    opts.shape.paths	Path[]	null	路径数组。
*/
export function CompoundPath(opts, zr) {
  if (!zr) return;
  if (typeof opts != "object") return;
  const el = new od.CompoundPath(opts);
  zr.add(el);
  return el;
}