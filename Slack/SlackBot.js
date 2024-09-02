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
class SlackAppsBot {
    constructor() {
      this.apiEndpointBase = "https://www.slack.com/api";
      this.bearerToken = PropertiesService.getScriptProperties().getProperty("bearerToken");
    }

    stringifyPayload(payload) {
        const params = {}

        Object.assign(params, payload);
        for (const [key, value] of Object.entries(params)) {
            if (typeof value === "object") {
                params[key] = JSON.stringify(value);
            }
        }

        return params;
    }

    callApi(methodName, method, payload) {
        const param = {
            method: method,
            contentType: "application/x-www-form-urlencoded",
            headers: { "Authorization": `Bearer ${this.bearerToken}` },
            payload: this.stringifyPayload(payload),
        }
        const response = UrlFetchApp.fetch(`${this.apiEndpointBase}/${methodName}`, param);
        return response;
    }
  
    postMessage(message) {
        return this.callApi("chat.postMessage", "POST", message);
    }
}

/**
 * Incoming Webhookを利用したbot
 */
class SlackWebhookBot {
    constructor(webhookUrl) {
        this.webhookUrl = webhookUrl;
    }

    stringifyPayload(payload) {
        return JSON.stringify(payload);
    }

    callApi(webhookUrl, method, payload) {
        const param = {
            method: method,
            contentType: "application/json",
            payload: this.stringifyPayload(payload),
        }
        const response = UrlFetchApp(webhookUrl, param);
        return response;
    }

    postMessage(message) {
        return this.callApi(this.webhookUrl, "POST", message);
    }
}
