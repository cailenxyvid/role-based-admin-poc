// this provides a rough mockup of an API
// if we were to actually do something like this instead of HTTP REST, there would need to be more robust error handling and well defined patterns
// we would probably also want to seperate related "endpoints" into discrete files and import them 

import { supabase } from "./supabaseClient";

// ******** content
export const newContentItem = async (item) => {
    const { data, error } = await supabase
        .from('content')
        .insert([
            { title: item.title, event_id: item.event_id }
        ])

    if (error) {
        console.error("Error creating content item", error)
        throw new Error("Unable to add new content item!")        
    }

    return data;
}

export const deleteContentItem = async (id) => {
    const { status, error } = await supabase
        .from('content')
        .delete()
        .match({ id: id })

    if (error) {
        console.error("Error deleting content item", error)
        throw new Error("Unable to delete content item ("+id+")!")        
    }
    
    return status;
}

export const updateContentItem = async (item) => {
    const { data, error } = await supabase
        .from('content')
        .update(item)
        .match({ id: item.id })

    if (error) {
        console.error("Error updating content item", error)
        throw new Error("Unable to update content item ("+item.title+")!")        
    }

    return data;
}

export let loadContent = async (event_id) => {
    const { data, error } = await supabase
    .from('content')
    .select()
    .eq('event_id', event_id)
    .order('id', { ascending: true })
    
  
    if (error) throw error;
  
    return data;
  }

// ******** events / event
export let loadEvents = async () => {
    const { data, error } = await supabase
    .from('event')
    .select()

    if (error) throw error;

    return data;
}

export let loadEvent = async (event_id) => {
    const { data, error } = await supabase
    .from('event')
    .select()
    .eq('id', event_id)
  
    if (error) return error;
  
    return data[0];
  }
  
  export const updateEvent = async (event) => {
    const { data, error } = await supabase
        .from('event')
        .update(event)
        .match({ id: event.id })

    if (error) {
        console.error("Error updating event", error)
        throw new Error("Unable to update event ("+event.title+")!")        
    }

    return data;
}  

export const newEvent = async (event) => {
    const { data, error } = await supabase
        .from('event')
        .insert([
            { title: event.title }
        ])

    if (error) {
        console.error("Error creating event", error)
        throw new Error("Unable to add new event!")        
    }

    return data;
}

export const registerEventUser = async (event_id, user_id) => {
    const { data, error } = await supabase
        .from('event_user')
        .upsert(
            { event: event_id, user: user_id },
            { onConflict: 'user' },
        )
        .match({ event: event_id, user: user_id })

    if (error) {
        console.error("Error registering user to event", error)
        throw new Error("Unable to register user to event "+event_id+"!")        
    }

    console.log('registerUser', typeof data, data) //# why on earth is users a null object here but not in the resolved promise in the calling func?
    return data;
}

export const loadEventUsers = async (event_id) => {
    const { data, error } = await supabase
    .from('event_user')
    .select(`
        event,
        heartbeat,
        user_profile (
            display_name,
            avatar_url
        )
    `)
    .eq('event', event_id)    
    
    if (error) throw error;
    
    return data;
}

// ******** support chat
export const loadSupportChat = async (event_id) => {
    const { data, error } = await supabase
    .from('support_chat')
    .select(`
        id,
        message, 
        ticket,
        created_at,
        user,
        event,
        user_profile (
            role ( name ),
            display_name
        )
    `)
    .eq('event', event_id)
    .order('created_at', { ascending: true })
    
    if (error) throw error;
    
    return data;
}

export const newSupportMessage = async (message) => {    
    const { data, error } = await supabase
        .from('support_chat')
        .insert([
            { user: message.user, message: message.message, event: message.event }
        ])

    if (error) {
        console.error("Error sending audience chat message", error)
        throw new Error("Unable to send message!")        
    }

    return data;
}

// ******** chat
export const loadChat = async (event_id) => {
    const { data, error } = await supabase
    .from('audience_chat')
    .select(`
        message, 
        created_at,
        user,
        user_profile (
            display_name
        )
    `)
    .eq('event', event_id)
    .order('created_at', { ascending: true })
    
    if (error) throw error;
    
    return data;
}

export const newMessage = async (message) => {    
    const { data, error } = await supabase
        .from('audience_chat')
        .insert([
            { user: message.user, message: message.message, event: message.event }
        ])

    if (error) {
        console.error("Error sending audience chat message", error)
        throw new Error("Unable to send message!")        
    }

    return data;
}