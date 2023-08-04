import { NextResponse } from 'next/server';
import validator from 'validator';
import { createUser, getUser } from '../services/user.service';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, name, password } = body;

  if (!email || !name || !password) {
    throw new Error('All required fields must be filled.');
  }

  if (!validator.isEmail(email)) {
    throw new Error('Email is not valid.');
  }

  const user = await getUser(null, email);
  if (user) {
    throw new Error('Email already in use.');
  }

  const createdUser = await createUser(email, name, password);

  return NextResponse.json(createdUser);
}
