<script>
    export let searchAction
</script>

<div><input class="rounded-full border border-slate-600 p-1 mb-3" type="text" on:change={ searchAction(this.value) } placeholder="Search" /></div>