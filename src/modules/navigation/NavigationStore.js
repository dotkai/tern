import { defineStore } from "pinia"

const state = () => ({
    returnRoute: null
})

const actions = {
    stashReturn($router, $route, goto){
        this.returnRoute = {
            name: $route.name,
            params: $route.params
        }
        // Query doesn't pass to the route
        // Workaround until this gets fixed
        $router.push({
            ...goto, 
            query: { 
                returnRoute: JSON.stringify(this.returnRoute) 
            } 
        })
    },
    clearReturn(){
        // Query doesn't pass to the route
        // Workaround until this gets fixed
        this.returnRoute = null
    },
    popReturn($router, goto){
        if(this.returnRoute){
            $router.push(this.returnRoute);
            this.returnRoute = null
            return;
        }
        $router.push(goto)
    }
}

export const useNavigationStore = defineStore('navstore', {
    state,
    actions
})