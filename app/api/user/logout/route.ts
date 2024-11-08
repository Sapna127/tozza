import { NextResponse } from "next/server";

export async function POST() {
  try {
    // If you're using cookies or sessions, clear them here.
    // Example for cookie-based session management:
    
    const response = NextResponse.json({ message: 'Logout successful' });
    
    response.cookies.set('auth-token', '', { maxAge: -1 }); // Clear the auth-token

    return response;
  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
