<script>
    // import framework tools
    import { fly } from 'svelte/transition'

    // import components
    import ContentItemActions from "./ContentItemActions.svelte"

    // component actions
    export let deleteItem
    export let updateItem

    // component props
    export let item

    // local actions
    let toggleEdit = () => {
        edit = !edit
    }

    // local props
    let edit = false
</script>

<div transition:fly={{ duration: 800}} class="contentItem mt-2 p-2 {item.active ? 'bg-slate-600 text-white' : ''}">
    {#if edit}
        <form on:submit|preventDefault={() => { 
            updateItem(item) 
            toggleEdit()
            }}>
            <label for="title">Title</label>
            <input name="title" class="text-black w-2/4" bind:value={item.title} />

            <button type="submit" class="bg-emerald-600 rounded-md p-1">Save</button>
        </form>
    {:else}
        <span>{item.title}</span>
    {/if}
    <ContentItemActions {item} {deleteItem} {updateItem} {toggleEdit}></ContentItemActions>
    <!-- {item.active} {item.sort} -->
    </div>