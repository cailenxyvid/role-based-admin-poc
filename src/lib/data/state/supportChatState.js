import { writable } from 'svelte/store'
import { supabase } from "../supabaseClient" //# making some DB calls directly here (instead of adding to mockAPI) for brevity, but that's not ideal
import { loadSupportChat, newSupportMessage } from "../mockAPI"


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
        messages = await loadSupportChat(event_id)
    } catch (error) {
        handleError(error.message)
    }
    
    
    store.update(store => {
        store.incoming = false
        store.messages = messages
        return store;
    })  

    
    // subscribe to DB updates
    // supabase
    // .channel('public') //# setting specific channel breaks this?
    // .on('postgres_changes', { event: '*', schema: 'public', table: 'support_chat', filter: 'event=eq.'+event_id }, async payload => {                           
    //     store.update(store => {
    //         store.new = true
    //         store.incoming = false
    //         store.messages = [...store.messages, payload.new]
    //         return store;
    //     })  
        
    // })
    // .subscribe() 

    //# it would be nice to be more surgical (above code) and just insert the new messages, but we would have to take extra steps to join user data
    supabase
    .channel('public')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'support_chat', filter: 'event=eq.'+event_id }, async payload => {            
        store.update(store => {
            store.incoming = true
            return store;
        })
        
        let newMessages = await loadSupportChat(event_id)
        
        store.update(store => {
            store.new = true
            store.incoming = false
            store.messages = newMessages
            return store;
        })  
        
    })
    .subscribe() 

    // this catches all row updates, but only has logic for associating new tickets
    // if there are other update scenarios for support_chat (or for general future proofing), this would have to be rethought
    supabase
    .channel('public:support_chat:event=eq.'+event_id)
    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'support_chat', filter: 'event=eq.'+event_id }, async payload => {                                      
        store.update(store => {                        
            // we want to surgically update the ticket property on the correct message, without replacing the whole item (to avoid losing joined data)
            store.messages = store.messages.map(message => {
                if (message.id == payload.new.id) {
                    return {...message, ticket: payload.new.ticket} // spread the existing props, and then overwrite the one we care about
                } else {
                    return message // this wasn't the matching message, return as is
                }
            })
            return store;
        })          
    })
    .subscribe() 

}

const sendMessage = (message) => {
    newSupportMessage(message).catch(handleError)
}

// create a new tech support ticket linked to a chat message
// in real life we might want to consider tying this to third party ticketing system
// also, it would be nice to get created_by user id from session/auth token instead of prop drilling and passing it explicitly here
const createTicket = async (message, created_by) => {
           
    // return as promise to allow natural flow to UI loading indicator
    // good demonstration, but not functionally great since we can't control error handling as easily or work with the new data (ticket id)
    // for this experiment, the support_chat message is updated with the new ticket id via DB trigger
    // in real life, we wouldn't want redundant foreign keys 
    return supabase 
        .from('support_ticket')
        .insert([
            { message: message.id, event: message.event, created_by: created_by, title: message.message.substring(0, 20) }
            // toggle these two lines to demonstrate inline errors on UI
            // { message: message.id, event: null, created_by: created_by }
        ])
}

const handleError = (error) => {
    console.error(error)
    store.update(store => {
        store.errors = [...store.errors, error]
        return store
    })
        
    setTimeout(() => {
        store.update(store => {
            store.errors = [...store.errors.slice(1,store.errors.length)]
            return store
        })  
    }, 9000)
}

export const supportChatStore = {
    subscribe: store.subscribe,
    set: store.set,
    newMessage: sendMessage, //# pick one and be consistent
    createTicket: createTicket
}