import * as vscode from 'vscode';
import fetch from 'node-fetch';

import { ProjectManagementTool } from '../types';

import * as config from '../../config';
import { getUrl } from '../../dialogs/url';
import { getApiKey } from '../../dialogs/apiKey';

interface RedmineUserInfo {
    user: {
        id: number;
        firstname: string;
        lastname: string;
        mail: string;
    };
}

export class Redmine implements ProjectManagementTool {
    url = {
        title: 'Redmine URL',
        placeholder: 'https://redmine.company.com',
    };
    apiKey = {
        placeholder: 'Redmine API key',
    };

    public async checkIsConfigured() {
        try {
            await this.checkValidApiKey();
        } catch (error) {
            vscode.window.showWarningMessage((error as Error).message);
        }
    }

    public async configure() {
        await this.configureUrl();
        await this.configureApiKey();

        try {
            const user = await this.checkValidApiKey();

            vscode.window.showInformationMessage(`Redmine API connected for ${user.firstName} ${user.lastName}`);
        } catch (error) {
            vscode.window.showWarningMessage((error as Error).message);
        }
    }

    public async configureUrl() {
        if (!config.getRedmineUrl()) {
            const url = await getUrl();
            if (!url) {
                return;
            }

            await config.setRedmineUrl(url);
        }
    }

    public async configureApiKey() {
        if (!config.getRedmineApiKey()) {
            const apiKey = await getApiKey();
            if (!apiKey) {
                return;
            }

            await config.setRedmineApiKey(apiKey);
        }
    }

    public async checkValidApiKey({ url = config.getRedmineUrl(), apiKey = config.getRedmineApiKey() } = {}) {
        if (!url && !apiKey) {
            throw new Error('Please configure the extension with `Picko: Configure extension`.');
        }

        if (!url) {
            throw new Error('Please provide a Redmine URL.');
        }

        if (!apiKey) {
            throw new Error('Please provide an Redmine API key.');
        }

        const response = await fetch(`${url}/my/account.json`, {
            headers: {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'Content-Type': 'application/json',
                // eslint-disable-next-line @typescript-eslint/naming-convention
                'X-Redmine-API-Key': apiKey,
            },
        });

        if (!response.ok) {
            throw new Error('Please provide a valid Redmine API key.');
        }

        const { user } = (await response.json()) as RedmineUserInfo;

        return {
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.mail,
        };
    }
}
