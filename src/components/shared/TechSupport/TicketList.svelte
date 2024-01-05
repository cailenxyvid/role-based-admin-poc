<script>
    import TicketItem from "./TicketItem.svelte"

    export let tickets        
</script>

<table class="ticketList">
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Created At</th>
        <th>Created By</th>
        <th>Updated By</th>
        <th>Assigned To</th>
      </tr>
    </thead>
    <tbody>
      {#each tickets as ticket}
        <TicketItem {ticket} />
      {/each}
    </tbody>
</table>
