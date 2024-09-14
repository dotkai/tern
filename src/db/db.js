import Dexie from 'dexie';
import {nanoid} from 'nanoid';

export const db = new Dexie('tour_db');
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
  async getOne(_id){
    return db[this.dbname].get(_id)
  }
  async getSet(idList){
    const test = await db[this.dbname].get(idList[0])
    const all = await db[this.dbname].toArray()
    console.log(test, all)
    return db[this.dbname].bulkGet(idList)
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

// NOTE: DO NOT INDEX IMAGES

db.version(2).stores({
  tours: `++_id, 
    title, 
    active, 
    image_files, 
    brief, 
    description,
    stops,
    tags`,

    stories: `++_id,
        name,
        locations,
        images,
        transcript`,

    transcripts: `++_id,
        name,
        text,
        year,
        sources,
        status,
        location,
        notes,
        images,
        audio`,
    
    locations: `++_id,
      name,
      address,
      lat,
      long,
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
      path`
});

db.open().then(function (db) {
    // Database opened successfully
  console.log('Database Ready');
}).catch (function (err) {
    // Error occurred
  console.log('DB failed to open')
});