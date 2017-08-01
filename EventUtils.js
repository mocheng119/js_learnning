/**
 * 
 * @authors kuanx (xk1152353630@gmail.com)
 * @date    2017-07-30 16:54:58
 * @version $1.0$
 */
var EventUtil = {
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    getEvent: function(event) {
        return event ? event : window.event;
    },
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    getRelatedTarget: function(event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    },
    getButton: function(event) {
        if (document.implementation.hasFeature("MouseEvents", "2.0")) {
            return event.button;
        } else {
            switch (event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },
    getWheelDelta: function(event) {
        if (event.wheelDelta) {
            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    },
    getCharCode: function(event) {
        if (typeof event.charCode == "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    },
    getClipboardText: function(event) {
        var clipboardData = (event.clipboardData || window.clipboardData);
        return clipboardData.getData("text");
    },
    setClipboardText: function(event, value) {
        if (event.clipboardData) {
            return event.clipboardData.setData("text/plain", value);
        } else if (window.clipboardData) {
            return window.clipboardData.setData("text", value);
        }
    },
};
//UI事件，除了DOMActivate之外的，又都称为HTML事件
EventUtil.addHandler(window, "load", function(event) {
    console.log("已经加载完成！");
});
EventUtil.addHandler(window, "unload", function(event) {
    console.log("That's unload event!");
});
EventUtil.addHandler(window, "resize", function(event) {
    console.log("这是窗口变化事件");
});
EventUtil.addHandler(window, "scroll", function(event) {
    if (document.compatMode == "CSS1Compat") {
        console.log(document.documentElement.scrollTop);
    } else {
        console.log(document.body.scrollTop);
    }
});
//焦点事件
//鼠标与滚轮事件
//客户区坐标位置
var div = document.getElementById("myDiv");
EventUtil.addHandler(div, "click", function(event) {
    event = EventUtil.getEvent(event);
    console.log(event.clientX + " , " + event.clientY);
});
//页面坐标位置
EventUtil.addHandler(div, "click", function(event) {
    //兼容IE8及以下
    event = EventUtil.getEvent(event);
    var pageX = event.pageX;
    var pageY = event.pageY;
    if (pageX == undefined) {
        pageX = event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
    }
    if (pageY == undefined) {
        pageY = event.clientY + (document.body.scrollTop || document.documentElement.scrollTop);
    }
    console.log("(" + event.pageX + "," + event.pageY + ")");
});
//屏幕坐标位置
EventUtil.addHandler(div, "click", function(event) {
    event = EventUtil.getEvent(event);
    console.log(event.screenX + " , " + event.screenY);
});
//修改键
EventUtil.addHandler(div, "click", function(event) {
    event = EventUtil.getEvent(event);
    var keys = new Array();
    if (event.shiftKey) {
        keys.push("shift");
    }
    if (event.ctrlKey) {
        keys.push("ctrl");
    }
    if (event.altKey) {
        keys.push("altKey");
    }
    if (event.metaKey) {
        keys.push("meta");
    }
    console.log(keys.join("_"));
});
//相关元素
EventUtil.addHandler(div, "click", function(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var relatedTarget = EventUtil.getRelatedTarget(event);
    console.log("moused out of" + target.tagName + "to" + relatedTarget.tagName);
});
//鼠标按钮
EventUtil.addHandler(div, "mousedown", function(event) {
    event = EventUtil.getEvent(event);
    console.log(EventUtil.getButton(event));
});
//处理鼠标滚轮事件
EventUtil.addHandler(div, "mousewheel", function(event) {
    event = EventUtil.getEvent(event);
    var delta = (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
    console.log(delta);
});
//为了兼容FireFox的DOMMouseScroll
//可以写成下列结构
(function() {
    function handleMouseWheel(event) {
        event = EventUtil.getEvent(event);
        var delta = EventUtil.getWheelDelta(event);
        console.log(delta);
    }
    EventUtil.addHandler(document, "mousewheel", handleMouseWheel);
    EventUtil.addHandler(document, "DOMMouseScroll", handleMouseWheel);
})();
//键盘与文本事件
var textbox = document.getElementById("myText");
EventUtil.addHandler(textbox, "keypress", function(event) {
    event = EventUtil.getEvent(event);
    console.log(EventUtil.getCharCode(event));
});
EventUtil.addHandler(textbox, "keypress", function(event) {
    event = EventUtil.getEvent(event);
    var identifier = event.key || event.keyIdentifier;
    if (identifier) {
        console.log(identifier);
    }
    var loc = event.location || event.keyLocation;
    if (loc) {
        console.log(loc);
    }
    if (event.getModifierState) {
        console.log(event.getModifierState("shift"));
    }
});
//textinput
EventUtil.addHandler(textbox, "textInput", function(event) {
    event = EventUtil.getEvent(event);
    console.log(event.data);
});
//复合事件
EventUtil.addHandler(textbox, "compositionstart", function(event) {
    event = EventUtil.getEvent(event);
    console.log(event.data);
});
EventUtil.addHandler(textbox, "compositionupdate", function(event) {
    event = EventUtil.getEvent(event);
    console.log(event.data);
});
EventUtil.addHandler(textbox, "compositionend", function(event) {
    event = EventUtil.getEvent(event);
    console.log(event.data);
});
//H5事件
//有一个可点击的按钮，然后有一个隐藏的菜单
EventUtil.addHandler(window, "load", function(event) {
    var div = document.getElementById("myDiv");
    EventUtil.addHandler(div, "contextmenu", function(event) {
        event = EventUtil.getEvent(event);
        EventUtil.preventDefault(event);
        var menu = document.getElementById("myMenu");
        menu.style.left = event.clientX + "px";
        menu.style.top = event.clientY + "px";
        menu.style.visibility = "visible";
    });
    EventUtil.addHandler(document, "click", function(event) {
        document.getElementById("myMenu").style.visibility = "hidden";
    });
});
//beforeunload事件
EventUtil.addHandler(window, "beforeunload", function(event) {
    event = EventUtil.getEvent(event);
    var message = "你真的要离开吗？";
    event.returnValue = message;
    return message;
});
//处理触摸事件
(function() {
    function handleTouchevent(event) {
        switch (event.type) {
            case "touchstart":
                console.log("Touch event start!" + event.touches[0].clientX + "," + event.touches[0].clientY);
                break;
            case "touchend":
                console.log("Touch event end!");
                break;
            case "touchmove":
                event.preventDefault(); //阻止滚动
                break;
        }
    }
    EventUtil.addHandler(document, "touchstart", handleTouchevent);
})();
//处理手势事件
(function() {
    function handleGestureEvent(event) {
        switch (event.type) {
            case "gesturestart":
                break;
            case "gestureend":
                break;
            case "gesturechange":
                break;
        }
    }
    EventUtil.addHandler(document, "gesturechange", handleGestureEvent);
})();
//事件委托
/*
<ul id="myul">
<li id="a"></li>
<li id="b"></li>
<li id="c"></li>
</ul>
*/
var list = document.getElementById("myul");
EventUtil.addHandler(list, "click", function(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    switch (target.id) {
        case a:
            document.title = "改变标题栏目";
            break;
        case b:
            location.href = "www.baidu.com";
            break;
        case c:
            alert("hi!");
            break;
    }
});
//取得选择的文本
var textbox = document.getElementById("a textbox");
(function getSelectedText(textbox) {
    if (typeof textbox.selectionStart == "number") {
        return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd);
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
})();
//选择部分文本
var textbox = document.getElementById("a textbox");
(function selectText(textbox, startIndex, stopIndex) {
    if (textbox.setSelectionRange) {
        textbox.setSelectionRange(startIndex, stopIndex);
    } else if (textbox.createTextRange) {
        var range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart("charater", startIndex);
        range.moveEnd("charater", stopIndex - startIndex);
        range.select();
    }
})();
//过滤输入
//屏蔽非数字
EventUtil.addHandler(textbox, "keypress", function(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var charCode = EventUtil.getCharCode(event);
    if (!/\d/.test(String.fromCharCode(charCode)) && charCode > 9 && !event.ctrlKey) {
        EventUtil.preventDefault(event);
    }
});
//检验粘贴数据是否有效
EventUtil.addHandler(textbox, "paste", function(event) {
    event = EventUtil.getEvent(event);
    var text = EventUtil.getClipboardText(event);
    if (!/^\d*$/.test(text)) {
        EventUtil.preventDefault(event);
    }
});
//自动切换焦点,这里没有考虑隐藏字段
/*
<input type="text" name="tel1" id="teltext1" maxlength="3">
<input type="text" name="tel2" id="teltext2" maxlength="3">
<input type="text" name="tel3" id="teltext3" maxlength="4">
*/
(function() {
    function tabForward(event) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        if (target.value.length == target.maxLength) {
            var form = target.form;
            for (var i = 0, len = form.elements.length; i < len; i++) {
                if (form.elements[i] == target) {
                    if (form.elements[i + 1]) {
                        form.elements[i + 1].focus();
                    }
                    return;
                }
            }
            i = null;
        }
    }
    var textbox1 = document.getElementById("teltext1");
    EventUtil.addHandler(textbox1, "keyup", tabForward);
    var textbox2 = document.getElementById("teltext2");
    EventUtil.addHandler(textbox2, "keyup", tabForward);
    var textbox3 = document.getElementById("teltext3");
    EventUtil.addHandler(textbox3, "keyup", tabForward);
})();
//原生JS实现表单序列化
(function serialize(form) {
    var parts = [];
    field = null,
        i,
        len,
        j,
        optLen,
        option,
        optValue;
    for (i = o, len = form.elements.length; i < len; i++) {
        field = form.elements[i];
        switch (field.type) {
            case "select-one":
            case "select-multiple":
                if (field.name.length) {
                    for (j = 0, optLen = field.options.length; j < optLen; j++) {
                        option = field.options[j];
                        if (option.selected) {
                            optValue = "";
                            if (option.hasAttribute) {
                                optValue = (option.hasAttribute("value") ? option.value : option.text);
                            } else {
                                optValue = (option.attributes["value"].specified ? option.value : option.text);
                            }
                            parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
                        }
                    }
                }
                break;
            case undefined: //字段集
            case "file": //文件输入
            case "submit": //提交按钮
            case "reset": //重置按钮
            case "button": //自定义按钮
                break;
            case "radio":
            case "checkbox":
                if (!field.checked) {
                    break;
                }
                //这里执行默认操作
            default:
                if (field.name.length) {
                    parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                }
        }
    }
    return parts.join("&");
})();
