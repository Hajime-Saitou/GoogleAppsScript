// GoogleAppsScript/Slack
// https://github.com/Hajime-Saitou/GoogleAppsScript
//
// Copyright (c) 2024 Hajime Saito
// MIT License

const SlackApiEndpointBase = "https://www.slack.com/api";

class SlackRestApiCaller {
    constructor() {
      this.apiEndpointBase = SlackApiEndpointBase;
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

    callApi(methodName, method, payload=null, queryParam=null) {
        var fetchUrl = `${this.apiEndpointBase}/${methodName}`;
        return this.callApiDirect(fetchUrl, method, payload, queryParam);
    }

    callApiDirect(fetchUrl, method, payload=null, queryParam=null) {
        const param = {
            method: method,
            contentType: "application/x-www-form-urlencoded",
            headers: { "Authorization": `Bearer ${this.bearerToken}` },
        }

        if (method.toUpperCase() == "GET") {
            if (queryParam) {
                fetchUrl += `?${queryParam}`;
            }
        }
        else {
            if (payload) {
                param["payload"] = this.stringifyPayload(payload);
            }
        }

        return UrlFetchApp.fetch(fetchUrl, param);
    }
}