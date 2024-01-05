<script>
    import Accordion from "../Accordion.svelte"

    export let icon
    export let title
</script>

<i class="hideOnExpand fa fa-{icon}" title={title}></i>
<span class="hideOnCollapse">
<Accordion title={title} icon={icon}>
    <div class="pl-3 text-sm">
        <slot></slot>
    </div>    
</Accordion>
</span>

