<script>    
    export let icon    
    export let viewName
    export let activeView

    export let setActiveView
</script>

<span class="sidebarItem {viewName == activeView ? 'active' : '' }">
    <button on:click={() => { setActiveView(viewName) } }>
        <i class="fa fa-{icon}" title={viewName}></i>
        <span class="hideOnCollapse pl-3 duration-300"><slot></slot></span>
    </button>
</span>