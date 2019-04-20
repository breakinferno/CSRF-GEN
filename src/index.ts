import uuidv5 from 'uuid/v5';
import md5 from 'md5';
const CSRF_KEY = 'csrf';
const UUID_NAME_SPACE = '3508ba62-0ebf-4b70-9530-f71adcee9df1';

/**
 * 获取域名
 * @returns {string}
 */
function getDomain(ctx): string {
  return ctx.request.hostname;
}
/**
 * 设置cookie, 其他配置一般不变
 * 这里会话级cookie，不必设置expire 和 maxAge
 * @param {string} key cookie key
 * @param {string} value cookie value
 * @param {*} ctx
 */
function setCookie(key: string, value: string, option: CookieOption, ctx: any): void {
  const domain = getDomain(ctx);
  ctx.cookies.set(key, value, {
    ...{
      domain: domain,
      path: '/',
      httpOnly: true,
      overwrite: true,
      secure: true,
    },
    ...option,
  });
}

/**
 * 根据key读取cookie
 * @param {string} key
 * @param {*} ctx
 * @returns {string}
 */
function getCookie(key: string, ctx): string {
  return ctx.cookies.get(key);
}

/**
 * 生成token并且存入cookie用于验证
 * @export
 * @param {*} ctx koa 上下文
 * @returns {string}
 */
function createCSRF(ctx, option: CookieOption) {
  return (): string => {
    const value = md5(uuidv5(md5('csrf-luffylv' + Date.now()), UUID_NAME_SPACE));
    setCookie(CSRF_KEY, value, option, ctx);
    return value;
  };
}
/**
 * 校验CSRF token
 * @returns {Boolean}
 */
function verifyCSRF(ctx) {
  return (token: string): Boolean => {
    const cookieToken =  getCookie(CSRF_KEY, ctx);
    if (cookieToken === token) {
      return true;
    }
    return false;
  };
}

// 没啥需要用户自定义的配置，直接export即可
export default function (option: CookieOption): (ctx: any, next: Function) => Promise<any> {
  return async (ctx: any, next: Function) => {
    ctx.createCSRF = createCSRF(ctx, option);
    ctx.verifyCSRF = verifyCSRF(ctx);
    await next();
  };
}
