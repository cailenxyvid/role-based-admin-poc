<script>
    import { fade, scale } from "svelte/transition"

    import AudienceChat from "../../../shared/AudienceChat/AudienceChat.svelte"
    import SupportChat from "../../../shared/TechSupport/SupportChat.svelte"

    export let activeEvent

    let toggleOpen = () => {
        open = !open
    }

    let open = false
    let showChat = true
    let showSupport = false
</script>




<footer class="flex bg-slate-800 text-xl text-white {open ? 'w-full' : 'w-sidebar-closed' }">
    {#if open}
    
    <div in:fade class="bg-slate-500 flex-row w-sidebar-closed ml-0 h-full text-center">
        <button on:click={toggleOpen}>
            <i class="fa-solid fa-angles-left"></i>
        </button>    
    </div>

    <div in:scale class="pl-10">
        <span class="pl-10 relative">
            <button class="{showSupport ? 'text-xyvid-green' : '' }" on:click={() => { showSupport = !showSupport } }>
                <i class="fa-regular fa-comments-question-check" title="Tech Support"></i>
                Tech Support                            
            </button>        
            {#if showSupport}
            <div id="SupportChat" class="bg-slate-400">
                <SupportChat event_id={activeEvent} />
            </div>
            {/if}
        </span>

        <span class="pl-10 relative">
            <button class="{showChat ? 'text-xyvid-green' : '' }" on:click={() => { showChat = !showChat } }>
                <i class="fa-regular fa-comment-dots" title="Audience Chat"></i>
                Audience Chat                         
            </button>
            {#if showChat}
            <div id="AudienceChat">
                <AudienceChat {activeEvent}></AudienceChat>
            </div>
            {/if}
        </span> 
                   
        <!-- <i class="fa-solid fa-chart-line" title="infographic/ticker with event stats, engagement numbers etc"></i> -->
    </div>
    {:else}
    <button in:fade on:click={toggleOpen} class="w-full">
        <i class="fa-solid fa-comments-question-check"></i>
    </button>
    {/if}
</footer>