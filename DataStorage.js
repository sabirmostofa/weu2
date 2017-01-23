"use strict";
var fs = require("fs");

class DataStorage {
    constructor(filePath) {
        console.info("Path to todo items: " + filePath);
        this.filePath = filePath;

        fs.stat(this.filePath, (err, stat) => {
                if (err) {
                    console.log("Create empty file for todo items under " + this.filePath);
                    fs.writeFileSync(this.filePath, JSON.stringify([]));
                }

                fs.readFile(this.filePath, "utf8", (err, data) => {
                    this.cache = JSON.parse(data);
                });
            }
        );
    }

    getNextId() {
        var lastItem = this.cache[this.cache.length - 1];
        if (lastItem) {
            return lastItem.id + 1;
        }
        return 1;
    }

    getItems(isFinished) {
        var result = this.cache;
        if (isFinished != null) {
            result = result.filter(i => i.isFinished == isFinished);
        }
        return result;
    }

    getItemById(id) {
        return this.cache.find(i => i.id === id);
    }

    addItem(title, description) {
        var newItem = {
            id: this.getNextId(),
            title: title,
            isFinished: false
        };
        if (description) {
            newItem.description = description;
        }
        this.cache.push(newItem);
        console.log("Stored new item:");
        console.log(newItem);
        this.updateFile();
        return newItem;
    }

    updateItem(item, isFinished, description) {
        if (isFinished != null) {
            item.isFinished = isFinished;
        }
        if (description != null) {
            item.description = description;
        }

        console.log("Updated item:");
        console.log(item);
        this.updateFile();
    }

    deleteItem(id) {
        var existingItem = this.getItemById(id);
        if (!existingItem) {
            return false;
        }
        this.cache.splice(this.cache.indexOf(existingItem), 1);
        console.log("Item deleted:");
        console.log(existingItem);
        this.updateFile();
        return true;
    }

    getIsItemExisting(title) {
        return this.cache.some(i => i.title === title);
    }

    updateFile() {
        var json = JSON.stringify(this.cache);
        fs.writeFileSync(this.filePath, json);
    }
}

module.exports = DataStorage;