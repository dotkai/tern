import { defineStore } from 'pinia'
import { Database } from 'src/db/db'

const StopData = new Database('stops')

const state = () => ({
    
})

const getters = {
    
}

const actions = {
    async init(ACTIVE_ID){
        this.ACTIVE_ID = ACTIVE_ID
        if(ACTIVE_ID === 'NEW'){
            // Create "Empty page"
            
            return;
        }
        const data = await StopData.getOne(ACTIVE_ID)
        Object.assign(this, data)
    },
    async add(){
        return await StopData.add({
            
        })
    },
    async update(){
        await StopData.update(this.ACTIVE_ID, {
            
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