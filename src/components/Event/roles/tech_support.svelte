<script>
    import Sidebar from "../../shared/Sidebar/Sidebar.svelte"
    import SidebarItem from "../../shared/Sidebar/SidebarItem.svelte"
    // import AudienceChat from "../../shared/AudienceChat/AudienceChat.svelte"
    import SupportChat from "../../shared/TechSupport/SupportChat.svelte"
    import Tickets from "../../shared/TechSupport/Tickets.svelte"
    import EventControls from "../components/EventControls/EventControls.svelte"

    export let event
    export let view
    export let activeView
    export let setActiveView
</script>

<EventControls>
    <svelte:fragment slot="views">
    
    </svelte:fragment>
    <svelte:fragment slot="title">{event.title}</svelte:fragment>
    <svelte:fragment slot="status">
        
    </svelte:fragment>
</EventControls>

<div class="flex flex-row flex-grow">
    <div class="bg-slate-500 h-full">
        <Sidebar>
            <SidebarItem icon="box-archive" viewName="Archive" {activeView} {setActiveView}>Archive</SidebarItem>
        </Sidebar>
    </div>
    <div class="flex-grow">
        {#if activeView}
        <svelte:component this={view.component} {event} {...view.props} />
        {:else}
        <!-- default dashboard -->
        <div class="grid grid-flow-col h-full">
            <div class=" col-span-3">grid1 status widget</div>
            <div class="">grid2</div>
            <div class=" row-span-2">
                <Tickets event_id={event.id} />
            </div>
            <div class="">Grid 4</div>
            <div class=" grid items-end">
                <div class="bg-slate-400 h-96"><SupportChat event_id={event.id} /></div>
            </div>
            <div class="">Grid 6</div>
            <div class="">Grid 7</div>
        </div>
        {/if}
    </div>    
</div>