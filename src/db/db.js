import Dexie from 'dexie';
import {nanoid} from 'nanoid';
import _ from 'lodash'

export const db = new Dexie('tour_db');
export async function exportDatabase() {
  const out = {}
  for (const table of db.tables) {
    out[table.name] = await table.toArray()
  }
  return out
}

export async function importDatabase(data) {
  for (const [tableName, rows] of Object.entries(data)) {
    if (db[tableName]) {
      await db[tableName].clear()
      await db[tableName].bulkAdd(rows)
    }
  }
}

export class Database {
  constructor(dbname) {
    this.dbname = dbname
  }
  createSub(data){
    return {
      _id: nanoid(),
      ...data
    }
  }
  async getAll(){
    return db[this.dbname].toArray()
  }
  async getAllFilled(fields = []) {
    const records = await db[this.dbname].toArray()
    return await _extractNested(records, fields)
  }
  async getOne(_id){
    return db[this.dbname].get(_id)
  }
  async getOneFilled(_id, fields  = []){
    const r = await db[this.dbname].get(_id)
    const e = await _extractNested([r], fields)
    return e[0]
  }
  async getSet(idList){
    return db[this.dbname].bulkGet(idList)
  }
  async getGroup(field){
    const data = await db[this.dbname].toArray()
    return data.reduce((arr, item) => {
      return _.union(arr, (item[field] || []))
    }, [])
  }
  async add(data){
    const NUID = nanoid()
		await db[this.dbname].add({
			_id: data?._id || NUID,
			...data
		})
    return data?._id || NUID
	}
  async update(id, data){
    return db[this.dbname].update(id, data)
  }
  async remove(id){
    return db[this.dbname].delete(id)
  }
}

async function _extractNested(records, fields = []) {
  for (const field of fields) {
    const origin = typeof field === 'string' ? field : field.origin
    const dbName = typeof field === 'string' ? field : field.db
    const fill = typeof field === 'string' ? null : field.fill

    for (const record of records) {
      const ids = record[origin]

      if (!Array.isArray(ids) || ids.length === 0) continue

      // Load the referenced items from the appropriate table
      const relatedItems = await db[dbName]
        .where('_id')
        .anyOf(ids)
        .toArray()

      // Clone related items before attaching to record
      const clonedItems = relatedItems.map(item => structuredClone(item))

      record[origin] = clonedItems

      // If nested fill is defined, recurse into each related item
      if (fill && Array.isArray(fill)) {
        await _extractNested(clonedItems, fill)
      }
    }
  }

  // Return a deep clone of the records to ensure no Dexie proxies leak out
  return records.map(r => structuredClone(r))
}


// NOTE: DO NOT INDEX IMAGES

db.version(2).stores({
  tours: `++_id, 
    cover_image_path,
    title, 
    active,  
    brief, 
    description,
    group,
    tags,
    stops`,

    stories: `++_id,
        name,
        locations,
        images,
        transcript,
        tags`,

    transcripts: `++_id,
        name,
        text,
        year,
        tags,
        sources,
        status,
        locations,
        notes,
        sources,
        images,
        audio`,
    
    locations: `++_id,
      name,
      maptype,
      address,
      coords,
      group,
      tags,
      images`,

    groups: `++_id,
      name,
      list`,

    image_files: `++_id,
      name,
      path,
      tags`,

    audio_files: `++_id,
      name,
      path,
      tags`
});

db.open().then(function (db) {
    // Database opened successfully
  console.log('Database Ready');
}).catch (function (err) {
    // Error occurred
  console.log('DB failed to open')
});