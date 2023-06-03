/**
 * 工具程式
 * 可以將通用的 function 放置在這邊引用
 */


/** sleep */
export function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}