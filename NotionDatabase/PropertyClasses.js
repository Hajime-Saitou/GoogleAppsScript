// GoogleAppsScript/Notion
// https://github.com/Hajime-Saitou/GoogleAppsScript
//
// Copyright (c) 2024 Hajime Saito
// MIT License

var PropertyType = {
    Title: 0,
    Text: 1,
    Number: 2,
    Date: 3,
    Status: 4,
    Select: 5,
    MultiSelect: 6,
    People: 7,
    Relation: 8,
    Checkbox: 9,
    Url: 10,
    EmbedUrl: 11,
}

function createDatabasePropery(type, value) {
    switch (type) {
        case PropertyType.Title:
            return new NotionTitle(value);
        case PropertyType.RichText:
            return new NotionRichText(value);
        case PropertyType.Number:
            return new NotionNumber(value);
        case PropertyType.Date:
            return new NotionDate(value);
        case PropertyType.Status:
            return new NotionStatus(value);
        case PropertyType.Select:
            return new NotionSelect(value);
        case PropertyType.MultiSelect:
            return new NotionMultiSelect(value);
        case PropertyType.People:
            return new NotionPeople(value);
        case PropertyType.Relation:
            return new NotionRelation(value);
        case PropertyType.Checkbox:
            return new NotionCheckbox(value);
        case PropertyType.Url:
            return new NotionUrl(value);
        case PropertyType.EmbedUrl:
            return new NotionEmbedUrl(value);
        }
}

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
    constructor(number = 0) {
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

class NotionSelectItem {
  constructor(name) {
      this.setName(name);
  }

  setName(name) {
    this.name = name;
  }
}

class NotionSelect {
    constructor(itemName) {
        this.select = {}
        this.setName(itemName);
    }

    setName(itemName) {
        this.select = new NotionSelectItem(itemName);
    }
}

class NotionMultiSelect {
  constructor(itemNames) {
      this.multi_select = []
      this.setSelectItems(itemNames);
  }

  setSelectItems(itemNames) {
      for (const itemName of itemNames) {
          this.appendItem(itemName);
      }
  }

  appendItem(itemName) {
      this.multi_select.push(new NotionSelectItem(itemName));
  }
}

class NotionId {
    constructor(id) {
        this.setId(id);
    }

    setId(id) {
        this.id = id;
    }
}

class NotionPeople {
    constructor(idList) {
        this.people = []
        this.setPeople(idList);
    }

    setPeople(idList) {
        for (const id of idList) {
            this.appendPeople(id);
        }
    }

    appendPeople(id) {
        this.people.push(new NotionId(id));
    }
}

class NotionRelation {
    constructor(id) {
        this.relation = []
    }

    setRelation(idList) {
        for (const id of idList) {
          this.appendRelation(id);
        }
    }

    appendRelation(id) {
        this.relation.push(new NotionId(id));
    }
}

class NoitonUrl {
    constructor(url) {
        this.url = null;
        this.setUrl(url)
    }

    setUrl(url) {
        this.url = url;
    }

    getUrl() {
        return this.url;
    }
}

class NoitonEmbedUrl {
    constructor(url) {
        this.embed = {};
        this.setUrl(url)
    }

    setUrl(url) {
        this.embed["url"] = url;
    }

    getUrl() {
        return this.embed["url"];
    }
}