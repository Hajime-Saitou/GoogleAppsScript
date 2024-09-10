// GoogleAppsScript/Slack
// https://github.com/Hajime-Saitou/GoogleAppsScript
//
// Copyright (c) 2024 Hajime Saito
// MIT License

/**
 * Slack Appsを利用したファイルアクセサ
 */
class SlackFileAccessor extends SlackRestApiCaller {
    constructor() {
    }

    getFileList(queryParam=null) {
        return this.callApi("files.list", "GET", queryParam=queryParam);
    }
  
    getBlob(fileObject) {
        return this.callApiDirect(fileObject.url_private, "GET").getBlob;
    }
}
