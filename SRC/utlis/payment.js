import Stripe from "stripe";


 async function payment({
        stripe=new Stripe(process.env.STRIPE_KEY),
        payment_method_types=["card"],
        mode='payment',
        customer_email,
        cancel_url=process.env.CANCEL_URL,
        success_url=process.env.SUCCESS_URL,
        metadata={},
        line_items=[],
        discounts=[],

    }={}) {
    const session=stripe.checkout.sessions.create({
        payment_method_types,
        mode,
        customer_email,
        cancel_url,
        success_url,
        metadata,
        line_items,
        discounts,

    })
    return session
}
     export default payment
/*
[{
            price_data={
                currency='usd',
                product_data={
                    name,    
                },
                unit_amount

            },
            quantity
        }]
*/