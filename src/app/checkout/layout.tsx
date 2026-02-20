export default function CheckoutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Checkout has its own header/footer baked into the page,
    // so we skip the global Header and Footer here.
    return <>{children}</>;
}
