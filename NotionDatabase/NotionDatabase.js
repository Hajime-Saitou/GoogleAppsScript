// GoogleAppsScript/NotionDatabase
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

function callApi(methodName, method, payload) {
  const param = {
      method: method,
      contentType: "application/json",
      headers: { "Authorization": `Bearer ${IntegrationSecret}`, "Notion-Version": ApiVersion },
      payload: stringifyPayload(payload),
  }
  const response = UrlFetchApp.fetch(`${ApiEndpointBase}/${methodName}`, param);
  return response;
}

function insert(databaseId, properties) {
  const payload = {
      "parent": {
         "database_id": databaseId,
      },
      "properties": properties,
  }
  return callApi("pages/", "POST", payload);
}

function update(pageId, properties) {
  const payload = {
      "properties": properties,
  }
  return callApi(`pages/${pageId}`, "PATCH", payload);
}
