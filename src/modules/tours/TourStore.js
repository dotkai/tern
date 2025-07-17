import { defineStore } from 'pinia'
import { Database } from 'src/db/db'

const TourData = new Database('tours')

const getBase = () => {
    return {
        cover_image_path: null,
        title: null,
        active: false,
        brief: null,
        description: null,
        group: null,
        stops: [],
        tags: []
    }
}

const state = () => ({
    ACTIVE_ID: null,
    ...getBase()
})

const getters = {}

const actions = {
    async init(ACTIVE_ID){
        if(ACTIVE_ID === 'NEW'){
            // Create "Empty page"
            Object.assign(this, getBase())
            this.ACTIVE_ID = null;
            return;
        }
        const data = await TourData.getOne(ACTIVE_ID)
        Object.assign(this, data)
        this.ACTIVE_ID = ACTIVE_ID;
    },
    async update(){
        const data = {
            cover_image_path: this.cover_image_path,
            title: this.title,
            active: this.active,
            brief: this.brief,
            description: this.description,
            group: this.group,
            tags: JSON.parse(JSON.stringify(this.tags)),
            stops: JSON.parse(JSON.stringify(this.stops))
        }
        
        // Already created
        if(this.ACTIVE_ID) return TourData.update(this.ACTIVE_ID, data)
        // Make new
        const nuid = await TourData.add(data)
        this.ACTIVE_ID = nuid;
    },
    async remove(){
        await TourData.remove(this.ACTIVE_ID)
    }
}

export const useTourStore = defineStore('tour', {
    state,
    getters,
    actions
})