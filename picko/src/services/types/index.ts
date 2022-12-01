interface UserInfo {
    firstName: string;
    lastName: string;
    email: string;
}

export interface ProjectManagementTool {
    url: {
        title: string;
        placeholder: string;
    };
    apiKey: {
        placeholder: string;
    };
    checkIsConfigured: () => Promise<void>;
    configure: () => Promise<void>;
    checkValidApiKey: (options?: { url?: string; apiKey?: string }) => Promise<UserInfo>;
    configureUrl: () => Promise<void>;
    configureApiKey: () => Promise<void>;
}
