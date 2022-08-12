/**
 * @description 时间绑定
    eventName	string	 	事件名称，支持： 'click'、 'mousedown'、 'mouseup'、 'mousewheel'、 'dblclick'、 'contextmenu'。
    eventHandler	Function	 	事件处理的回调函数。
    context	Object	 	函数上下文。
*/
export function on(eventName, eventHandler, context,zr) {
  console.log(eventName, eventHandler, context, zr);
  switch (eventName) {
    case 'click':
        eventHandler;
      break;

    default:
      break;
  }
}
