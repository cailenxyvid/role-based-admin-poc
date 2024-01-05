<script>    
    // import components 
    import AsyncButton from "../../../shared/AsyncButton.svelte"

    // action (event) handlers
    export let setViewState
    
    // component props
    export let state;
    export let currentState
</script>


<AsyncButton action={setViewState} value={state} active={(state == currentState) ? true : false}>{state}</AsyncButton>