<script>
    import { loadStore, chatStore } from "../../../lib/data/state/chatState"
    import { user } from "../../../lib/data/userStore"
      
    import Loader from "../Loader.svelte"
    import DataUpdateIndicator from "../DataUpdateIndicator.svelte"
    import NewItemButton from "../NewItemButton.svelte"
    import ErrorItem from "../ErrorItem.svelte"

    export let activeEvent

    let newMessage = async (event) => {
        // await $user
        const formData = new FormData(event.target)  

        if (pendingMessage.length < 1)
            return
        
        let newMessage = {
            // user: $user.id,
            user: formData.get('user_id'),
            message: pendingMessage,            
            event: activeEvent
        }        
        
        chatStore.newMessage(newMessage)   
        pendingMessage = ""    
    }

    let loadingMessages = loadStore(activeEvent)
    let pendingMessage 
</script>

{#if activeEvent}
<!-- # should be able to remove this await now -->
{#await $user}
<Loader />
{:then user} 
<div class="flex flex-col h-full">
    {#await loadingMessages}
        <Loader />
    {:then loadedMessages} 
    {#if $chatStore.new}
        <div class="absolute bottom-10 p-1 rounded-full flex-shrink bg-blue-700 text-white">
            <button on:click={()=>{
                let element = document.getElementById('MessagePane')
                element.scrollTop = element.scrollHeight
                $chatStore.new = false
            }}>
                New Messages
                <i class="fa fa-chevron-down"></i>
            </button>            
        </div>
    {/if}
    <div class="messagePane flex-grow scroll-smooth" id="MessagePane">
        <div class="bg-slate-500">
            {#if $chatStore.incoming}<DataUpdateIndicator />{/if}
        </div>
        
        {#if $chatStore.messages.length > 0}
            {#each $chatStore.messages as message}
                <div class="message { message.user == user.id ? 'myMessage' : '' }">
                    {message.message}
                    <div class="messageUser">
                        {message.user_profile.display_name}
                    </div>
                </div>
            {/each}
        {:else}
        No messages yet.
        {/if}
    </div>
    {/await}

    
    <div class="newMessage bg-slate-500 rounded-md">
        <form on:submit|preventDefault={newMessage}>
            <input type="hidden" name="user_id" value={user.id} />
            <input class="messageInput" type="text" name="message" bind:value={pendingMessage} />                        
            <button><i class="fa fa-send"></i></button>            
        </form>
    </div>    
</div>
{/await}
{:else}
No Event ID!
{/if}