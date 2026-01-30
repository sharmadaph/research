import { NextRequest, NextResponse } from 'next/server';

// Mock database - replace with actual Prisma client or database calls
const products: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Product A',
    price: 1234,
    image: 'https://example.com/image-a.jpg',
    description: 'High quality product A',
    quantity: 100
  },
  '2': {
    id: '2',
    name: 'Product B',
    price: 5678,
    image: 'https://example.com/image-b.jpg',
    description: 'Premium product B',
    quantity: 50
  }
};

// GET - Retrieve a single product by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Find product by ID
    const product = products[id];
    
    if (!product) {
      return NextResponse.json(
        { success: true, data: null },
        { status: 200 }
      );
    }
    
    return NextResponse.json(
      {
        success: true,
        data: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          quantity: product.quantity
        }
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

// PUT - Update a product by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Validate that product exists
    if (!products[id]) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Extract fields from request body
    const { name, price, image, description, quantity } = body;
    
    // Validate required fields
    if (!name || price === undefined || !image || !description || quantity === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Update product
    products[id] = {
      ...products[id],
      name,
      price,
      image,
      description,
      quantity
    };
    
    return NextResponse.json(
      {
        success: true,
        data: {
          id: products[id].id
        }
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a product by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Validate that product exists
    if (!products[id]) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Store ID before deleting
    const deletedId = products[id].id;
    
    // Delete product
    delete products[id];
    
    return NextResponse.json(
      {
        success: true,
        data: {
          id: deletedId
        }
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
