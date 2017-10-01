const puppeteer = require('puppeteer');
const Provider = require('../provider');

const config = require('../config');

const utils = require('../utils');

class JuheProvider extends Provider {
  constructor() {
    super();
  }
  async resolve(ctx, phone) {
    const URL = `https://www.juhe.cn/register`;

    const page = ctx.page;

    await page.goto(URL, {
      networkIdleTimeout: 5000,
      waitUntil: 'networkidle',
      timeout: 3000000
    });

    await page.deleteCookie();

    const [$username, $password, $mobile, $sendBtn] = await Promise.all([
      page.$('#username'),
      page.$('#password'),
      page.$('#mobilephone'),
      page.$('#reg_smsbtn')
    ]);

    await $username.click();
    await page.type('smsboom2017', { delay: 100 });

    await $password.click();
    await page.type('123123abcabc', { delay: 100 });

    await $mobile.click();
    await page.type(phone + '', { delay: 100 });

    await $sendBtn.click({ button: 'left' });
  }
}

module.exports = JuheProvider;