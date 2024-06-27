// GoogleAppsScript/Slack
// https://github.com/Hajime-Saitou/GoogleAppsScript
//
// Copyright (c) 2024 Hajime Saito
// MIT License

function createAppsBot() {
    return new SlackAppsBot();
}

function createWebhookBot() {
    return new SlackWebhookBot();
}

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
