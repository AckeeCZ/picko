import { QuickPickItem } from "vscode";

export enum TicketPriority {
  LOW,
  MEDIUM,
  HIGH,
}

export interface TicketInfo<TId> {
  id: TId;
  title: string;
  priority?: TicketPriority;
  updatedOn: Date;
}

export type TicketProperty = keyof TicketInfo<any>;

export class Ticket<TId extends number | string> implements QuickPickItem {
  private info: Required<TicketInfo<TId>>;

  public label: string;

  constructor(info: TicketInfo<TId>) {
    this.info = {
      priority: TicketPriority.MEDIUM,
      ...info,
    };

    this.label = this.toString();
  }

  public toString(): string {
    const { id, title } = this.info;

    return `${id}: ${title}`;
  }

  public get id() {
    return this.info.id;
  }

  public get title() {
    return this.info.title;
  }

  public get priority() {
    return this.info.priority;
  }

  public get updatedOn() {
    return this.info.updatedOn;
  }
}
