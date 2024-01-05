<script>    
    import EventControls from "../components/EventControls/EventControls.svelte"
    import EventControlsSettingsToggle from "../components/EventControls/EventControlsSettingsToggle.svelte"
    import EventControlsHostToggle from "../components/EventControls/EventControlsHostToggle.svelte"    

    import AudienceChat from "../../shared/AudienceChat/AudienceChat.svelte"

    export let event
    export let view
    export let activeView

    export let setActiveView
</script>

<EventControls>
    <svelte:fragment slot="views">
        <EventControlsSettingsToggle {setActiveView} {activeView}></EventControlsSettingsToggle>
        <EventControlsHostToggle {setActiveView} {activeView}></EventControlsHostToggle>
    </svelte:fragment>
    <svelte:fragment slot="title">{event.title}</svelte:fragment>
    <svelte:fragment slot="status">
        
    </svelte:fragment>
</EventControls>

<div class="flex container flex-row h-full">    
    <div class="flex-col h-96">
        <AudienceChat activeEvent={event.id} />
    </div>
    <!-- main view area -->
    {#if activeView}
    <div class="flex flex-col flex-auto p-10">
        <svelte:component this={view.component} {event} {...view.props} />
    </div>
    {/if}                
</div>

