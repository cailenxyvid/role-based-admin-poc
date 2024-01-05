<script>
    export let setActiveView
    export let activeView
</script>

<i on:click={()=>{ setActiveView('Host') }} class="hover:text-xyvid-green fa fa-2x fa-video-camera {activeView == 'Host' ? 'text-xyvid-green' : '' }" aria-hidden="true"></i>