<script>
    import { ticketStore, loadStore } from "../../../lib/data/state/ticketState"

    import Loader from "../Loader.svelte";
    import TicketList from "./TicketList.svelte"

    export let event_id = null

    let filterByEvent = event_id => {
        displayTickets = $ticketStore.tickets.filter(ticket => { return ticket.event == event_id})
    }

    let filterByStatus = status => {
        activeStatus = status
        displayTickets = $ticketStore.tickets.filter(ticket => { return ticket.status.id == status})        
    }

    let displayTickets 
    let activeStatus = 1 // display new tickets by default

    displayTickets = loadStore(event_id) // initial load - this isn't an ideal pattern since it's disconnected from the rest of the data flow

    $: if ($ticketStore.tickets) { 
        // we need to take an extra step to refresh on incoming subscriptions since we aren't rendering the store directly
        filterByStatus(activeStatus) 
    } 
</script>

<h1 class="text-xl mt-3">Support Tickets</h1>
<div class="text-red-500">
    {#each $ticketStore.errors as error}
        {error}
    {/each}
</div>
<div class="grid">
    <div class="tabs">
        {#each $ticketStore.available_status as status}
        <button on:click={() => { filterByStatus(status.id) }} class="tab {activeStatus == status.id ? 'active' : ''}">{status.title}</button>
        <!-- slick pattern that will always reflect DB setup, but doesn't easily allow for tailored styles -->        
        {/each}
        <!-- <button class="tab">Resolved Tickets</button>
        <button class="tab bg-orange-400">Escalated Tickets</button> -->
    </div>
    <div class="showTickets">
        {#await displayTickets}
            <Loader />
            {:then tickets}
            <TicketList {tickets} />
        {/await}
    </div>
</div>

