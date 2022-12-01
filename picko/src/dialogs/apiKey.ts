import * as vscode from 'vscode';
import { projectManagementTool } from '../services';

const validateInput = async (apiKey: string) => {
    if (!apiKey) {
        return 'API key cannot be empty';
    }

    try {
        await projectManagementTool.checkValidApiKey({ apiKey });
    } catch (error) {
        return (error as Error).message;
    }

    return null;
};

export const getApiKey = async (): Promise<string | undefined> => {
    const message = await vscode.window.showInputBox({
        placeHolder: projectManagementTool.apiKey.placeholder,
        validateInput,
    });

    return message;
};
