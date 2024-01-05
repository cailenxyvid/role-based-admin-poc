<script>    
    import EventList from "../../shared/EventList/EventList.svelte"      
  </script>
  
  <div class="grid grid-flow-col h-full place-items-center gap-4 bg-pink-300">
    <div>grid 1</div>
    <div class="bg-purple-300 flex-grow">grid 2</div>
    <div class="bg-slate-100 p-3 row-span-2 w-full">      
        <EventList />      
    </div>
    <div>grid 4</div>
    <!-- <div>grid 5</div>
    <div>grid 6</div> -->
  </div>