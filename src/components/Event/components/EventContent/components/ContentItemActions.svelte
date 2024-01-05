<script>
    import ContentItemActionIcon from "./ContentItemActionIcon.svelte"

    export let updateItem
    export let deleteItem
    export let toggleEdit
    
    export let item

    let setActive = () => {
        item.active = !item.active
        updateItem(item)
    }
</script>

<div class="actions text-right">
    <ContentItemActionIcon action={setActive} icon="play" />
    <ContentItemActionIcon action={toggleEdit} icon="pencil" />
    <ContentItemActionIcon action={ () => { deleteItem(item.id) } } icon="trash" />
</div>