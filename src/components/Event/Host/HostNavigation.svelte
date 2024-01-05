<script>
import { slide } from 'svelte/transition'

import { eventStore } from '../../../lib/data/state/eventState'

import UserAvatar from '../../shared/UserAvatar.svelte'

export let togglePanel
export let panels

let showControls
let showTeam

let checkActive = timestamp => {
    let heartbeat = new Date(timestamp)
    let activeRange = new Date()

    activeRange.setMinutes(activeRange.getMinutes() - 5)

    return heartbeat > activeRange
}
</script>

<div id="HostNavigation" class="bg-slate-100  text-xl flex space-x-2 rounded-sm p-1 flex-col text-end space-y-2">
    <div >Host Controls</div>    
    <div>
        {#if showControls}
        <span transition:slide class="controls bg-slate-400 p-1 rounded-sm">
            <button on:click={()=>{ togglePanel('EventContent') }} >
                <i class="fa fa-file {panels.ContentTool ? 'text-xyvid-green' : '' }" alt="Toggle Content Tool" title="Content"></i>
            </button>
            <button on:click={()=>{ togglePanel('ShowFlow') }}>
                <i class="fa fa-sliders {panels.ShowFlow ? 'text-xyvid-green' : '' }" alt="Toggle Show Flow Control" title="Show Flow"></i>
            </button>        
        </span>
        {/if}

        <button on:click={() => { showControls = !showControls }} alt="Toggle Host Tools" title="Host Tools">
            <i class="fa fa-th-large {showControls ? 'text-xyvid-green' : 'fa-beat' }"></i>
        </button>        
        </div>

    <div id="team">
        <!-- this should probably be a component -->
        {#if showTeam}
        <span>
            {#each $eventStore.users as user}       
            <!-- checkActive is not wired up to be truly reactive, will only be accurate when first opening pane -->
            <span class="w-8 h-8 inline-block {checkActive(user.heartbeat) ? '' : 'opacity-50'}">
                <UserAvatar user={user.user_profile} />
            </span>                
            {/each}
        </span>
        <button class="border text-3xl" on:click={()=>{ showTeam = false }}>
            <i class="fa fa-users text-xyvid-green"></i>
        </button>
        {:else}
        <button class="text-3xl" on:click={()=>{ showTeam = true }}>
            <i class="fa fa-users"></i>
        </button>
        {/if}
    </div>
</div>
