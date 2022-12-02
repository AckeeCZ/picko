import { window, commands } from 'vscode';
import type { ExtensionContext } from 'vscode';

import { Ticket, TicketPriority, compareTickets } from './ticketingSystem';
import * as config from './config';

export function activate(context: ExtensionContext) {
    let disposable = commands.registerCommand('picko.helloWorld', async () => {
        // TODO - get tickets from ticketing system
        const tickets = [
            new Ticket({
                id: 10001,
                title: 'First ticket',
                updatedOn: new Date(2022, 10, 16),
                priority: TicketPriority.HIGH,
            }),
            new Ticket({
                id: 10002,
                title: 'Second ticket',
                updatedOn: new Date(2022, 10, 13),
            }),
            new Ticket({
                id: 10003,
                title: 'Third ticket',
                updatedOn: new Date(2022, 10, 18),
            }),
            new Ticket({
                id: 10004,
                title: 'Fourth ticket',
                updatedOn: new Date(2022, 10, 12),
            }),
        ];

        const ticket = await window.showQuickPick(tickets.sort(compareTickets));

        if (ticket) {
            // TODO - replace with branch creation
            window.showInformationMessage(
                `Selected ticket ID ${ticket.id} sorted by ${config.getTicketsOrderProperty()}`,
            );
        }
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
