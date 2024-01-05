<script>
    export let value
    export let update 
</script>

<form on:submit|preventDefault={() => { update(value) }}>
    <input type="text" bind:value={value} class="bg-slate-300" />
</form>

<style>
    form, input {
        display: inline;
    }
</style>
