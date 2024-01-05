<script>      
    import EventList from "../../shared/EventList/EventList.svelte"          
    import Tickets from "../../shared/TechSupport/Tickets.svelte"        
  </script>
    
  <div class="grid grid-flow-col h-full place-items-center gap-4 bg-slate-100">
    <div>dashboard filler widgets</div>
    <div class="bg-slate-100 p-3 row-span-2 w-full">        
        <EventList />      
    </div>
    <div>
        <Tickets />
    </div>
  </div>