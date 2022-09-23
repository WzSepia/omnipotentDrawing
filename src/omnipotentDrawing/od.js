import * as od from 'zrender';

/**
 * @name 绘制文本
 * @description
 */
function drawText(opt,zr) {
    const opts = {
        rectHover: true,
        x: (opt ? opt.x : null) || Math.round(Math.random() * 300),
        y: (opt ? opt.y : null) || Math.round(Math.random() * 300),
        style: {
            text: (opt ? opt.style.text : null) || "我是文本阿三大啊啊啊实打实大大",
            fill:
                (opt ? opt.style.fill : null) ||
                `rgb(${Math.round(Math.random() * 255)},${Math.round(
                    Math.random() * 255
                )},${Math.round(Math.random() * 255)})`,
            fontFamily: (opt ? opt.style.fontFamily : null) || "微软雅黑",
            fontSize: (opt ? opt.style.fontSize : null) || "18px",
            width: (opt ? opt.style.width : null) || 100,
            height: (opt ? opt.style.height : null) || 40,
            overflow:(opt ? opt.style.overflow : 'truncate'),//break,breakAll,truncate
            //文字位置'inside'、 'left'、 'right'、 'top'、 'bottom'
            textPosition: (opt ? opt.style.textPosition : "inside"),
        },
        zlevel: 2,
        onclick() {
        },
        ondrag() {
        },
    };
    const text = new od.Text(opts);
    text.attr({
        options: {
            type: (opt ? opt.options.type : null) || "text",
            name: (opt ? opt.options.name : null) || "text" + text.id,
            code: (opt ? opt.options.code : null) || "text" + text.id, //图片代码
            checked: (opt ? opt.options.checked : null) || false, //是否默认选中
            jumpNumber: {
                //跳数
                show: (opt ? opt.options.jumpNumber.show : null) || false,
                time: (opt ? opt.options.jumpNumber.time : null) || null,
                split: (opt ? opt.options.jumpNumber.split : null) || null,
            },
        },
    });
    zr.add(text);
}
/**
 * @name 图片（包括SVG）
 * @description
 */
function drawImg(opt,zr) {
    const opts = {
        x: (opt ? opt.x : null) || Math.round(Math.random() * 300),
        y: (opt ? opt.y : null) || Math.round(Math.random() * 300),
        style: {
            image: (opt ? opt.style.image : null) || this.img,
            width: (opt ? opt.style.width : null) || 50,
            height: (opt ? opt.style.height : null) || 50,
        },
        zlevel: 1,
        onclick() {
        },
        ondrag() {
        },
    };
    const img = new od.Image(opts);
    img.attr({
        options: {
            type: (opt ? opt.options.type : null) || "image",
            name: (opt ? opt.options.name : null) || "image" + img.id,
            code: (opt ? opt.options.code : null) || "image" + img.id, //图片代码
            checked: (opt ? opt.options.checked : null) || false, //是否默认选中
        },
    });
    zr.add(img);
}

/**
 * @name 绘制方法集合
 * @description 包含文本，图片，形状等绘制方法
 */
function odRender(type, opt,zr) {
    switch (type) {
        case "text":
            drawText(opt,zr);
            break;
        case "image":
            drawImg(opt,zr);
            break;
    }
}
/**
 * @name 事件集合
 * */
function odEvents(e) {
    console.log(e);
}

odEvents.prototype.odClick = function (e) {
    console.log('点击事件');
};


export default odRender;