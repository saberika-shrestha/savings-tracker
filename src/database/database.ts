import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { Saving } from '../types/savings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, 'savings.db');
const db = new Database(dbPath, { verbose: console.log });

db.exec(`
        CREATE TABLE IF NOT EXISTS savings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        description TEXT NOT NULL,
        timestamp TEXT DEFAULT (DATE('now'))
    );
`);

export const insertIntoDatabase = db.prepare(`
  INSERT INTO savings (amount, description)
  VALUES (@amount, @description)
`);

const insertIntoDatabaseTest = db.prepare(`
    INSERT INTO savings (amount, description,timestamp)
    VALUES (@amount,@description,@timestamp)
    `);

insertIntoDatabaseTest.run({
	amount: 100,
	description: 'Test',
	timestamp: '2023-11-01',
});

export const getAllSavings = db.prepare(`
  SELECT * FROM savings
`);

export const getSavingsByMonth = db.prepare(`
    SELECT * FROM savings
    WHERE strftime('%m', timestamp) = @month
`);

export const deleteSavingsByMonth = db.prepare(`
    DELETE FROM savings
    WHERE strftime('%m', timestamp) = @month
`);
