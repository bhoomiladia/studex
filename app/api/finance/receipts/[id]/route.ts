import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongo";
import FeesHistory from "@/models/FeesHistory";

// Returns a very small PDF receipt for a fee payment
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const fee = await FeesHistory.findById(params.id).lean();
    if (!fee) {
      return NextResponse.json({ error: "Receipt not found" }, { status: 404 });
    }
    if (fee.status !== 'Paid') {
      return NextResponse.json({ error: "Receipt available only for paid fees" }, { status: 400 });
    }

    // Minimal PDF content (valid but simple)
    const pdf = `%PDF-1.4\n1 0 obj<<>>endobj\n2 0 obj<</Length 75>>stream\nBT /F1 24 Tf 50 750 Td (Payment Receipt) Tj 50 710 Td (Fee ID: ${params.id}) Tj 50 670 Td (Amount: Rs ${fee.amount}) Tj ET\nendstream endobj\n3 0 obj<</Type /Page /Parent 4 0 R /Contents 2 0 R>>endobj\n4 0 obj<</Type /Pages /Kids [3 0 R] /Count 1>>endobj\n5 0 obj<</Type /Catalog /Pages 4 0 R>>endobj\nxref\n0 6\n0000000000 65535 f \n0000000010 00000 n \n0000000041 00000 n \n0000000186 00000 n \n0000000246 00000 n \n0000000304 00000 n \ntrailer<</Size 6/Root 5 0 R>>\nstartxref\n360\n%%EOF`;

    return new NextResponse(Buffer.from(pdf, 'utf-8'), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=receipt-${params.id}.pdf`,
      },
    });
  } catch (error) {
    console.error('Receipt API error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
