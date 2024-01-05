<script>
    import { fly } from "svelte/transition"

    export let error
</script>

<div class="text-red-700" transition:fly={{ duration: 1500 }}>{error}</div>