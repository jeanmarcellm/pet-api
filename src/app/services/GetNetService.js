require('dotenv/config');

import axios from 'axios';

class GetNetService {
  async tokenizeCard(card_number, auth) {
    try {
      const result = await axios.post(
        process.env.GETNET_HOST + '/v1/tokens/card',
        {
          card_number: card_number,
        },
        {
          headers: {
            Authorization: 'Bearer ' + auth,
          },
        }
      );

      return result.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async getAuth(client_id, client_secret) {
    var Authorization =
      'Basic ' +
      Buffer.from(client_id + ':' + client_secret).toString('base64');

    const params = new URLSearchParams();
    params.append('scope', 'oob');
    params.append('grant_type', 'client_credentials');

    try {
      const result = await axios.post(
        process.env.GETNET_HOST + '/auth/oauth/v2/token',
        params,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization,
          },
        }
      );

      return result.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async addCardToVault(card, auth) {
    const {
      number_token,
      brand,
      cardholder_name,
      expiration_month,
      expiration_year,
      customer_id,
      cardholder_identification,
      verify_card,
      security_code,
    } = card;

    try {
      const result = await axios.post(
        process.env.GETNET_HOST + '/v1/cards',
        {
          number_token,
          brand,
          cardholder_name,
          expiration_month,
          expiration_year,
          customer_id,
          cardholder_identification,
          verify_card,
          security_code,
        },
        {
          headers: {
            Authorization: 'Bearer ' + auth,
          },
        }
      );

      return result.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

export default new GetNetService();
