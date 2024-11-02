import { defineStore } from 'pinia'
import { Database } from 'src/db/db'

const TourData = new Database('tours')

const state = () => ({
    cover_image_path: null,
    title: null,
    active: false,
    brief: null,
    description: null,
    group: null,
    tags: []
})

const getters = {
    
}

const actions = {
    async init(ACTIVE_ID, notify){
        const s = this;
        this.ACTIVE_ID = ACTIVE_ID
        if(ACTIVE_ID === 'NEW'){
            // Create "Empty page"
            const nuid = await TourData.add()
            Object.assign(this, {
                ...Object.keys(s).forEach((i) => {
                    if(['tags'].includes(i)) return s[i] = []
                    s[i] = null
                }),
                ACTIVE_ID: nuid
            })
            notify.add('New Tour')
            return;
        }
        const data = await TourData.getOne(ACTIVE_ID)
        Object.assign(this, data)
    },
    async update(){
        await TourData.update(this.ACTIVE_ID, {
            cover_image_path: this.cover_image_path,
            title: this.title,
            active: this.active,
            brief: this.brief,
            description: this.description,
            group: this.group,
            tags: JSON.parse(JSON.stringify(this.tags))
        })
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