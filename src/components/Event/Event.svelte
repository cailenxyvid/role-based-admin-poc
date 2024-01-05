<script>
    // user data
    import { user } from '../../lib/data/userStore'

    // event data
    import { eventStore, toggleGoLive, update, loadStore, setViewState } from '../../lib/data/state/eventState'

    // components
    // import EventNavigation from './components/EventNavigation/EventNavigation.svelte'
    import RoleBasedView from '../shared/RoleBasedView.svelte'
    import ApplicationNavigation from '../shared/ApplicationNavigation.svelte'

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

    // router (url) params
    export let params
     
    // view state    
    let availableRoles = {
        'admin': {
            wrapper: admin,
            views: {
                Host: {
                component: Host,
                props: { toggleGoLive, setViewState }            
                },
                Settings: {
                component: Settings,                
                },
                Archive: {
                    component: Archive                    
                },
                Reporting: {
                    component: Reporting                    
                }
            }
        },
        'tech_support': {
            wrapper: tech_support,
            views: {        
                Reporting: {
                component: Reporting
                }
            }
        }
    }

    // initialize event state  
    let eventPromise  
    $: if (params.id && $user.id) {           
        eventPromise = loadStore(params.id, $user.id);               
    }
</script>



{#await eventPromise}
<Loader text="Loading Event" />
{:then event}
<div id="EventView" class="border flex flex-col h-screen">    
    <ApplicationNavigation />           
    <RoleBasedView {availableRoles} props={{ event: $eventStore.event}} />        
</div>
{:catch error}
<div class="text-3xl text-red-600">
    Error! {error.message}
</div>
{/await}
