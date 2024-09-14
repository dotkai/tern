import { defineStore } from 'pinia'
import { Database } from 'src/db/db'

const StopData = new Database('stories')

const state = () => ({
    name: null,
    location: [],
    transcripts: [],
    images: []
})

const getters = {
    
}

const actions = {
    async init(ACTIVE_ID, onadd){
        this.ACTIVE_ID = ACTIVE_ID
        if(ACTIVE_ID === 'NEW'){
            // Create "Empty page"
            const nuid = await StopData.add()
            this.ACTIVE_ID = nuid
            onadd(nuid)
            return;
        }
        const data = await StopData.getOne(ACTIVE_ID)
        Object.assign(this, data)
    },
    async update(){
        await StopData.update(this.ACTIVE_ID, {
            name: this.name,
            location: JSON.parse(JSON.stringify(this.location)),
            transcripts: JSON.parse(JSON.stringify(this.transcripts)),
            images: JSON.parse(JSON.stringify(this.images))
        })
    },
    async remove(){
        await StopData.remove(this.ACTIVE_ID)
    }
}

export const useStopStore = defineStore('stops', {
    state,
    getters,
    actions
})