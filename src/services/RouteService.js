import { useRoute, useRouter } from 'vue-router';

export class RouteService {
    constructor({param_id, back_root}){
        this.route = useRoute()
        this.router = useRouter()

        this.param_id = param_id
        this.back_root = back_root
    }
    getEditId(){
        return this.route.params[this.param_id]
    }
    isnu(){
        return this.route.params[this.param_id] === 'NEW'
    }
    upid(nuParamId){
        this.router.push({
            name: this.route.name,
            params: {
                [this.param_id]: nuParamId
            }
        })
    }
    back(){
        this.router.push({ name: this.back_root })
    }
}