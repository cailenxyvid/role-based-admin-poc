<script>
    // user data
    import { user } from '../../lib/data/userStore'

    // event data
    import { eventStore, toggleGoLive, update, loadStore, setViewState } from '../../lib/data/state/eventState'

    // components
    import EventNavigation from './components/EventNavigation/EventNavigation.svelte'

    // View components
    import Loader from '../shared/Loader.svelte'
    import Host from "./Host/Host.svelte"
    import Settings from './Settings/Settings.svelte'
    import Archive from './Archive/Archive.svelte'
    import Reporting from "./Reporting/Reporting.svelte"

    // role based component wrappers
    import admin from './roles/admin.svelte'
    import host from './roles/host.svelte'
    import tech_support from './roles/tech_support.svelte'

    // actions
    let setActiveView = (view) => {
        activeView = view
     }

     // router (url) params
     export let params

     // component state
     let activeView

     // view state
    let roles = {
        'admin': admin,
        'host': host,
        'tech_support': tech_support
    }

    let views = {
        Host: {
            component: Host,
            props: { toggleGoLive, setViewState}
        },
        Settings: {
            component: Settings,
            props: {}
        },
        Archive: {
            component: Archive,
            props: {}
        },
        Reporting: {
            component: Reporting,
            props: {}
        }
    }

    // initialize event state
    let eventPromise
    $: if (params.id) {           
        eventPromise = loadStore(params.id);
        console.error('Event route params changed', params)
    }
</script>

{#await $user}
<Loader text="Loading Session" />
{:then user}
    {#await eventPromise}
    <Loader text="Loading Event" />
    {:then event}
    <div id="EventView" class="border flex flex-col h-screen">    
        <EventNavigation {user} />
        <svelte:component this={roles[user.role.name]} {setActiveView} {activeView} event={$eventStore.event} view={views[activeView]} />
    </div>
    {:catch error}
    Error! {error.message}
    {/await}
{/await}