import { NextRequest, NextResponse } from 'next/server';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import axios from 'axios';
import mammoth from 'mammoth';

export async function GET(req: NextRequest) {
    try {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/users/1');

        // Define JSON data structure expected by the template
        const templateData = {
            employee: {
                name: data.name,
                position: 'Software Engineer', // Sample static data
                department: 'Product Development',
            },
        };

        // Create a new document
        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun(`Name: ${templateData.employee.name}`),
                                new TextRun(`Position: ${templateData.employee.position}`),
                                new TextRun(`Department: ${templateData.employee.department}`),
                            ],
                        }),
                    ],
                },
            ],
        });

        // Generate the document buffer
        const buffer = await Packer.toBuffer(doc);

        // Convert document buffer to HTML using mammoth
        const { value: htmlContent } = await mammoth.convertToHtml({ buffer });

        // Return HTML content as the API response
        return new NextResponse(htmlContent, {
            status: 200,
            headers: {
                'Content-Type': 'text/html',
            },
        });
    } catch (error) {
        console.error('Error generating document:', error);
        return new NextResponse('Error generating document', { status: 500 });
    }
}