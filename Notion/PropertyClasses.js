// GoogleAppsScript/Notion
// https://github.com/Hajime-Saitou/GoogleAppsScript
//
// Copyright (c) 2024 Hajime Saito
// MIT License

class NotionText {
    constructor(content, url=null) {
        this.setTextContent(content, url);
    }

    setTextContent(content, url=null) {
        this.text = { "content": content }
        if (url !== null) {
            this.text.link = url;
        }
    }
}

class NotionTitle {
    constructor(content) {
        this.title = []
        this.pushTextContent(content);
    }

    pushTextContent(content) {
        this.title.push(new NotionText(content));
    }
}

class NotionRichText {
    constructor(content, url=null) {
        this.rich_text = []
        this.pushTextContent(content, url);
    }

    pushTextContent(content, url=null) {
        this.rich_text.push(new NotionText(content, url));
    }
}

class NotionNumber {
    constructor(number) {
        this.number = 0;
        this.setValue(number);
    }

    setValue(number) {
        this.number = number;
    }
}

class NotionDate {
    constructor(start, end=null, timezone=null) {
        this.date = {}
        this.setValue(start, end, timezone);
    }

    formatDate(date, timezone="JST") {
        return Utilities.formatDate(date, timezone, "yyyy-MM-dd");
    }

    setValue(start, end=null, timezone=null) {
        this.date.start = this.formatDate(start);
        if (end !== null) {
          this.date.end = this.formatDate(end);
        }
        if (timezone !== null) {
          this.timezone = timezone;
        }
    }
}

class NotionStatus {
    constructor(name) {
        this.status = {}
        this.setName(name);
    }

    setName(name) {
        this.status.name = name;
    }
}

class NotionCheckbox {
    constructor(checked) {
        this.checkbox = false;
        this.setValue(checked);
    }

    setValue(checked) {
        this.checkbox = checked;
    }
}

class NotionMultiSelect {
  constructor(items) {
      this.multi_select = []
      this.setValue(items);
  }

  setItems(items) {
      this.multi_select = items;
  }

  pushItem(item) {
      this.multi_select.push(item);
  }
}


