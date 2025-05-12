// GoogleAppsScript/Slack
// https://github.com/Hajime-Saitou/GoogleAppsScript
//
// Copyright (c) 2024 Hajime Saito
// MIT License

/**
 * Slack Appsを利用したbotオブジェクトを生成する
 * @param {string} bearerToken Slack Appsが発行したトークン
 * @returns {object} botオブジェクト
 */
function createAppsBot(bearerToken) {
    return new SlackAppsBot(bearerToken);
}

/**
 * Slack Appsを利用したbot
 */
class SlackAppsBot extends SlackRestApiCaller {
    constructor(bearerToken) {
        super(bearerToken);
    }
  
    postMessage(payload) {
        return this.callApi("chat.postMessage", "POST", payload);
    }
}

/**
 * Incoming Webhookを利用したbotを生成する
 * @param {string} webhookUrl Incoming Webhook URL
 * @returns {object} botオブジェクト
 */
function createWebhookBot(webhookUrl) {
    return new SlackWebhookBot(webhookUrl);
}

/**
 * Incoming Webhookを利用したbot
 */
class SlackWebhookBot {
    constructor(webhookUrl) {
        this.webhookUrl = webhookUrl;
    }

    postMessage(payload) {
        return this.callApiDirect(this.webhookUrl, "POST", payload);
    }
}
