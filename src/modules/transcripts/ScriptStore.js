import { defineStore } from 'pinia'
import { Database } from 'src/db/db'

const ScriptData = new Database('transcripts')

const state = () => ({
    name: '',
    year: null,
    status: null,

    text: null
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
            return;
        }
        const data = await ScriptData.getOne(ACTIVE_ID)
        console.log(data)
    },
    async save(){
        await ScriptData.update(this.ACTIVE_ID, {
            name: this.name,
            year: this.year,
            status: this.status,
            text: this.text
        })
    }
}

export const useScriptStore = defineStore('script', {
    state,
    getters,
    actions
})