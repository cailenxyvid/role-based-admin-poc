<script>
    import EventMenu from "../components/EventMenu/EventMenu.svelte"
    import SidebarItem from "../../shared/Sidebar/SidebarItem.svelte"
    import SidebarSubmenu from "../../shared/Sidebar/SidebarSubmenu.svelte"

    import EventControls from "../components/EventControls/EventControls.svelte"
    import EventControlsSettingsToggle from "../components/EventControls/EventControlsSettingsToggle.svelte"
    import EventControlsHostToggle from "../components/EventControls/EventControlsHostToggle.svelte"

    import EventFooter from "../components/EventFooter/EventFooter.svelte"

    export let event    
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
    <div class="flex flex-col flex-min">
    <EventMenu>
        <SidebarItem icon="tv" viewName="Viewer" {activeView} {setActiveView}>Viewer</SidebarItem>
        <SidebarItem icon="chart-column" viewName="Reporting" {activeView} {setActiveView}>Reporting</SidebarItem>
        <SidebarItem icon="box-archive" viewName="Archive" {activeView} {setActiveView}>Archive</SidebarItem>
        <SidebarSubmenu icon="square-list" title="Event Actions">
            <SidebarItem icon="copy" viewName="Duplicate" {activeView} {setActiveView}>Duplicate Event</SidebarItem>
            <SidebarItem icon="trash" viewName="Delete" {activeView} {setActiveView}>Delete Event</SidebarItem>        
        </SidebarSubmenu>
    </EventMenu>
    </div>

    <!-- main view area -->    
    <div class="flex flex-col flex-auto p-10">        
        <slot></slot>
    </div>    
</div>
<EventFooter activeEvent={event.id} />
