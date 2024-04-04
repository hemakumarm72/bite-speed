import { ContactDocument } from "../models/@types";

export const getContractExtract = async (getContracts: ContactDocument[]) => {
  const primaryContactId = getContracts.filter((e: ContactDocument) => {
    return e.linkPrecedence === "primary";
  });

  let sortedEmails = getContracts
    .map((e: ContactDocument) => e.email) // Extract emails from ContactDocument objects
    .filter((email: string | undefined | null) => email !== null || undefined) // Filter out undefined emails
    .sort((a?: string, b?: string) => {
      const isAPrimary = a?.includes("primary");
      const isBPrimary = b?.includes("primary");

      if (isAPrimary && !isBPrimary) {
        return -1; // a should come before b
      } else if (!isAPrimary && isBPrimary) {
        return 1; // b should come before a
      } else {
        return 0; // no change in order
      }
    });
  sortedEmails = Array.from(new Set(sortedEmails)); //TODO:  Create a Set to remove duplicates, then convert back to array

  let sortedPhone = getContracts
    .map((e: ContactDocument) => e.phoneNumber) // Extract emails from ContactDocument objects
    .filter(
      (phoneNumber: string | undefined | null) =>
        phoneNumber !== null || undefined
    ) // Filter out undefined emails

    .sort((a?: string, b?: string) => {
      const isAPrimary = a?.includes("primary");
      const isBPrimary = b?.includes("primary");

      if (isAPrimary && !isBPrimary) {
        return -1; // a should come before b
      } else if (!isAPrimary && isBPrimary) {
        return 1; // b should come before a
      } else {
        return 0; // no change in order
      }
    });

  sortedPhone = Array.from(new Set(sortedPhone));

  const secondaryContactIds = getContracts
    .filter((e: ContactDocument) => e.linkPrecedence === "secondary")
    .map((e: ContactDocument) => e.id);

  const contact = {
    primaryContactId: primaryContactId.length > 0 ? primaryContactId[0].id : "",
    emails: sortedEmails, // ['userId', 'userId'], // first element being email of primary contact
    phoneNumbers: sortedPhone, // first element being phoneNumber of primary contact
    secondaryContactIds: secondaryContactIds, // Array of all Contact IDs that are "secondary" to the primary contact
  };

  return contact;
};
