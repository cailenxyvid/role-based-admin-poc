<script>
    // import store
    import { loadStore, contentStore } from "../../../../lib/data/state/contentState"

    // import components        
    import Loader from "../../../shared/Loader.svelte"
    import DataUpdateIndicator from "../../../shared/DataUpdateIndicator.svelte"
    import NewItemButton from "../../../shared/NewItemButton.svelte"
    import ErrorItem from "../../../shared/ErrorItem.svelte"
    import ContentItem from "./components/ContentItem.svelte"
    import ContentFilter from "./components/ContentFilter.svelte"
    import ContentItemNew from "./components/ContentItemNew.svelte"
    
    // component props    
    export let activeEvent; //# should probably be using context API for this

    // initial data/state
    let loadingContent = loadStore(activeEvent);

    // local props
    let showNew = false;
    let filterType = "all";

    // local actions
    //# these could be moved to a lib for cleanliness - need to rethink scope to do so
    let reloadItems = async () => {
        return loadingContent = loadStore(activeEvent)
    }
    
    let newItem = async (event) => {
        const formData = new FormData(event.target)
        
        let newItem = {
            title: formData.get('title'),
            type: formData.get('type'),
            event_id: activeEvent
        }
        
        contentStore.addItem(newItem)
        showNew = false;
    }

    let deleteItem = (id) => {
        try {
            contentStore.deleteItem(id)
        } catch (error) {
            console.error(error)
        }
    }

    let updateItem = (item) => {
        try {
            contentStore.updateItem(item)
        } catch (error) {
            console.error(error)
        }
    }

    let filterItems = async (type) => {
        filterType = type;
        await reloadItems()
        if (type == 'all')
            return
        if (type == 'active') {
            $contentStore.items =  $contentStore.items.filter(item => item.active)    
            return
        }                
        
        $contentStore.items =  $contentStore.items.filter(item => item.type == type)
    }

    let searchItems = async (query) => {
        await reloadItems()
        
        $contentStore.items =  $contentStore.items.filter(item => item.title.toLowerCase().includes(query.toLowerCase()))
    }
</script>

<div id="ContentTool" class="mt-6 p-1 border bg-slate-50 rounded-md">    
    <div class="contentFilterTools bg-slate-400 p-4 pb-0 rounded-md w-full text-sm">                
        <NewItemButton action={() => { showNew = true }}>New Item</NewItemButton>
        <ContentFilter filterAction={filterItems} searchAction={searchItems} activeType={filterType} />
    </div>
    {#await loadingContent}
        <Loader />
    {/await}
    {#if $contentStore.dirty}
        <DataUpdateIndicator />
    {/if}
    <div class="errors">
        {#each $contentStore.errors as error}
            <ErrorItem {error}></ErrorItem>
        {/each}
    </div>
    <div id="ContentItems" class="">
        {#each $contentStore.items as item}
        <ContentItem {item} {deleteItem} {updateItem}></ContentItem>
        {/each}    
    </div>    
</div>

{#if showNew}
<!-- the internal form elements could be moved to a component for cleanliness - ContentNewItemForm -->
<div class="absolute top-0 left-1/3 p-5 bg-slate-400 grid h-1/4 place-items-center">
    <ContentItemNew {newItem} close={() => { showNew = false }} />
</div>    
{/if}