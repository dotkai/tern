import { defineStore } from 'pinia'
import { Database } from 'src/db/db'

const LocationData = new Database('locations')

const state = () => ({
    name: null,
    group: null,
    tags: [],
    location_address: null,
    location_lat: null,
    location_long: null,
    images: []
        // path, title, caption
})

const getters = {
    
}

const actions = {
    async init(ACTIVE_ID, onadd){
        this.ACTIVE_ID = ACTIVE_ID
        if(ACTIVE_ID === 'NEW'){
            // Create "Empty page"
            const nuid = await LocationData.add()
            Object.assign(this, {
                ...Object.keys(s).forEach((i) => {
                    if(['images', 'tags'].includes(i)) return s[i] = []
                    s[i] = null
                }),
                ACTIVE_ID: nuid
            })
            notify.add('New Location')
            return;
        }
        const data = await LocationData.getOne(ACTIVE_ID)
        Object.assign(this, data)
    },
    async update(){
        await LocationData.update(this.ACTIVE_ID, {
            name: this.name,
            group: this.group,
            tags: JSON.parse(JSON.stringify(this.tags)),
            location_address: this.location_address,
            location_lat: this.location_lat,
            location_long: this.location_long,
            images: JSON.parse(JSON.stringify(this.images))
        })
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