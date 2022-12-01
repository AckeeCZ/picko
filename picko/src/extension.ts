import { window, commands } from 'vscode';
import type { ExtensionContext } from 'vscode';
import { Ticket } from './ticketingSystem';

export function activate(context: ExtensionContext) {
    let disposable = commands.registerCommand('picko.helloWorld', async () => {
        // TODO - get tickets from ticketing system
        const tickets = [
            new Ticket({
                id: 10001,
                title: 'First ticket',
                updatedOn: new Date(2022, 10, 16),
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
        ];

        const ticket = await window.showQuickPick(tickets);

        if (ticket) {
            window.showInformationMessage(`Selected ticket ID ${ticket.id}`);
        }
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
