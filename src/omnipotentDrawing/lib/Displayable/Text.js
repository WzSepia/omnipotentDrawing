import * as od from "zrender";

/**
 * @description 文字
 * @param zr:element 元素
 */
export function Text(opts) {
  const el = new od.Text(opts);
  el.attr({
    type: "text",
    name: "text" + el.id,
  });
  return el;
}
