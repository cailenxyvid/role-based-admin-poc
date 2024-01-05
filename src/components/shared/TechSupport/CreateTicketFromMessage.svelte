<script>
    // component name as action instead of object, interesting pattern but probably ungainly
    import { supportChatStore } from "../../../lib/data/state/supportChatState"

    import Loader from "../Loader.svelte"

    export let message
    export let created_by

    let createPromise
    let create = () => {
        createPromise = supportChatStore.createTicket(message, created_by)        
    }
</script>

{#await createPromise}
    <Loader />
{:then result} 
    <div class="hideUntilHoverParent text-sm">
    {#if message.ticket}
    <a href="/#/support/ticket/{message.ticket}">
        <i class="fa fa-external-link-square" aria-hidden="true"></i>
        <div class="hideUntilHover">Go to Ticket</div>
    </a>
    {:else}
    <button on:click={create}>
        <i class="fa fa-plus-square text-xyvid-green" aria-hidden="true"></i>
        <div class="hideUntilHover">Create Ticket</div>
    </button>
    {/if}
    <!-- this should be a :catch block, but supabase sends back a fulfilled promise on error, unless i'm missing something -->
    {#if result && result.error}
    <!-- handling granular errors like this is pretty nice, but ultimately it's probably best to send them to a centralized location (on related store or global) -->
    <div class="errors text-red-600">
        {result.error.message}
    </div>
    {/if}
    </div>    
{/await}