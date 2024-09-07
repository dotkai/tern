import { defineStore } from 'pinia'
import { Database } from 'src/db/db'

const ScriptData = new Database('transcripts')

const state = () => ({
    name: '',
    year: null,
    status: null,

    text: null,
    images: []
})

const getters = {
    wordCount: (state) => (state.text || '').split(' ').length
}

const actions = {
    async init(ACTIVE_ID){
        this.ACTIVE_ID = ACTIVE_ID
        if(ACTIVE_ID === 'NEW'){
            // Create "Empty page"
            this.name = null
            this.year = null
            this.status = null
            this.text = null 
            this.images = []
            return;
        }
        const data = await ScriptData.getOne(ACTIVE_ID)
        Object.assign(this, data)
    },
    async add(){
        return await ScriptData.add({
            name: this.name,
            year: this.year,
            status: this.status,
            text: this.text,
            images: JSON.parse(JSON.stringify(this.images))
        })
    },
    async update(){
        await ScriptData.update(this.ACTIVE_ID, {
            name: this.name,
            year: this.year,
            status: this.status,
            text: this.text,
            images: JSON.parse(JSON.stringify(this.images))
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