import { QuickPickItem } from "vscode";

export enum TicketPriority {
  low,
  medium,
  high,
}

export interface TicketInfo<TId> {
  id: TId;
  title: string;
  priority?: TicketPriority;
  updatedOn: Date;
}

export class Ticket<TId extends number | string> implements QuickPickItem {
  private info: Required<TicketInfo<TId>>;

  public label: string;

  constructor(info: TicketInfo<TId>) {
    this.info = {
      priority: TicketPriority.medium,
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
