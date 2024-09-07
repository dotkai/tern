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
    async init(ACTIVE_ID){
        this.ACTIVE_ID = ACTIVE_ID
        if(ACTIVE_ID === 'NEW'){
            // Create "Empty page"
            this.name = null
            this.group = null
            this.tags = []
            this.location_address = null
            this.location_lat = null
            this.location_long = null
            this.images = []
            return;
        }
        const data = await LocationData.getOne(ACTIVE_ID)
        Object.assign(this, data)
    },
    async add(){
        return await LocationData.add({
            name: this.name,
            group: this.group,
            tags: JSON.parse(JSON.stringify(this.tags)),
            location_address: this.location_address,
            location_lat: this.location_lat,
            location_long: this.location_long,
            images: JSON.parse(JSON.stringify(this.images))
        })
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
    },

    pushImages(imageList){
        this.images.push(...imageList)
    },
    updateImage({image_id, updateName, updateCaption}){
        const target = this.images.find(v => v.image_id === image_id)
        target.name = updateName
        target.caption = updateCaption
    },
    removeImage(image_id){
        this.images = this.images.filter(v => v.image_id !== image_id)
    }
}

export const useLocationStore = defineStore('location', {
    state,
    getters,
    actions
})