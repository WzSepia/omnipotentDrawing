import * as od from "zrender";

/**
 * @description 图像
    opts	Object	 	配置项，继承得到的配置项参见 zrender.Displayable。
    opts.style	Object	 	样式。
    opts.style.image	string|HTMLImageElement|HTMLCanvasElement	 	图片的内容，可以是图片的 URL，也可以是 dataURI。
    opts.style.x	number	 	图片左上角相对于父节点的横坐标。
    opts.style.y	number	 	图片左上角相对于父节点的纵坐标。
    opts.style.width	number	 	图片宽度。
    opts.style.height	number	 	图片高度。
*/
export function Image(opts) {
    const el = new od.Image(opts);
    el.attr({
        type:'image',
        name:'image'+el.id
    });
    return el;
}