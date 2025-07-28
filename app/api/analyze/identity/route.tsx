/* eslint-disable @typescript-eslint/no-explicit-any */
//eslint-disable @typescript-eslint/no-explicit-any
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

export const runtime = 'nodejs';

import csv from 'csv-parser';
import { Readable } from 'stream';

export async function POST(req: Request) {
  try {
    console.log('🔵 Receiving POST request...');

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('📁 Got file:', file.name);

    // Convert Web ReadableStream to Node.js Readable
    const stream = Readable.fromWeb(file.stream());

    const rows: any[] = [];

    await new Promise<void>((resolve, reject) => {
      stream
        .pipe(csv())
        .on('data', (row) => rows.push(row))
        .on('end', () => {
          console.log('✅ CSV parsed:', rows.length);
          resolve();
        })
        .on('error', (err) => {
          console.error('❌ CSV parsing error:', err);
          reject(err);
        });
    });

    const total = rows.length;
    const success = rows.filter(r => r.Status === 'Success').length;
    const mfaSatisfied = rows.filter(r => r['MFA Result']?.includes('satisfied')).length;

    const result = {
      total,
      successRate: (success / total) * 100,
      mfaRate: (mfaSatisfied / total) * 100,
      score: Math.round(((success / total) + (mfaSatisfied / total)) * 50),
    };
    

    console.log('✅ Final result:', result);

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('❌ Server Crash:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
