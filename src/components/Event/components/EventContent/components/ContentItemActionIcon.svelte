<script>
    export let action
    export let icon
</script>

<span on:click={action}><i class="fa fa-{icon}"></i></span>