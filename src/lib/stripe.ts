import Stripe from 'stripe';

if(!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing env STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-10-28.acacia", // use latest version
});

export default stripe;