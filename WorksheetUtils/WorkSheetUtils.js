// GoogleAppsScript/WorksheetUtils
// https://github.com/Hajime-Saitou/GoogleAppsScript
//
// Copyright (c) 2025 Hajime Saito
// MIT License

/**
 * シート名を指定してシートオブジェクトを取得する
 * 
 * @param {string} - シート名
 */
function getSheet(sheetName) {
    return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
}

/**
 * 指定した行データを取得する
 * 
 * @param {string} - シート名
 * @param {number} - 行番号
 * @returns {list} - 行データ
 */
function getRow(sheetName, rowId) {
    sheet = getSheet(sheetName);
    return sheet.getRange(rowId, 1, 1, sheet.getLastColumn()).getValues()[0];
}

/**
 * シート内の情報を使ってオプション情報を作成する
 * 
 * @param {string} - シート名
 * @param {number} - 開始行番号（省略時は1）
 * @param {number} - 開始列番号（省略時は1）
 * @param {number} - 行数（省略時は最終行）
 * @returns {dict} - オプション情報
 * 
 * 以下のセル情報から右側のオプション情報を作成する
 * 
 * *----------+----------+      {
 * |debugMode |0         |        "debugMode": 0,
 * *----------+----------+  ->    "editMode": "default"
 * |editMode  |default   |      }
 * *----------+----------+
 * 
 */
function createOptions(sheetName, topRowId, leftColumnId, rowCount) {
    sheet = getSheet(sheetName);
    if (topRowId === undefined) topRowId = 1;
    if (leftColumnId === undefined) leftColumnId = 1;
    if (rowCount === undefined) rowCount = sheet.getLastRow() - (topRowId - 1);

    rows = sheet.getRange(topRowId, leftColumnId, rowCount, 2).getValues();

    let options = {}
    for (let row of rows) {
        options[row[0]] = row[1];
    }

    return options;
}

/**
 * 指定したシートに簡易ログを書き込む
 * 
 * @param {string} - シート名
 * @param {string} - 書き込むメッセージ
 */
function print(sheetName, message) {
    sheet = getSheet(sheetName);
    sheet.getRange(sheet.getLastRow() + 1, 1).setValue(message);
}
