import ReceiptClient from './ReceiptClient';

export function generateStaticParams() {
    return [{ receiptId: 'MOCK-RECEIPT' }];
}

export default async function ReceiptPage({ params }: { params: Promise<{ receiptId: string }> }) {
    const { receiptId } = await params;
    return <ReceiptClient receiptId={receiptId} />;
}
