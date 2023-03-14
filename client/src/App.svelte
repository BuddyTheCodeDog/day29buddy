<script lang="ts">
    import AllUsers from "./components/AllUsers.svelte";
    import ChangeUsername from "./components/ChangeUsername.svelte";
    import Login from "./components/Login.svelte";
import UserForm from "./components/UserForm.svelte";

let displayForm: number = 0;
function changeDisplay(){
  if(displayForm === 0){
    displayForm = 1;
    return;
  }
  else if(displayForm === 1){
    displayForm = 2;
    return;
  }
  else if(displayForm === 2){
    displayForm = 0;
    return;
  }
}
  
</script>

<main>
  <button on:click={changeDisplay} class="btn btn-active btn-primary">Change Display</button>
  <Login/>
  {#if displayForm === 0}
  <UserForm/>
  {:else if displayForm === 1}
  <AllUsers/>
  {:else if displayForm === 2}
  <ChangeUsername/>
  {/if}
</main>

<style global lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>