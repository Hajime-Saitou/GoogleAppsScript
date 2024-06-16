const ApiEndpointBase = "https://www.slack.com/api";
const SlackBotToken = PropertiesService.getScriptProperties().getProperty("SlackBotToken");

function debug_main() {
    const message = {
        "channel": "#test",
        "text": "test",
    }
    postMessage(message);
}

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

function callApi(methodName, payload) {
  const param = {
      method: "post",
      contentType: "application/x-www-form-urlencoded",
      headers: { "Authorization": `Bearer ${SlackBotToken}` },
      payload: stringifyPayload(payload),
  }
  const response = UrlFetchApp.fetch(`${ApiEndpointBase}/${methodName}`, param);
  return response;
}

function postMessage(message) {
  return callApi("chat.postMessage", message);
}
