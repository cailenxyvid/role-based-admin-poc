<script>
    // action (event) handlers
    export let formHandler = async (event) => {
        console.error('form submit -- no submit handler set!', event)
    }

    export let close;
</script>

<div class="modal">
    <form on:submit|preventDefault={formHandler}>
        <slot></slot>
        
        <div class="actions">
            <button on:click={close} class="cancel bg-orange-400">Cancel</button>
            <button type="submit" class="bg-green-600">Save</button>
        </div>
    </form>
</div>