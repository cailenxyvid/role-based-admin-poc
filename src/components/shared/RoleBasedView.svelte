<script>
    // this acts as sort of a middleware "controller" to enforce a role based view pattern 
    
    // availableRoles: this component requires that all available roles be defined and passed down from the calling component (app screen/module)
    // this role definition object must contain a reference to the associated role based template "wrapper" component,
    // and also a nested collection of all view components available to that role in this application context, including properties 
    // example:
    
    export let availableRoles    
    export let view = {} // current inner view component
    export let activeView = "" // string representing active view
    export let props = {} // not required. top level properties that might be needed depending on app context (ex: Event)

    import { user } from '../../lib/data/userStore'

    let setActiveView = (viewName) => {
        view = availableRoles[$user.role.name].views[viewName]
        activeView = viewName        
    }
</script>

{#if availableRoles[$user.role.name]}
<!-- the wrapper component -->
<svelte:component this={availableRoles[$user.role.name].wrapper} {setActiveView} {activeView} {...props}>
{#if view}
    <!-- the actual view, will be rendered in the slot of the wrapper component -->    
    <svelte:component this={view.component} {...view.props} />
{/if}
</svelte:component>
{:else}
<div class="text text-3xl text-red-600">There is no view for {$user.role.name} defined for this application module.</div>
{/if}