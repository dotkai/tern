import _ from 'lodash'
import { defineStore } from 'pinia'
import { Database } from 'src/db/db'

const StopData = new Database('stories')

const getBase = () => {
    return {
        name: '',
        locations: [],
        transcripts: [],
        images: [],
        tags: []
    }
}

const state = () => (getBase())

const getters = {
    
}

const actions = {
    async init(ACTIVE_ID){
        if(ACTIVE_ID === 'NEW'){
            // Create "Empty page"
            Object.assign(this, getBase())
            this.ACTIVE_ID = null;
            return;
        }
        const data = await StopData.getOne(ACTIVE_ID)
        Object.assign(this, data)
        this.ACTIVE_ID = ACTIVE_ID;
    },
    async update(){
        const data = {
          name: this.name,
          locations: JSON.parse(JSON.stringify(this.locations)),
          transcripts: JSON.parse(JSON.stringify(this.transcripts)),
          images: JSON.parse(JSON.stringify(this.images)),
          tags: JSON.parse(JSON.stringify(this.tags))
        }

        // Already created
        if(this.ACTIVE_ID) return StopData.update(this.ACTIVE_ID, data)
        // Make new
        const nuid = await StopData.add(data)
        this.ACTIVE_ID = nuid;
    },
    async remove(){
        await StopData.remove(this.ACTIVE_ID)
    },

    addLocationAttachment(source){
        this.images = _.unionBy(this.images, source.images, 'path')
    },
    addScriptAttachment(source){
        this.images = _.unionBy(this.images, source.images, 'path')
        this.locations = _.union(this.locations, source.locations)
    }
}

export const useStopStore = defineStore('stops', {
    state,
    getters,
    actions
})