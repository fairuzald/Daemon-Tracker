import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const body = await req.json();
  const { contactId, daemonStatus } = body;

  // Update user data
  const updatedUser =
    // Update the contact_status in the database
    await prisma.contact.update({
      where: { id: contactId },
      data: {
        Daemon_Status: daemonStatus,
      },
    });

  return NextResponse.json({ updatedUser });
}
