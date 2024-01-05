import { writable } from 'svelte/store'
import { supabase } from "../supabaseClient"
import { loadEvent, updateEvent, newEvent, registerEventUser, loadEventUsers } from "../mockAPI"

const store = writable({
    dirty: true,    
    event: {},
    users: [],
    errors: []
})

export const loadStore = async (event_id, user_id) => {
    let event
    let users

    if (!user_id) handleError("event.loadStore: Missing user_id")
    try {
        event = await loadEvent(event_id)
        users = await registerUser(event_id, user_id)        
    } catch (error) {
        handleError(error.message)
    }    
    
    store.update(store => {
        console.log('initial update store', users)
        store.dirty = false
        store.event = event
        store.users = users
        return store;
    })  
    
     // subscribe to event DB changes, results will reload corresponding promises
     supabase
     .channel('public:event:id=eq.'+event_id) //# param doesn't seem to do anything. wrong supabase version? .on filter: works
     .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'event', filter: 'id=eq.'+event_id }, async payload => {            
        store.update(store => {
            store.dirty = false
            store.event = payload.new
            return store;
        }) 
     })
     .subscribe()

     // subscribe to event users
     supabase
     .channel('public:event_user:event=eq.'+event_id)
     .on('postgres_changes', { event: '*', schema: 'public', table: 'event_user', filter: 'event=eq.'+event_id }, async payload => {    
        let users = await loadEventUsers(event_id)   
         
        store.update(store => {
            store.dirty = false
            store.users = users
            return store;
        })         
     })
     .subscribe()     
}

export const update = (event) => {
    return updateEvent(event).catch(handleError)
}

export const create = (event) => {
    newEvent(event).catch(handleError)
}

export const toggleGoLive = async (event) => {

    const { data, error } = await supabase
    .from('event')
    .update({ live: !event.live })
    .match({ id: event.id })

    if (error) throw error

    // no further action required since the DB subscription takes over
}

export const setViewState = async (event_id, vs) => {  
    const { data, error } = await supabase
    .from('event')
    .update({ viewstate: vs })
    .match({ id: event_id })

    if (error) throw error

    return data; // we don't need the data (because of subscription), but this returns a promise we can await on 
}

export const registerUser = async (event_id, user_id) => {
    registerEventUser(event_id, user_id)

    return loadEventUsers(event_id)
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

export const eventStore = {
    subscribe: store.subscribe,
    set: store.set,
    update: update,
    create: create,
    toggleGoLive: toggleGoLive,
    setViewState: setViewState
}