import { Ticket } from "./ticket";
import * as config from "../config";

export function compareTickets(
  ticket1: Ticket<any>,
  ticket2: Ticket<any>
): number {
  const ticketOrderProperty = config.getTicketsOrderProperty();

  const value1 = ticket1[ticketOrderProperty];
  const value2 = ticket2[ticketOrderProperty];

  if (typeof value1 === "string" && typeof value2 === "string") {
    return value1.localeCompare(value2);
  }

  if (typeof value1 === "number" && typeof value2 === "number") {
    return value1 - value2;
  }

  if (value1 instanceof Date && value2 instanceof Date) {
    return value1.getTime() - value2.getTime();
  }

  return 0;
}
