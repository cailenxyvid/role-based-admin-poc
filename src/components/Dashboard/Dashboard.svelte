<script>
  import RoleBasedView from "../shared/RoleBasedView.svelte"
  import ApplicationNavigation from "../shared/ApplicationNavigation.svelte"

  // role based wrapper components
  import admin from "./roles/admin.svelte"
  import tech_support from "./roles/tech_support.svelte"

  // inner view components
  import EventCalendar from "./components/EventCalendar.svelte"
  import Home from "./components/Home.svelte"

  let availableRoles = {
    'admin': {
      wrapper: admin,
      views: {
        EventCalendar: {
          component: EventCalendar
        },
        Home: {
          component: Home
        }
      }
    },
    'tech_support': {
      wrapper: tech_support,
      views: {        
        Home: {
          component: Home
        }
      }
    }
  }

</script>
<ApplicationNavigation />
<RoleBasedView {availableRoles} />