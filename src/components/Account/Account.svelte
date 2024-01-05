<script>
    import { onMount } from "svelte";
    import { push } from 'svelte-spa-router'

    // import { AuthSession } from "@supabase/supabase-js";
    import { supabase } from "../../lib/data/supabaseClient";
  
    import { session } from '../..//lib/data/sessionStore';
  
    let loading = false
    let display_name = null
    let color = null
    let avatarUrl = null
    let default_role = null
  
    const loadUser = async () => {
        return await supabase.auth.getUser()
    }

    let userPromise = loadUser()

    onMount(() => {
      getProfile()                 
    })
  
    const getProfile = async () => {
      try {
        loading = true
        const { user } = $session
  
        const { data, error, status } = await supabase
          .from('user_profile')
          .select('display_name, color, default_role, avatar_url')
          .eq('id', user.id)
          .single()
  
        if (error && status !== 406) throw error
  
        if (data) {
          display_name = data.display_name          
          avatarUrl = data.avatar_url
          color = data.color
          default_role = data.default_role
        }
      } catch (error) {
        if (error) {
          alert(error.message)
        }
      } finally {
        loading = false
      }
    }
  
    const updateProfile = async () => {
      try {
        loading = true
        const { user } = $session
  
        const updates = {
          id: user.id,
          display_name: display_name,
          color: color,
          avatar_url: avatarUrl,  
          default_role: default_role        
        }
  
        let { error } = await supabase.from('user_profile').upsert(updates)
  
        if (error) {
          throw error
        }
      } catch (error) {
        if (error) {
          alert(error.message)
        }
      } finally {
        loading = false
      }
    }

    const logout = () => {
        supabase.auth.signOut()
        $session = null
        push('/')
      }
  </script>
  
  
  <div class="flex flex-col justify-center items-center h-screen space-y-10">
    {#await userPromise}
      loading user
    {:then user} 
      <div class="text-3xl">Hello, {display_name}</div>    
      {:catch error}
      Error! {error}
    {/await}
    <form on:submit|preventDefault={updateProfile} class="space-y-3 bg-slate-300 border border-slate-700 rounded-sm p-5">
      <div>Email: {$session.user.email}</div>
      <div>
        <label for="username">Name</label>
        <input id="username" type="text" bind:value={display_name} />
      </div>
      <div>
        <label for="color">My Color</label>
        <input id="color" type="color" bind:value={color} />
        {color}
      </div>
      <div>
        {#if avatarUrl}<img src={avatarUrl} alt="Current Avatar" />{/if}
        <label for="avatarUrl">Avatar URL</label>
        <input id="avatarUrl" type="text" bind:value={avatarUrl} />
      </div>
      <div>
        <label for="default_role">User Role</label>
        <select name="default_role" id="default_role" bind:value={default_role}>
          <option value="1">Admin</option>          
          <option value="2">Host</option>
          <option value="3" selected >Tech Support</option>
        </select>        
      </div>
      <div>
        <button type="submit" class="bg-slate-500" disabled={loading}>
          {loading ? 'Saving ...' : 'Update profile'}
        </button>
      </div>
      <button type="button" class="bg-orange-500" on:click={logout}>
        Sign Out
      </button>
    </form>
    <a href="/" class="text-xyvid-green">Back To Home</a>
  </div>

  <style>
    input {
      background-color: #eee;
      color: #333;
    }

    button {
      border-radius: 3px;
      padding: 3px;
    }
  </style>