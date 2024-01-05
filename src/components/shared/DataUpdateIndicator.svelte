<script>
    import { fade } from 'svelte/transition'    
</script>

<div in:fade out:fade="{{duration: 3000, delay: 500}}" class="loader text-xyvid-green inline-block">    
    <i class="fa fa-spinner fa-pulse"></i>
</div>
