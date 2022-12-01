import { workspace, ConfigurationTarget } from 'vscode';

const section = 'picko.redmineUrl';

export const getRedmineUrl = (): string | undefined => workspace.getConfiguration().get(section);

export const setRedmineUrl = (url: string) =>
    workspace.getConfiguration().update(section, url, ConfigurationTarget.Global);

