<script>    
    let toggleMenu = () => {
        menuOpen = !menuOpen
    }

    let menuOpen
</script>
<div class="bg-emerald-800 text-white flex flex-col flex-grow duration-300 h-full relative pt-20 {menuOpen ? 'w-sidebar-open pl-2' : 'w-sidebar-closed sidebarCollapsed text-center'}">
    <button on:click={toggleMenu} id="EventMenuToggle"
        class="absolute -right-3 -top-0 p-1 bg-white text-emerald-900 border-emerald-900 border cursor-pointer rounded-full h-8 w-8 flex items-center justify-center">
        <i class="fa fa-arrow-{menuOpen ? 'left' : 'right fa-beat'}"></i>
    </button>

    <slot></slot>
</div>
