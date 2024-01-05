<script>
    // this acts as a helper alongside role based views, for situations that call for a more granular approach (like a button on a screen that is otherwise the same)

    import { user } from '../../lib/data/userStore'

    export let permittedRoles
    // export let feature // the component to render if the user has an appropriate role 
    // export let props // optional component properties 

    // returns true if user role exists in permitted roles
    let checkRole = () => {
        return permittedRoles.includes($user.role.name)
    }
</script>

{#if checkRole}
<!-- <svelte:component this={feature} {...props} /> -->
<!-- trying this with slot instead, i think it will be a cleaner pattern (props handled natively etc) -->
<slot></slot>
{/if}