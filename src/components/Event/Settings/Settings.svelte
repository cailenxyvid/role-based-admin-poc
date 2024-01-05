<script>    
    import { update, eventStore } from "../../../lib/data/state/eventState"
    import Loader from "../../shared/Loader.svelte"
    

    let savePromise

    let saveChanges = async () => {
        savePromise = update($eventStore.event)        
    }

    $: console.log('Settings', $eventStore.event)
</script>

<h1 class="text-xl">Settings</h1>
{#await savePromise}
    <Loader />
{:then saveResult}
    <form on:submit|preventDefault={saveChanges}>
        <label for="title">Title</label>
        <input name="title" class="border" bind:value={$eventStore.event.title} />

        <label for="event_date">Event Date</label>
        <input type="date" name="event_date" class="border" bind:value={$eventStore.event.event_date} />

        <!-- tailwind custom bg color doesn't work on submit buttons? overridden by 'Remove default button styles' - unlike non custom colors. investigate.. -->
        <button type="submit" class="bg-green-500 text-white rounded-sm p-1">Save</button>
    </form>
{:catch error}
    Error: {error}
{/await}