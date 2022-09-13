/**
 * @description 抽象类 可显示的元素
 *
 */
import _ from 'lodash';
export function setOpts(opts) {
  if (typeof opts != "object") return;
  const init = {
    code: "", //图片代码
    checked: false, //是否默认选中
    culling: opts.culling || false, //boolean	false	是否进行裁剪。
    cursor: opts.cursor || "pointer", //string	'pointer'	鼠标移到元素上时的鼠标样式。
    draggable: opts.draggable || false, //boolean	false	图形是否可拖曳。
    invisible: opts.invisible || false, //boolean	false	图形是否不可见，为 true 时不绘制图形，但是仍能触发鼠标事件。
    progressive: opts.progressive || -1, //number	-1	是否渐进式渲染。当图形元素过多时才使用，用大于 0 的数字表示渲染顺序。
    rectHover: opts.rectHover || false, //boolean	false	是否使用包围盒检验鼠标是否移动到物体。false 则检测元素实际的内容。
    silent: opts.silent || false, //boolean	false	是否响应鼠标事件。
    zlevel: opts.zlevel || 0, //number	0	决定绘画在哪层 Canvas 中。Canvas 分层是一种常见的优化手段。我们可以把一些图形变化频繁（例如有动画）的组件设置成一个单独的 zlevel。需要注意的是过多的 Canvas 会引起内存开销的增大，在手机端上需要谨慎使用以防崩溃。zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面。
    z: opts.z || 0, //number	0	控制图形的前后顺序。z 值小的图形会被 z 值大的图形覆盖。z 相比 zlevel 优先级更低，而且不会创建新的 Canvas。
    z2: opts.z2 || 0, //number	0	与 z 类似，优先级比 z 更低。
  };
  opts.style ? opts.style : (opts.style = {});
  const style = {
    fill: opts.style.fill || "#000", //string	'#000'	填充样式。
    stroke: opts.style.stroke || null, //string	null	描边样式。
    opacity: opts.style.opacity || 1, //number	1	不透明度。
    lineDash: opts.style.lineDash || null, //number[]	null	描边虚线样式，参考 SVG stroke-dasharray。
    lineDashOffset: opts.style.lineDashOffset || null, //number	null	描边虚线偏移，参考 SVG stroke-dashoffset。
    shadowBlur: opts.style.shadowBlur || 0, //	number	0	阴影模糊大小。
    shadowColor: opts.style.shadowColor || "transparent", //	string	'transparent'	阴影颜色。
    shadowOffsetX: opts.style.shadowOffsetX || 0, //	number	0	阴影横向偏移。
    shadowOffsetY: opts.style.shadowOffsetY || 0, //	number	0	阴影纵向偏移。
    lineWidth: opts.style.lineWidth || 0, //	number	0	线宽。
    strokeNoScale: opts.style.strokeNoScale || false, //	boolean	false	描边粗细不随缩放而改变，false 则会根据缩放同比例缩放描边粗细。
    text: opts.style.text || null, //	string	null	在图形中显示的文字。
    font: opts.style.font || null, //	string	null	文字样式，由 fontSize、 fontFamily、 fontStyle、 fontWeight 组成，建议分别设置这几项而非直接设置 font。
    fontStyle: opts.style.fontStyle || null, //	string	null	同 CSS font-style。
    fontWeight: opts.style.fontWeight || null, //	string	null	同 CSS font-weight。
    fontSize: opts.style.fontSize || null, //	string	null	同 CSS font-size。
    fontFamily: opts.style.fontFamily || null, //	string	null	同 CSS font-family。
    textFill: opts.style.textFill || null, //	string	null	文字填充样式。
    textStroke: opts.style.textStroke || null, //	string	null	文字描边样式。
    textWidth: opts.style.textWidth || null, //	number	null	文字宽度。
    textHeight: opts.style.textHeight || null, //	number	null	文字高度，仅用于设置背景色时需要设置。
    textLineWidth: opts.style.textLineWidth || 0, //	number	0	文字描边宽度。
    textLineHeight: opts.style.textLineHeight || 0, //	number	0	文字行高。
    textPosition: opts.style.textPosition || "inside", //	string|number[]	'inside'	文字位置，可以为 'inside'、 'left'、 'right'、 'top'、 'bottom'，或一个二维数组 [x, y] 表示相对形状的位置。
    textRect: opts.style.textRect || null, //	Object	null	文字包围盒，包括 x、 y、 width、 height 属性，如果没有设置，将使用形状的包围盒。
    textOffset: opts.style.textOffset || null, //	number[]	null	文字位置偏移，包括 x、 y。
    textAlign: opts.style.textAlign || null, //	string	null	文字水平对齐方式，可取值：'left'、 'center'、 'right'，默认根据 textPosition 计算。
    textVerticalAlign: opts.style.textVerticalAlign || null, //	string	null	文字垂直对齐方式，可取值：'top'、 'middle'、 'bottom'，默认根据 textPosition 计算。
    textDistance: opts.style.textDistance || 5, //	number	5	文字与其对齐的边缘的距离，如 textPosition 为 top 时，textDistance 表示与形状上方的距离。
    textShadowColor: opts.style.textShadowColor || "transparent", //	string	'transparent'	文字阴影颜色。
    textShadowBlur: opts.style.textShadowBlur || 0, //	number	0	文字阴影模糊大小。
    textShadowOffsetX: opts.style.textShadowOffsetX || 0, //	number	0	文字阴影水平偏移。
    textShadowOffsetY: opts.style.textShadowOffsetY || 0, //	number	0	文字阴影垂直偏移。
    textBoxShadowColor: opts.style.textBoxShadowColor || "transparent", //	string	'transparent'	文字包围盒阴影颜色。
    textBoxShadowBlur: opts.style.textBoxShadowBlur || 0, //	number	0	文字包围盒阴影模糊大小。
    textBoxShadowOffsetX: opts.style.textBoxShadowOffsetX || 0, //	number	0	文字包围盒阴影水平偏移。
    textBoxShadowOffsetY: opts.style.textBoxShadowOffsetY || 0, //	number	0	文字包围盒阴影垂直偏移。
    transformText: opts.style.transformText || false, //	boolean	false	文字是否跟随变换效果，仅对 Path 或 Image 元素有效
    textRotation: opts.style.textRotation || 0, //	number	0	文字旋转角度，仅对 Path 或 Image 元素有效，并且 transformText 应设置为 false。
    textOrigin: opts.style.textOrigin || null, //	string|number[]	null	文字变换中心，可以是 'center' 或一个二维数组 [x, y] 表示相对形状的位置，默认值是 textPosition。
    textBackgroundColor: opts.style.textBackgroundColor || null, //	string	null	文字包围盒颜色。
    textBorderColor: opts.style.textBorderColor || null, //	string	null	文字包围盒描边颜色。
    textBorderWidth: opts.style.textBorderWidth || 0, //	number	0	文字包围盒描边宽度。
    textBorderRadius: opts.style.textBorderRadius || 0, //	number	0	文字圆角大小。
    textPadding: opts.style.textPadding || null, //	number|number[]	null	文字内边距，可以是 2 或 [2, 4] 或 [2, 3, 4, 5] 的形式，同 CSS Padding，单位是像素。
    rich: opts.style.rich || null, //	Object	null	富文本样式，参考 ECharts rich 配置项。
    truncate:{
      outerWidth: (opts.style.truncate&&opts.style.truncate.outerWidth) ? opts.style.truncate.outerWidth : null, //	number	null	包含了 textPadding 的宽度，超出这个范围就裁剪。
      outerHeight: (opts.style.truncate&&opts.style.truncate.outerHeight) ? opts.style.truncate.outerHeight : null, //	number	null	包含了 textPadding 的高度，超出这个范围就裁剪。
      ellipsis: (opts.style.truncate&&opts.style.truncate.ellipsis) ? opts.style.truncate.ellipsis : "...", //	strinsg	'...'	默认用省略号表示超出部分，也可以对其进行自定义。
      placeholder: (opts.style.truncate&&opts.style.truncate.placeholder) ? opts.style.truncate.placeholder : null, //	string	null	如果空间过小，导致省略号也显示不下，但是又不想空着，可能得有个什么标记表示这里是有字符的，就用个 “点”，就是在这个 placeholder 里设置。
    },
    blend: opts.style.blend || null //	string	null	混合模式，同 Canvas globalCompositeOperation。 
  };
  init.style = style;
  return _.mergeWith(init,opts);
  // return Object.assign({}, init, opts);
}
