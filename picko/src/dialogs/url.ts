import * as vscode from 'vscode';
import { projectManagementTool } from '../services';

const validateInput = async (url: string) => {
    if (!url) {
        return 'URL cannot be empty';
    }

    return null;
};

export const getUrl = async (): Promise<string | undefined> => {
    const message = await vscode.window.showInputBox({
        title: projectManagementTool.url.title,
        placeHolder: projectManagementTool.url.placeholder,
        validateInput,
    });

    return message;
};
