<script>
    import Sidebar from "../../../shared/Sidebar/Sidebar.svelte"
</script>

<!-- if this isn't actually doing anything, just use Sidebar directly in Event. Leaving here as an example of provisioning shared components  -->
<Sidebar>
    <slot></slot>
</Sidebar>