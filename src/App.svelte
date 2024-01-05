<script>
// utilities
import { onMount } from 'svelte'
// import { setContext } from 'svelte'
import { supabase } from './lib/data/supabaseClient'
import Router from 'svelte-spa-router'
// import { createBoundary } from 'svelte-error-boundary'

// state
import { session } from './lib/data/sessionStore'
import { user } from './lib/data/userStore'

// components for routes
import Account from './components/Account/Account.svelte'
import Auth from './components/Auth/Auth.svelte'
import Dashboard from './components/Dashboard/Dashboard.svelte'
import Event from './components/Event/Event.svelte'

// other components
// import ApplicationError from './components/shared/errors/ApplicationError.svelte'
// import Loader from './components/shared/Loader.svelte'

// declare routes 
const routes = {
  '/': Dashboard,
  '/event/:id': Event,
  '/account': Account
}

// load user data (including roles)
let loadUser = async () => {
  const { user } = $session
  let response = await supabase
    .from('user_profile')
    .select(`
      id,
      display_name,
      color,
      avatar_url,
      role (
        name
      )
    `)
    .eq('id', user.id)
    .single()
  return response.data
}

// establish auth session
onMount(() => {
  //# does this have to be in onMount? could we just await it and show a loader?
  supabase.auth.getSession().then(({ data }) => {
    if (!data.session) return

    $session = data.session
    
    loadUser().then(data => {      
      $user = data
    })
    
  })

  supabase.auth.onAuthStateChange(async (_event, _session) => {
    if (!_session.access_token) return
    if (!$session || ($session.access_token !== _session.access_token)) {
      $session = _session    
      $user = await loadUser()
    }    
  })
})

// const Boundary = createBoundary(UserError)

// heartbeat experiment
setInterval(async ()=>{
  let dt = new Date()
  console.log('heartbeat -', document.hasFocus(), dt.getSeconds())
  if (document.hasFocus()) {
    const { error } = await supabase
      .from('event_user')
      .update({ heartbeat: 'now()' })
      .eq('user', $user.id)

    if (error) console.error(error)
  }
}, 30000)
</script>

<main>  
  {#if $session && $user}
  <Router {routes}/>
  {:else}
  <Auth />
  {/if}
</main>