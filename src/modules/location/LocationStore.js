import { defineStore } from 'pinia'
import { Database } from 'src/db/db'

const LocationData = new Database('locations')

const getBase = () => {
    return {
        name: null,
        category: null,
        tags: [],
        maptype: 'ADDRESS',
        address: null,
        coords: {},
        images: []
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
        const data = await LocationData.getOne(ACTIVE_ID)
        Object.assign(this, data)
        this.ACTIVE_ID = ACTIVE_ID;
    },
    async update(){
        const data = {
            name: this.name,
            category: this.category,
            maptype: this.maptype,
            tags: JSON.parse(JSON.stringify(this.tags)),
            address: this.address,
            coords: JSON.parse(JSON.stringify(this.coords)),
            images: JSON.parse(JSON.stringify(this.images))
        }

        // Already created
        if(this.ACTIVE_ID) return LocationData.update(this.ACTIVE_ID, data)
        // Make new
        const nuid = await LocationData.add(data)
        this.ACTIVE_ID = nuid;
    },
    async remove(){
        await LocationData.remove(this.ACTIVE_ID)
    }
}

export const useLocationStore = defineStore('location', {
    state,
    getters,
    actions
})