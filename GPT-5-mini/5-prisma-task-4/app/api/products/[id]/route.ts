import { NextResponse } from 'next/server'

type Product = {
  id: string
  name: string
  price: number
  image: string
  description: string
  quantity: number
}

// In-memory product store for development/testing. Replace with DB integration as needed.
const products = new Map<string, Product>([
  [
    '1',
    {
      id: '1',
      name: 'SKU-1',
      price: 1234,
      image: 'https://example.com/image1.jpg',
      description: 'Sample product',
      quantity: 100,
    },
  ],
])

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const id = params.id
  const product = products.get(id) ?? null
  return NextResponse.json({ success: true, data: product })
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const id = params.id
  let body: any
  try {
    body = await req.json()
  } catch (err) {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, price, image, description, quantity } = body || {}
  if (
    typeof name !== 'string' ||
    typeof price !== 'number' ||
    typeof image !== 'string' ||
    typeof description !== 'string' ||
    typeof quantity !== 'number'
  ) {
    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 })
  }

  if (!products.has(id)) {
    return NextResponse.json({ success: true, data: null })
  }

  const updated: Product = { id, name, price, image, description, quantity }
  products.set(id, updated)
  return NextResponse.json({ success: true, data: { id } })
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const id = params.id
  if (!products.has(id)) {
    return NextResponse.json({ success: true, data: null })
  }
  products.delete(id)
  return NextResponse.json({ success: true, data: { id } })
}
