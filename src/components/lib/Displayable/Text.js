import * as od from "zrender";

/**
 * @description 文字
 * @param zr:element 元素
*/
export function Text(opts,zr) {
    if (!zr) return;
    if (typeof opts != "object") return;
    const el = new od.Text(opts)
    zr.add(el);
    return el;
}