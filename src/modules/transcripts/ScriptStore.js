import _ from 'lodash'
import { defineStore } from 'pinia'
import { Database } from 'src/db/db'

const ScriptData = new Database('transcripts')

const getBase = () => {
    return {
        name: '',
        year: null,
        status: null,
        tags: [],

        text: null,
        locations: [],
        images: [],
        audio: [],
        notes: [],
        sources: []
    }
}
const state = () => (getBase())

const getters = {
    wordCount: (state) => (state.text || '').split(' ').length
}

const actions = {
    async init(ACTIVE_ID){
        if(ACTIVE_ID === 'NEW'){
            // Create "Empty page"
            Object.assign(this, getBase())
            this.ACTIVE_ID = null;
            return;
        }
        const data = await ScriptData.getOne(ACTIVE_ID)
        Object.assign(this, data);
        this.ACTIVE_ID = ACTIVE_ID;
    },
    async update(){
        const data = {
            name: this.name,
            year: this.year,
            status: this.status,
            text: this.text,
            tags: JSON.parse(JSON.stringify(this.tags)),
            locations: JSON.parse(JSON.stringify(this.locations)),
            notes: JSON.parse(JSON.stringify(this.notes)),
            images: JSON.parse(JSON.stringify(this.images)),
            audio: JSON.parse(JSON.stringify(this.audio))
        }

        
        // Already created
        if(this.ACTIVE_ID) return ScriptData.update(this.ACTIVE_ID, data)
        // Make new
        const nuid = await ScriptData.add(data)
        this.ACTIVE_ID = nuid;
    },
    async remove(){
        await ScriptData.remove(this.ACTIVE_ID)
    },

    addLocationAttachment(source){
        this.images = _.unionBy(this.images, source.images, 'image_id')
    }
}

export const useScriptStore = defineStore('script', {
    state,
    getters,
    actions
})