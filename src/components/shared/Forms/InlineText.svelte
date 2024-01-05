<script>
    import StandaloneText from "./StandaloneText.svelte"

    export let value
    export let save

    let active = false

    let update = (v) => {
        save(v)
        active = false
    }
</script>

{#if active}
<StandaloneText {value} {update} />
<button on:click={() => { active = false }} class="inline">
    <i class="fa fa-times"></i>
</button>
{:else}
<button on:click={() => { active = true }}>{value}</button>
{/if}