<script>
  import InfoModal from "../../shared/InfoModal.svelte"

  import EventList from "../../shared/EventList/EventList.svelte"          
  import Create from "../../Event/Create/Create.svelte" //# don't like this naming scheme from this remote context. good argument for more explicit component names, ie EventCreate even if that looks clunky working directly in that space


  let showNewEvent = false
</script>
  
<div class="grid grid-flow-col h-full place-items-center gap-4 bg-pink-300">
  <div>dashboard filler widgets</div>
  <div class="bg-purple-300 flex-grow">grid 2</div>
  <div class="bg-slate-100 p-3 row-span-2 w-full"> 
      {#if showNewEvent}      
        <InfoModal close={() => { showNewEvent = false }}>
          <Create done={() => { showNewEvent = false }} />
        </InfoModal>
      {/if}
      <button on:click={()=>{ showNewEvent = true }} class="border bg-xyvid-green text-white">
        <i class="fa fa-plus"></i>
        New Event
      </button>
      <EventList />      
  </div>
  <div>alerts?</div>
</div>