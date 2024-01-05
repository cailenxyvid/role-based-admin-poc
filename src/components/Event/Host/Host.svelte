<script>
    // import utilities
    import { fade } from 'svelte/transition'

    // import state
    import { eventStore } from '../../../lib/data/state/eventState'

    // import components
    import ShowFlow from "./ShowFlow/ShowFlow.svelte"    
    import EventContent from '../components/EventContent/EventContent.svelte'    
    import HostNavigation from './HostNavigation.svelte'
  
    // action (event) handlers
    export let toggleGoLive
    export let setViewState
        
    // local state
    let event = $eventStore.event
    let panels = {
        EventContent: false,
        ShowFlow: false
    }

    // local actions
    let togglePanel = panel => {
        panels[panel] = !panels[panel]
    }
    
</script>


<div transition:fade class="relative">
    <div class="absolute right-0 -top-3 flex">        
        <HostNavigation {togglePanel} {panels}></HostNavigation>
    </div>

    <!-- grid container/template -->
    <div class="grid grid-rows-host grid-cols-4 gap-4">
        {#if panels.ShowFlow}
        <div class="col-span-3">
            <ShowFlow live={event.live} currentState={event.viewstate} {toggleGoLive} {setViewState} />
        </div>        
        {/if}

        {#if panels.EventContent}
        <div class="row-span-3 row-start-1 col-start-4 mt-3">
            <EventContent activeEvent={event.id} />
        </div>        
        {/if}

        <div class="row-start-2"><h1>Slidedeck?</h1></div>
    </div>    
</div>
