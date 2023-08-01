import prisma from "@/app/libs/prismadb";

export default async function getContacts() {
  try {
    // Retrieve Contacts data from database
    const contacts = await prisma.contact.findMany({
      orderBy: {
        uuid: 'asc' // 'asc' for ascending order, 'desc' for descending order
      },
    });

    return contacts;
  } catch (error: any) {
    throw new Error(error);
  }
}
