
export function merge(target, ...params: any[]) {
   var sources = [].slice.call(arguments, 1);
   sources.forEach(function (source) {
      for (var prop in source) {
         target[prop] = source[prop];
      }
   });
   return target;
}
