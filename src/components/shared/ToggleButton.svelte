<script>
    export let toggle
    export let icon
</script>

<button on:click={toggle}><i class="fa fa-{icon}"></i></button>