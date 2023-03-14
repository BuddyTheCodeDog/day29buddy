<script lang="ts">
    import AllUsers from "./pages/AllUsers.svelte";
    import ChangeUsername from "./pages/ChangeUsername.svelte";
    import Home from "./pages/Home.svelte";
    import Login from "./pages/Login.svelte";
    import Register from "./pages/Register.svelte";
    import Router, { push } from "svelte-spa-router";


 

 const routes = {
  "/": Home,
  "/login": Login,
  "/register": Register,
  "/allusers": AllUsers,
  "/changeusername": ChangeUsername
 }
  
</script>

<main>
  <navbar>my nav bar
    <br />
    <br />
    <br />
  <button on:click={async () => await push("/")} class="btn btn-active btn-primary">Home</button>
  <button on:click={async () => await push("/login")} class="btn btn-active btn-primary">Login</button>
  <button on:click={async () => await push("/register")} class="btn btn-active btn-primary">Register</button>
  <button on:click={async () => await push("/allusers")} class="btn btn-active btn-primary">All Users</button>
  <button on:click={async () => await push("/changeusername")} class="btn btn-active btn-primary">Change Username</button>
</navbar>
<br />
<br />
<br />
 <Router {routes} />
 <footer>Footer goes here</footer>
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>