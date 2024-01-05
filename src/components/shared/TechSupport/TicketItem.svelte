<script>
    import { user } from "../../../lib/data/userStore"
    import { updateTicket } from "../../../lib/data/state/ticketState"

    import InlineText from "../Forms/InlineText.svelte"
    
    export let ticket

    ticket.updated_by = $user.id
</script>

<tr>
    <td>{ticket.id}</td>
    <td class="title">
        <InlineText value={ticket.title} save={(title) => {
            ticket.title = title
            updateTicket(ticket)
        }} />
    </td>
    <td>{new Date(ticket.created_at).toDateString()}</td>
    <td>{ticket.created_by.display_name}</td>
    <td>{ticket.updated_by.display_name}</td>
</tr>