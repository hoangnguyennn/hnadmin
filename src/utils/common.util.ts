export default class CommonUtil {
  static getStyleValue(style: string) {
    const value = style.split('px')[0]
    return +value
  }
}
