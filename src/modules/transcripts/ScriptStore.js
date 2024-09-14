import { defineStore } from 'pinia'
import { Database } from 'src/db/db'

const ScriptData = new Database('transcripts')

const state = () => ({
    name: '',
    year: null,
    status: null,

    text: null,
    location: [],
    images: [],
    audio: [],
    notes: []
})

const getters = {
    wordCount: (state) => (state.text || '').split(' ').length
}

const actions = {
    async init(ACTIVE_ID, onadd){
        this.ACTIVE_ID = ACTIVE_ID
        if(ACTIVE_ID === 'NEW'){
            // Create "Empty page"
            const nuid = await ScriptData.add()
            this.ACTIVE_ID = nuid
            onadd(nuid)
            return;
        }
        const data = await ScriptData.getOne(ACTIVE_ID)
        Object.assign(this, data)
    },
    async update(){
        await ScriptData.update(this.ACTIVE_ID, {
            name: this.name,
            year: this.year,
            status: this.status,
            text: this.text,
            location: JSON.parse(JSON.stringify(this.location)),
            notes: JSON.parse(JSON.stringify(this.notes)),
            images: JSON.parse(JSON.stringify(this.images)),
            audio: JSON.parse(JSON.stringify(this.audio))
        })
    },
    async remove(){
        await ScriptData.remove(this.ACTIVE_ID)
    }
}

export const useScriptStore = defineStore('script', {
    state,
    getters,
    actions
})