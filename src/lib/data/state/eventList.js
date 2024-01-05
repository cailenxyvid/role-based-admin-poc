import { writable } from 'svelte/store'
import { loadEvents } from "../mockAPI"    
import { supabase } from "../supabaseClient"

const store = writable({
    dirty: false,      
    events: loadEvents(),
    filtered: null, // []
    errors: []
})

supabase
    .channel('public:event')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'event' }, async payload => {    
        // supabase sends back granular results on trigger, so payload will only contain the row changed. Refresh list instead (for now)        
        store.update(store => {
            store.dirty = true
            
            return store;
        })
        
        let events = loadEvents() // we don't await here, because the initial state of store.events is a promise
        
        store.update(store => {            
            // store.dirty = false
            store.events = events
            return store;
        })  

        // because we aren't awaiting the list, subscribing components never see store.dirty == true
        // another (better?) pattern would be to await loadEvents but then wrap the results in a new Promise on assignment to store.events
        setTimeout(() => {
            store.update(store => {            
                store.dirty = false                
                return store;
            })  
        }, 3000)
        
    })
    .subscribe() 

//# interesting to know that this (creating writable directly from promise) does work in a pinch:
// export const eventList = writable(loadEvents())

export const eventList = {
    subscribe: store.subscribe,
    set: store.set,
}