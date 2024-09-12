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
  async add(data, customId){
    const NUID = nanoid()
		await db[this.dbname].add({
			_id: NUID,
			...data
		})
    return NUID
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
        audio_files,
        image_files,
        transcript,
        sources`,

    transcripts: `++_id,
        name,
        text,
        year,
        sources,
        status,
        location,
        images,
        audio_files`,
    
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
      tags`
});

db.open().then(function (db) {
    // Database opened successfully
  console.log('Database Ready');
}).catch (function (err) {
    // Error occurred
  console.log('DB failed to open')
});