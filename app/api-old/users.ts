import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { User } from '@/app/types/user';

export async function POST(request: Request) {
  try {
    const newUser = await request.json();
    
    // Read the current users file
    const filePath = path.join(process.cwd(), 'app/data/users.ts');
    const fileContent = await fs.readFile(filePath, 'utf8');
    
    // Parse the current users array
    const usersMatch = fileContent.match(/export const users: User\[] = (\[[\s\S]*?\]);/);
    if (!usersMatch) {
      return NextResponse.json(
        { message: 'Users array not found in file' },
        { status: 500 }
      );
    }
    
    // Safely evaluate the matched array string
    const currentUsers: User[] = eval('(' + usersMatch[1] + ')');
    const updatedUsers = [...currentUsers, newUser];
    
    // Create the new file content
    const newFileContent = `import { User } from "../types/user";

export const users: User[] = ${JSON.stringify(updatedUsers, null, 2)};`;
    
    await fs.writeFile(filePath, newFileContent, 'utf8');
    
    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error('Error updating users:', error);
    return NextResponse.json(
      { message: 'Failed to update users file' },
      { status: 500 }
    );
  }
}