const throttle = function(func, wait, options) {
  
  // options选项
  // 如果想忽略开始函数的的调用，传入{leading: false}
  // 如果想忽略结尾函数的调用，传入{trailing: false}

  var context, args, result;
  var timeout = null;

  // 缓存上次调用时间
  var previous = 0;

  // 如果 options 没传则设为空对象
  if (!options) options = {};

  // 定时器回调函数
  var later = function() {

    // 如果设置了 leading（忽略开始函数），就将 previous 设为 0
    previous = options.leading === false ? 0 : Date.now();

    // 置空一是为了防止内存泄漏，二是为了下面的定时器判断
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;

  };

  return function() {

    // 获得当前时间戳
    var now = Date.now();

    // 首次进入：因为previous=0，所以，如果不设置忽略开始函数
    // 那么 previous = now
    if (!previous && options.leading === false) previous = now;

    // 计算剩余时间
    var remaining = wait - (now - previous);

    context = this;
    args = arguments;
    
    if (remaining <= 0 || remaining > wait) {
      // 如果当前调用已经大于上次调用时间+wait。（已过时间间隔）
      // 或者用户手动调了时间

      // 如果存在定时器就清理掉
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      // 缓存时间
      previous = now;
      result = func.apply(context, args);

      // 清理内存
      if (!timeout) context = args = null;

    } else if (!timeout && options.trailing !== false) {
      // 开始或者结尾时调用的函数

      // 开始调用时: remaining = wait
      // 最后调用时：remaining = 距离wait时间
      timeout = setTimeout(later, remaining); 
    }

    return result;
  };
};

export default throttle;
