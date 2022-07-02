require('dotenv/config');

import axios from 'axios';

class SMSService {
  async sendCode({ number }) {
    try {
      const result = await axios.post(
        'https://api.smstoken.com.br/token/v1/verify',
        {
          key: process.env.SMS_TOKEN,
          number: number,
          template: 'Seu código de verificacao remembeer: {999999}',
          expire: 120,
        }
      );

      return result.data;
    } catch (e) {
      return null;
    }
  }

  async checkCode({ number, code }) {
    try {
      const result = await axios.post(
        'https://api.smstoken.com.br/token/v1/check',
        {
          key: process.env.SMS_TOKEN,
          number: number,
          code: code,
        }
      );

      return result.data.checked;
    } catch (e) {
      return false;
    }
  }
}

export default new SMSService();
