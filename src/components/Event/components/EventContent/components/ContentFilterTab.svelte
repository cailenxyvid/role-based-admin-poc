<script>
    export let filterAction
    export let type
    export let activeType
    export let label
</script>

<button on:click={() => { filterAction(type) }} class="p-1 {activeType == type ? 'bg-slate-200' : ''}">{label}</button>