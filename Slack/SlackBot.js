// GoogleAppsScript/Slack
// https://github.com/Hajime-Saitou/GoogleAppsScript
//
// Copyright (c) 2024 Hajime Saito
// MIT License

/**
 * Slack Appsを利用したbotオブジェクトを生成する
 * @returns botオブジェクト
 */
function createAppsBot() {
    return new SlackAppsBot();
}

/**
 * Incoming Webhookを利用したbotを生成する
 * @param {string} webhookUrl Incoming Webhook URL
 * @returns 
 */
function createWebhookBot(webhookUrl) {
    return new SlackWebhookBot(webhookUrl);
}

/**
 * Slack Appsを利用したbot
 */
class SlackAppsBot extends SlackRestApiCaller{
    constructor() {
    }
  
    postMessage(payload) {
        return this.callApi("chat.postMessage", "POST", payload);
    }
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
