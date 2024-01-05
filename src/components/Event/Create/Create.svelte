<script>
    import { eventStore } from "../../../lib/data/state/eventState"

    let event = {
        title: '',
        event_date: ''
    }

    let submit = () => {
        eventStore.create(event)
        done()
    }

    export let done
</script>

{#if $eventStore.errors}
    <div class="text text-xl text-red-500">
    {#each $eventStore.errors as error}
        <div class="border">{error}</div>
    {/each}
    </div>
{/if}

<form on:submit|preventDefault={submit}>   
    <label for="title">Event Title</label>
    <input type="text" bind:value={event.title} name="title" /> 
    <lable for="event_date">Event Date</lable>
    <input type="date" bind:value={event.event_date} />
    <div class="actions">        
        <!-- # why does Tailwind [type=submit] bg:transparent override explicit styles? -->
        <button class="bg-xyvid-green text-white">Save</button>
    </div>
</form>