import fs from "fs";
import path from "path";
import Match from "../models/Match.js";
import Player from "../models/Player.js";
import Tournament from "../models/Tournament.js";

const STORAGE_TYPE = process.env.STORAGE_TYPE || "JSON";
const DATA_DIR = path.resolve("src/data");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

const getFilePath = (name) => path.join(DATA_DIR, `${name}.json`);

// Helper: Load JSON
const loadJSON = (name) => {
  const filePath = getFilePath(name);
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

// Helper: Save JSON
const saveJSON = (name, data) => {
  fs.writeFileSync(getFilePath(name), JSON.stringify(data, null, 2));
};

// Generic CRUD
export const Storage = {
  async getAll(modelName) {
    if (STORAGE_TYPE === "DB") {
      switch (modelName) {
        case "Match": return Match.find();
        case "Player": return Player.find();
        case "Tournament": return Tournament.find();
      }
    } else {
      return loadJSON(modelName);
    }
  },

  async create(modelName, data) {
    if (STORAGE_TYPE === "DB") {
      switch (modelName) {
        case "Match": return Match.create(data);
        case "Player": return Player.create(data);
        case "Tournament": return Tournament.create(data);
      }
    } else {
      const records = loadJSON(modelName);
      const newRecord = { _id: Date.now().toString(), ...data };
      records.push(newRecord);
      saveJSON(modelName, records);
      return newRecord;
    }
  },

  async update(modelName, id, data) {
    if (STORAGE_TYPE === "DB") {
      switch (modelName) {
        case "Match": return Match.findByIdAndUpdate(id, data, { new: true });
        case "Player": return Player.findByIdAndUpdate(id, data, { new: true });
        case "Tournament": return Tournament.findByIdAndUpdate(id, data, { new: true });
      }
    } else {
      const records = loadJSON(modelName);
      const index = records.findIndex((r) => r._id === id);
      if (index >= 0) {
        records[index] = { ...records[index], ...data };
        saveJSON(modelName, records);
        return records[index];
      }
      return null;
    }
  }
};
