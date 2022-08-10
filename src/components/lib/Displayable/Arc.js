import * as od from "zrender";

/**
 * @des 圆弧
    opts	Object	 	配置项，继承得到的配置项参见 zrender.Displayable。
    opts.shape	Object	 	形状属性。
    opts.shape.cx	number	0	圆心横坐标。
    opts.shape.cy	number	0	圆心纵坐标。
    opts.shape.r	number	0	半径。
    opts.shape.startAngle	number	0	起始弧度。
    opts.shape.endAngle	number	Math.PI * 2	终止弧度。
    opts.shape.clockwise	boolean	true	顺时针方向。
*/

export function Arc(zr,opts) {
    if(!zr) return;
    if(typeof(opts)!= 'object') return;
    // const options = {
    //     style:{},
    //     shape:{
    //         cx: opts.cx || 0,
    //         cy: opts.cy || 0,
    //         r: opts.r || 0,
    //         startAngle: opts.startAngle || 0,
    //         endAngle: opts.endAngle || Math.PI * 2,
    //         closed: opts.clockwise || true,
    //     }
    // }
    const arc = new od.Arc(opts);
    arc.attr('name','arc');
    zr.add(arc);
    return arc;
}