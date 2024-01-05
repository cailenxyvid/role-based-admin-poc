<script>        
    // dependencies 
    import { eventList } from "../../../lib/data/state/eventList"

    // generic components
    import Loader from "../Loader.svelte"
    import DataUpdateIndicator from "../DataUpdateIndicator.svelte"

    // module specific components 
    import EventFilter from "./components/EventFilter.svelte"
    import EventItem from "./components/EventItem.svelte"

    // expected external properties (/ actions)
    export let viewAction = (event_id) => {
        console.error("EventList component: no viewAction defined")
    }

    // local props / actions
    let searchAction = async query => {
        let events = await $eventList.events        
        $eventList.filtered =  events.filter(e => e.title.toLowerCase().includes(query.toLowerCase()))
    }    
</script>


<div class="text-3xl text-red-700">
{#each $eventList.errors as error}
<div>{error}</div>
{/each}
</div>

<ul class="eventList flex flex-col flex-grow">    
    <div class="text-xl">
        {#if $eventList.dirty}
        <DataUpdateIndicator />
        {/if}
        My Events
    </div>
    <div class="contentFilterTools bg-slate-400 p-4 pb-0 rounded-md w-full text-sm">                    
        <EventFilter {searchAction} />
    </div>
    {#if $eventList.filtered}
        {#if $eventList.filtered.length < 1}
            No results
        {:else}
            {#each $eventList.filtered as event}
            <EventItem {event} {viewAction} />
            {/each}
        {/if}
    {:else}
        {#await $eventList.events}    
        <Loader />
        {:then events}        
        {#each events as event}
            <EventItem {event} {viewAction} />
        {/each}
        {/await}
    {/if}
</ul>

