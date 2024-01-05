<script>
    export let setActiveView
    export let activeView
</script>

<button on:click={()=>{ setActiveView('Settings') }} class="hover:text-xyvid-green {activeView == 'Settings' ? 'text-xyvid-green' : ''}">
    <i class="fa fa-cog" aria-hidden="true"></i>
</button>