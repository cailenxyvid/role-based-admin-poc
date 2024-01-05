<script>
    export let viewAction
    export let event
</script>

<li class="eventItem">
    <span class="eventItemActions">
        <button on:click={() => { viewAction(event.id)}}><i class="fa fa-search"></i></button>            
    </span>
    <a href="/#/event/{event.id}">{event.title}</a>
</li>

<style>
    .eventItem {
        border-bottom: 1px solid #ccc;
    }
</style>