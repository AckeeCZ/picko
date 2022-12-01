import { workspace } from "vscode";

import type { TicketProperty } from "./ticketingSystem";

// enum TicketProperty {
//   ID = "id",
//   TITLE = "title",
//   PRIORITY = "priority",
//   UPDATED_DATE = "updated date",
// }

export const getTicketsOrderProperty = (): TicketProperty =>
  workspace.getConfiguration().get("picko.ticketsOrder") || "id";
