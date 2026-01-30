import { NextResponse } from 'next/server';

// Mock database for demonstration purposes
const products: Record<string, any> = {
  '1': { id: '1', name: 'Product 1', price: 100, image: 'image1.jpg', description: 'Description 1', quantity: 10 },
  '2': { id: '2', name: 'Product 2', price: 200, image: 'image2.jpg', description: 'Description 2', quantity: 20 },
};

// GET /api/products/:product_id
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const product = products[id];

  if (!product) {
    return NextResponse.json({ success: true, data: null });
  }

  return NextResponse.json({ success: true, data: product });
}

// PUT /api/products/:product_id
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();

  if (!products[id]) {
    return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
  }

  products[id] = { ...products[id], ...body };

  return NextResponse.json({ success: true, data: { id } });
}

// DELETE /api/products/:product_id
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!products[id]) {
    return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
  }

  delete products[id];

  return NextResponse.json({ success: true, data: { id } });
}