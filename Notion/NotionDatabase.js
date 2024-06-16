// GoogleAppsScript/Notion
// https://github.com/Hajime-Saitou/GoogleAppsScript
//
// Copyright (c) 2024 Hajime Saito
// MIT License

const ApiEndpointBase = "https://api.notion.com/v1";
const ApiVersion = "2022-06-28";
const IntegrationSecret = PropertiesService.getScriptProperties().getProperty("IntegrationSecret");

function stringifyPayload(payload) {
    console.log(JSON.stringify(payload));

    return JSON.stringify(payload);
}

function callApi(methodName, payload) {
  const param = {
      method: "post",
      contentType: "application/json",
      headers: { "Authorization": `Bearer ${IntegrationSecret}`, "Notion-Version": ApiVersion },
      payload: stringifyPayload(payload),
  }
  const response = UrlFetchApp.fetch(`${ApiEndpointBase}/${methodName}`, param);
  return response;
}

function insertInto(databaseId, properties) {
  const payload = {
      "parent": {
         "database_id": databaseId,
      },
      "properties": properties,
  }
  return callApi("pages/", payload);
}
