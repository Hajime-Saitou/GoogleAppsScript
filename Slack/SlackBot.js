// GoogleAppsScript/Slack
// https://github.com/Hajime-Saitou/GoogleAppsScript
//
// Copyright (c) 2024 Hajime Saito
// MIT License

const ApiEndpointBase = "https://www.slack.com/api";
const SlackBotToken = PropertiesService.getScriptProperties().getProperty("SlackBotToken");

function stringifyPayload(payload) {
    const params = {}

    Object.assign(params, payload);
    for (const [key, value] of Object.entries(params)) {
        if (typeof value === "object") {
              params[key] = JSON.stringify(value);
        }
    }

    return params;
}

function callApi(methodName, method, payload) {
  const param = {
      method: method,
      contentType: "application/x-www-form-urlencoded",
      headers: { "Authorization": `Bearer ${SlackBotToken}` },
      payload: stringifyPayload(payload),
  }
  const response = UrlFetchApp.fetch(`${ApiEndpointBase}/${methodName}`, param);
  return response;
}

function postMessage(message) {
  return callApi("chat.postMessage", "POST", message);
}
