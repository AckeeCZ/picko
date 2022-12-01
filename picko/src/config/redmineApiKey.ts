import { workspace, ConfigurationTarget } from 'vscode';

const section = 'picko.redmineApiKey';

export const getRedmineApiKey = (): string | undefined => workspace.getConfiguration().get(section);

export const setRedmineApiKey = (apiKey: string) =>
    workspace.getConfiguration().update(section, apiKey, ConfigurationTarget.Global);
