<script>
    import { fade } from 'svelte/transition'

    export let text = "Loading"
</script>

<div transition:fade class="loader">
    <i class="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
    {text}
</div>
