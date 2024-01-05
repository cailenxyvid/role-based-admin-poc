<script>
    export let action
    export let icon = "plus-square"
</script>

<button on:click={action}>
    <i class="fa fa-{icon}" aria-hidden="true"></i>
    <slot></slot>
</button>