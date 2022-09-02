/**
 * @description 绑定事件处理。
    eventName	string	 	事件名称，支持： 'click'、 'mousedown'、 'mouseup'、 'mousewheel'、 'dblclick'、 'contextmenu'。
    eventHandler	Function	 	事件处理的回调函数。
    context	Object	 	函数上下文。
*/

export function on(eventName, eventHandler, context) {
    console.l0g(eventName, eventHandler, context);
    
}