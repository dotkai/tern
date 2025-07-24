import { useQuasar } from 'quasar'

export class NotifyService {
    constructor(name){
        this.$q = useQuasar()
        this.name = name;
    }
    message(value){
        this.$q.notify({
            type: 'positive',
            message: value
        })
    }
    add(value){
        this.$q.notify({
            type: 'positive',
            message: `Added ${this.name}: ${value}`
        })
    }
    update(value){
        this.$q.notify({
            type: 'positive',
            message: `Updated ${this.name}: ${value}`
        })
    }
    remove(value){
        this.$q.notify({
            type: 'positive',
            message: `Removed ${this.name}: ${value}`
        })
    }
    userError(message){
        this.$q.notify({
            type: 'negative',
            message: `Error ${message}`
        })
    }
    error(message, log){
        this.$q.notify({
            type: 'negative',
            message: `Error ${message || log}`
        })
        console.error(log)
    }
}