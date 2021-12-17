export interface OauthObject {
    access_token: string;
    expires_in: number;
    expires_at: Date;
    token_type: string;
    refresh_token: string;
    refresh_expires: number;
    refresh_expires_at: Date;
    account_id: string;
    client_id: string;
    internal_client: boolean;
    client_service: string;
    scope: any[];
    displayName: string;
    app: string;
    in_app_id: string;
    device_id: string;
}

export interface AuthClientObject {
    clientId: string;
    secret: string;
    redirectUrl: string;
}

declare function login(client: AuthClientObject): Promise<OauthObject>

export = login;
