import { writable } from 'svelte/store'
import { supabase } from "../supabaseClient"
import { loadChat, newMessage } from "../mockAPI"

const store = writable({
    new: false,
    incoming: true,
    event_id: null,
    messages: [],
    errors: []
})

export const loadStore = async (event_id) => {
    let messages
    try {
        messages = await loadChat(event_id)
    } catch (error) {
        handleError(error.message)
    }
    
    
    store.update(store => {
        store.incoming = false
        store.messages = messages
        return store;
    })  

    // subscribe to DB updates
    supabase
    .channel('public:audience_chat:event=eq.'+event_id)
    .on('postgres_changes', { event: '*', schema: 'public', table: 'audience_chat', filter: 'event=eq.'+event_id }, async payload => {    
        // supabase sends back discrete results on trigger, so payload will only contain the row changed. Refresh list instead (for now)        
        store.update(store => {
            store.incoming = true
            return store;
        })
        
        let newMessages = await loadChat(event_id)
        
        store.update(store => {
            store.new = true
            store.incoming = false
            store.messages = newMessages
            return store;
        })  
        
    })
    .subscribe() 

}

const addItem = (message) => {
    newMessage(message).catch(handleError)
}

const handleError = (error) => {
    console.error(error)
    store.update(store => {
        store.errors = [...store.errors, error]
        return store
    })
    
    // clear each error after a while. probably not the best way to do this, but good UX to do something
    setTimeout(() => {
        store.update(store => {
            store.errors = [...store.errors.slice(1,store.errors.length)]
            return store
        })  
    }, 9000)
}

export const chatStore = {
    subscribe: store.subscribe,
    set: store.set,
    newMessage: addItem
}