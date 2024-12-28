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
  var param = {
      method: method,
      contentType: "application/json",
      headers: { "Authorization": `Bearer ${IntegrationSecret}`, "Notion-Version": ApiVersion },
  }
  if (payload) {
    param["payload"] = stringifyPayload(payload);
  }

  const response = UrlFetchApp.fetch(`${ApiEndpointBase}/${methodName}`, param);
  return response;
}

/**
 * 指定したNotionデータベースにページを挿入する
 * @param {string} databaseId NoitonデータベースID
 * @param {Object} properties Notionデータベースプロパティ
 * @returns Notion APIのresponse
 */
function insert(databaseId, properties) {
  const payload = {
      "parent": {
         "database_id": databaseId,
      },
      "properties": properties,
  }
  return callApi("pages/", "POST", payload);
}

/**
 * 指定したページのプロパティを更新する
 * @param {string} pageId Notionデータベースに登録されたページのID
 * @param {Object} properties Notionデータベースプロパティ（更新差分）
 * @returns Notion APIのresponse
 */
function update(pageId, properties) {
  const payload = {
      "properties": properties,
  }
  return callApi(`pages/${pageId}`, "PATCH", payload);
}

/**
 * 指定したページをアーカイブする
 * @param {string} pageId NotionページID
 * @returns Notion APIのresponse
 */
function archived(pageId) {
  const payload = {
      "archived": true,
  }
  return callApi(`pages/${pageId}`, "PATCH", payload);
}

/**
 * 指定したデータベースのページ情報を取得する
 * @param {string} databaseId NotionデータベースID
 * @param {JSON} payload
 * @returns Notion APIのresponse
 */
function select(databaseId, payload=null) {
  return callApi(`databases/${databaseId}/query`, "POST", payload);
}

/**
 * 指定したデータベースのページ情報を全件取得する
 * @param {string} databaseId NotionデータベースID
 * @param {JSON} payload
 * @returns Notion APIのresponse[]
 */
function selectAllPages(databaseId, payload=null) {
  results = []

  while(true) {
    response = JSON.parse(select(databaseId, payload=null));
    results.append(response);

    if (!response["has_more"]) {
      break;
    }
    payload["start_cursor"] = response["next_cursor"];
  }

  return results;
}
