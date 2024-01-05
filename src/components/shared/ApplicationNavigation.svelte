<script>
    import UserAvatar from "./UserAvatar.svelte"
    import ApplicationMenu from "./ApplicationMenu.svelte"

    import { user } from '../../lib/data/userStore'
</script>

<div class="flex justify-end items-center space-x-3 p-1">
    <div><ApplicationMenu /></div>
    <div class="h-10 w-10"><UserAvatar user={$user} /></div>
</div>