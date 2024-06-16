const DatabaseId = PropertiesService.getScriptProperties().getProperty("DatabaseId");

function debug_main() {
  const properties = {}
  properties.name = new NotionTitle("test");
  properties.date = new NotionDate(new Date("2024/6/16"));

  insertInto(DatabaseId, properties);
}
