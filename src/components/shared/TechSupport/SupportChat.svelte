<script>
    import { loadStore, supportChatStore } from "../../../lib/data/state/supportChatState"
    import { user } from "../../../lib/data/userStore"
          
    import DataUpdateIndicator from "../DataUpdateIndicator.svelte"
    import RoleBasedFeature from "../RoleBasedFeature.svelte"

    import CreateTicketFromMessage from "./CreateTicketFromMessage.svelte"

    export let event_id

    let pendingMessage
    let newSupportMessage = async () => {                
        if (pendingMessage.length < 1)
            return
        
        let newMessage = {
            user: $user.id,            
            message: pendingMessage,            
            event: event_id
        }        
        
        supportChatStore.newMessage(newMessage)   
        pendingMessage = ""    
    }
    
    loadStore(event_id)
</script>

<div class="flex flex-col h-full">
    {#if $supportChatStore.new}
        <div class="absolute bottom-10 p-1 rounded-full flex-shrink bg-blue-700 text-white">
            <button on:click={()=>{
                let element = document.getElementById('SupportMessagePane') //# using explicit DOM IDs feels a little flaky
                element.scrollTop = element.scrollHeight
                $supportChatStore.new = false
            }}>
                New Messages
                <i class="fa fa-chevron-down"></i>
            </button>            
        </div>
    {/if}
    <div class="messagePane flex-grow scroll-smooth" id="SupportMessagePane">                
        {#if $supportChatStore.messages.length > 0}
            {#each $supportChatStore.messages as message}
                <div class="message {message.user_profile.role.name} { message.user == $user.id ? 'myMessage' : '' }">                    
                    {message.message}
                    <div class="messageUser">
                        {message.user_profile.display_name}
                    </div>
                    <RoleBasedFeature permittedRoles={['admin', 'support']}>                        
                        <CreateTicketFromMessage {message} created_by={$user.id} />
                    </RoleBasedFeature>
                </div>
            {/each}
        {:else}
        No messages yet.
        {/if}

        <div class="newMessage bg-slate-500 rounded-md">
            <form on:submit|preventDefault={newSupportMessage}>                
                <input class="messageInput" type="text" name="message" bind:value={pendingMessage} />                        
                <button><i class="fa fa-send"></i></button>            
                {#if $supportChatStore.incoming}<DataUpdateIndicator />{/if}
            </form>
        </div>  
    </div>
</div>