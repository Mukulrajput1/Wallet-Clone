import path from 'path';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

export async function GET(req, res) {

    const filePath = path.join(process.cwd(), 'public', 'abc', 'build', 'index.html');
    const fileContent = await fs.readFile(filePath, 'utf8');
    // const fileContent = '<html><body><h1>Hello World</h1></body></html>';
    return new Response(fileContent, {
      headers: { 'Content-Type': 'text/html' }
    });
  
  //  catch (err) {
  //   console.error(`Error sending file: ${err}`);
  //   return NextResponse.json(
  //     {
  //       error: "data not added successfully",
  //     },
  //     { status: 500 }
  //   );
  // }
}
