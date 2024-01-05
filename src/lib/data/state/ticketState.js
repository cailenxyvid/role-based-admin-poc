import { writable } from 'svelte/store'
import { supabase } from "../supabaseClient"


const store = writable({
    new: false,    
    event_id: null,
    tickets: [],
    available_status: [],
    errors: []
})

export const loadStore = async (event_id = null) => {
    //# we would need to handle pagination, especially when getting all tickets
    let tickets = await (event_id ? getTicketsByEvent(event_id) : getAllTickets())
    let status_list = await getAvailableStatus()
    
    store.update(store => {
        store.new = false
        store.tickets = tickets
        store.available_status = status_list
        return store;
    })  

    supabase
    .channel('public')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'support_ticket', filter: 'event=eq.'+event_id }, async payload => {    
        
        let newTickets = await (event_id ? getTicketsByEvent(event_id) : getAllTickets())
       
        store.update(store => {
            store.new = true
            
            store.tickets = newTickets
            return store;
        })  
        
    })
    .subscribe() 

    return tickets //# this feels a little hacky, setting the store contents but also returning the list directly for initial load on the view
}

const getAvailableStatus = async () => {
    const { data, error } = await supabase
    .from('support_ticket_status')
    .select()

    if (error) throw error;

    return data    
}

const getTicketsByEvent = async (event_id) => {
    const { data, error } = await supabase
    .from('support_ticket')
    .select(`
        id,
        event,
        message,
        title,
        status (
            title,
            id
        ),
        created_at,
        created_by (
            display_name
        ),
        updated_by (
            display_name
        )
    `)
    .eq('event', event_id)  
    .order('id', { ascending: true })
    
  console.log('get tickets', data)
    if (error) throw error;
  
    return data;
}

const getAllTickets = async () => {
    const { data, error } = await supabase
    .from('support_ticket')
    .select(`
        id,
        event,
        message,
        title,
        status (
            title,
            id
        ),
        created_at,
        created_by (
            display_name
        ),
        updated_by (
            display_name
        )
    `)
    .order('id', { ascending: true })
    
  
    if (error) throw error;
  
    return data;
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

export const updateTicket = async ticket => { 
    // trigger DB error if title is empty   
    if (ticket.title == '')  ticket.title = null

    const { data, error } = await supabase
        .from('support_ticket')
        // not a fan of this pattern. explicit props are needed because of join artifacts (created_by etc)
        .update({ 
            title: ticket.title,
            updated_by: ticket.updated_by
        })
        .match({ id: ticket.id })

    if (error) {
        handleError(error.message)       
    }
}

//# leaving this here to document unexpected behavior - function param behaves like a reference variable 
// export const updateTicket = async ticket => {    
//     let ticketCopy = ticket
//     ticket.title = "THIS IS A LIE"
//     delete ticketCopy.status
//     delete ticketCopy.created_by
//     console.log('updateTicket', ticketCopy)
//     const { data, error } = await supabase
//         .from('support_ticket')
//         .update(ticketCopy)
//         .match({ id: ticketCopy.id })

//     if (error) {
//         handleError(error.message)       
//     }
// }

export const ticketStore = {
    subscribe: store.subscribe,
    set: store.set,
}