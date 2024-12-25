import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), './.env'),
});

export default { 
    port: 5000,
    db: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME,
    },
    jwt: {
      secretKey: process.env.JWT_SECRET_KEY,
    },
    paystack: {
      secret_key: process.env.PAYSTACK_SECRET_KEY,
      base_url: "https://api.paystack.co",
    }
}
