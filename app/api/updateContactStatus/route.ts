import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
    const body = await req.json();
    const { contactId, contactStatus } = body;
  
    // Update user data
    const updatedData =  
        // Update the contact_status in the database
        await prisma.contact.update({
          where: { id: contactId },
          data: {
            Contact_Status: contactStatus,
          },
        });
    
    return NextResponse.json({ updatedData });
  }
  
