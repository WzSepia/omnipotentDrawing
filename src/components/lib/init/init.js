//omnipotentDrawing 万能绘图
import * as od from "zrender";

/**
 * @des 得到一个 ZRender 的实例
 * @param dom: HTMLElement,ZRender容器，在调用该方法时，应该已有宽度和高度
 * @param opts: 配置项
 * @detail opts
 * opts:{
    renderer:'canvas',	    string	'canvas'	渲染方式，支持：'canavs'、'svg'、'vml'
    devicePixelRatio:2,	    number	2	画布大小与容器大小之比，仅当 renderer 为 'canvas' 时有效。
    width:100,	number|string	'auto'	画布宽度，设为 'auto' 则根据 devicePixelRatio 与容器宽度自动计算。
    height:100	number|string	'auto'	画布高度，设为 'auto' 则根据 devicePixelRatio 与容器高度自动计算。
 * }
*/

export function init(dom,opts) {
    if(!dom) return;
    if(typeof(opts) != 'object') return;
    const options = {
        renderer:opts.renderer || 'canvas',
        devicePixelRatio:opts.devicePixelRatio || 2,
        width:opts.width || 100,
        height:opts.height || 100,
    }
    return od.init(dom,options);
}