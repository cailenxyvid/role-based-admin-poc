<script>
    export let user

    let getInitials = () => {
        let arr = user.display_name.split(' ')
        if (arr.length < 1 || !user.display_name)
            return '?'
        if (arr.length > 1)
            return arr[0].charAt(0) + arr[1].charAt(0)
        else 
            return arr[0].charAt(0)
    }

    let colors = ['purple','amber','pink','teal','blue','green']

    let initials = getInitials()
    let color = colors[Math.floor(Math.random()*colors.length)]
</script>

<!-- this component requires dimensions to be constrained when included in view - it will take up as much space as given -->
<div title={user.display_name} class="{ user.color ? '' : 'bg-'+color+'-500' } rounded-full h-full w-full flex items-center justify-center overflow-clip"
    style="{ user.color ? 'background-color: ' +user.color : '' }">
    {#if user.avatar_url}
    <img src="{user.avatar_url}" alt="Profile" class="w-full h-full" />
    {:else}
    <span class="text-xl">{initials}</span>
    {/if}
</div>

