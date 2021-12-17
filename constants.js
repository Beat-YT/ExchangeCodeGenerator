module.exports = Object.freeze({
    loginURL: "https://www.epicgames.com/id/login",
    authorizationCodeURL: "https://www.epicgames.com/id/api/redirect",
    oauthTokenURL : "https://account-public-service-prod.ol.epicgames.com/account/api/oauth/token",
    ANDROID_GRANT: {
        clientId: "3f69e56c7649492c8cc29f1af08a8a12",
        secret: "b51ee9cb12234f50a69efa67ef53812e",
        redirectUrl: "com.epicgames.fortnite://fnauth"
    },
    PC_GRANT: {
        clientId: "ec684b8c687f479fadea3cb2ad83f5c6",
        secret: "e1f31c211f28413186262d37a13fc84d",
        redirectUrl: "https://accounts.epicgames.com/fnauth"
    },
    'launcherAppClient2': {
        clientId: "34a02cf8f4414e29b15921876da36f9a",
        secret: "daafbccc737745039dffe53d94fc76cf",
        redirectUrl: "https://localhost/launcher/authorized"
    }
})