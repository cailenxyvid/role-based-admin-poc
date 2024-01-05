<script>
    import { supabase } from '../../lib/data/supabaseClient'
  
    let loading = false
    let email = ''
  
    const handleGoogleLogin = async () => {
      try {
        loading = true
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        })
        if (error) throw error
        console.log("Redirecting for Google SSO")
      } catch (error) {
        if (error) {
          alert(error.message)
        }
      } finally {
        loading = false
      }
    }

    const handleLogin = async () => {
      try {
        loading = true
        const { error } = await supabase.auth.signInWithOtp({ email })
        if (error) throw error
        alert('Check your email for login link!')
      } catch (error) {
        if (error) {
          alert(error.message)
        }
      } finally {
        loading = false
      }
    }
  </script>
  
  <div class="flex flex-col justify-center items-center h-screen space-y-1">
    <div class="text-xl bg-slate-500 p-3 rounded-md space-y-6" aria-live="polite">
      <h1 class="text text-3xl">Login</h1>
      <p class="description">Sign in via magic link with your email below</p>
      <form class="form-widget space-y-2" on:submit|preventDefault="{handleLogin}">
        <div>
          <label for="email">Email</label>
          <input
            id="email"
            class="inputField"
            type="email"
            placeholder="Your email"
            bind:value="{email}"
          />
        </div>
        <div>
          <button
            type="submit"
            class="rounded-md text-white bg-green-700 p-1 border"
            aria-live="polite"
            disabled="{loading}"
          >
            <span>{loading ? 'Loading' : 'Send magic link'}</span>
          </button>
        </div>
      </form>
      Or Login with
      <button class="bg-blue-700 text-white border p-1 rounded-md" on:click={handleGoogleLogin}>Google</button>
    </div>
  </div>