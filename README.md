## Overview
This backend application powers the functionality for the fintech platform. It handles user registration, login, wallet management, transactions, and integration with Paystack for funding accounts.  

### Key Features  
- User registration and authentication.  
- Wallet management (balance inquiry, fund wallet, and transfer funds).  
- Transaction history management.  
- Paystack payment integration.  
- Webhook for payment confirmation.


## Technologies Used  
- Framework: Node.js (Express.js)  
- Database: PostgreSQL  
- ORM: TypeORM  
- Containerization: Docker & Docker Compose  
- Payment Gateway: Paystack  


## Setup and Installation  

### Prerequisites  
1. Node.js installed on your system.  
2. Docker and Docker Compose installed.  
3. Ngrok for exposing local services to the internet.  
4. A Paystack account for payment integration.


### Steps to Run the Application  

1. Clone the Repository:  
   ```bash
   git clone <backend-repo-url>
   cd <project-folder>
   ```

2. Set Up Environment Variables:  
   - Copy the `.env.example` file and rename it to `.env`:  
     ```bash
     cp .env.example .env
     ```
   - Update the following fields in `.env`:
     - `PAYSTACK_SECRET_KEY=<your-paystack-secret-key>` 

3. Start the Database:  
   The database is set up using Docker Compose. Run the following command to start the database:  
   ```bash
   docker-compose up -d
   ```

4. Expose Backend Using Ngrok:  
   - Start the backend server:  
     ```bash
     npm run dev
     ```
   - Use Ngrok to expose the backend:  
     ```bash
     ngrok http <backend-port>
     ```
   - Copy the generated public URL from Ngrok and update your Paystack settings with the Webhook URL:  
     ```plaintext
     <ngrok-url>/api/transaction/webhook
     ```

5. Expose Frontend Using Ngrok:  
   Follow a similar Ngrok setup for the frontend. Update the Redirect URL in Paystack to match the exposed frontend URL.


### Database Migration  
TypeORM manages the database models. Run migrations using:  
```bash
npm run typeorm migration:run
```


## Project Structure

```plaintext
src/
├── config/          # Application configuration files
├── controllers/     # Route controllers
├── entities/        # Database models
├── middleware/      # Middleware (e.g., authentication)
├── routes/          # Application routes
├── services/        # Business logic
├── utils/           # Utility functions
├── app.ts           # Express application setup
└── server.ts        # Application server entry point
```


## Usage Guide

### Authentication  
- Register: `/api/auth/register`  
  Create a new user account.  
- Login: `/api/auth/login`  
  Authenticate a user and return a token.  

### Wallet Management  \ 
- Fund Wallet: `/api/wallet/fund`  
  Initiates a funding process via Paystack. Redirects the user to Paystack's payment page.  
- Transfer Funds: `/api/wallet/transfer`  
  Transfer funds to another user.  

### Transaction History  
- List Transactions: `/api/transaction/history`  
  Retrieve the list of user transactions.  

### Paystack Integration  
- Webhook: `/api/transaction/webhook`  
  Used by Paystack to notify the backend of successful payments. Ensure the Webhook URL is registered in your Paystack settings.


## Running with Docker Compose  
To run the application entirely using Docker Compose:  
1. Ensure your `.env` file is set up correctly.  
2. Start the services:  
   ```bash
   docker-compose up --build
   ```


## Important Notes  
1. Ngrok URLs:  
   Ensure both the backend and frontend are exposed using Ngrok, and update the URLs in Paystack's dashboard:  
   - Webhook URL: `<ngrok-backend-url>/webhook`  
   - Redirect URL: `<ngrok-frontend-url>/wallet`

2. Paystack Secret Key:  
   The `PAYSTACK_SECRET_KEY` must be set in the `.env` file for transactions to work.

3. Frontend Integration:  
   Ensure the backend URL in the frontend `.env` matches the Ngrok URL of the backend.


## Troubleshooting  
- Webhook Not Triggering:  
  Check that the correct Ngrok URL is registered in Paystack's Webhook settings.  
- Database Issues:  
  Ensure the database is running via Docker and the credentials in `.env` is correct.  
- Payment Errors:  
  Confirm that the Paystack keys in `.env` are correct and active.

