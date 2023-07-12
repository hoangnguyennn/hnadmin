/* eslint-disable @typescript-eslint/no-explicit-any */
export default class CommonUtil {
  static getStyleValue(style: string) {
    const value = style.split('px')[0]
    return +value
  }

  static deepEqual(a: any, b: any): boolean {
    if (a === b) {
      // 2 object cùng địa chỉ hoặc 2 primitive cùng giá trị
      return true
    }

    if (typeof a !== 'object' || typeof b !== 'object') {
      // 1 trong 2 không phải là object (hoặc cả 2)
      return false
    }

    if (a instanceof Date && b instanceof Date) {
      // ngày tháng thì so sánh timestamp
      return a.getTime() === b.getTime()
    }

    const props = Object.keys(a)

    if (props.length !== Object.keys(b).length) {
      // 2 object có số lượng property khác nhau
      return false
    }

    return props.every((key: any) => CommonUtil.deepEqual(a[key], b[key]))
  }
}
