<script>
    import FormModal from "../../../../shared/FormModal.svelte"

    export let newItem
    export let close
</script>

<FormModal formHandler={newItem} {close}>
    <label for="title">Title</label>
    <input type="text" name="title" class="border" />

    <label for="type">Type</label>
    <select name="type" class="border">
        <option value="word">Word Document</option>
        <option value="slidedeck">Slidedeck</option>
        <option value="quiz">Quiz</option>
        <option value="poll">Poll</option>
    </select>
</FormModal>