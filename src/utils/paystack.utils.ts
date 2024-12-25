import config from "../config";
import axios from "axios";

export interface CreatePaystackPaymentDto {
  amount: string;
  email: string;
}

export type VerifyAccountNumberDto = {
  accountNumber: string;
  bankCode: string;
};

const base_url = config.paystack.base_url;
const secret_key = config.paystack.secret_key;

export class PaystackService {

  async createPayment(payload: CreatePaystackPaymentDto) {
    try {
      const url: string = base_url + "/transaction/initialize";
      const { data, status } = await axios.post(
        url,
        {
          amount: payload.amount,
          email: payload.email,
          channels: ["card", "bank", "bank_transfer"],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${secret_key}`,
          },
        }
      );
      if (status === 200) return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async verifyAccountNumber(dto: VerifyAccountNumberDto) {
    try {
      const url =
        base_url +
        `/bank/resolve?account_number=${dto.accountNumber}&bank_code=${dto.bankCode}`;
      const { data, status } = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: ` Bearer ${secret_key}`,
        },
      });
      if (status === 200) return data;
      return null;
    } catch (error) {
      return null;
    }
  }
}