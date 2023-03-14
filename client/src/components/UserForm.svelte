<script lang="ts">

  import axios from "axios";

  let username:string;
  let email:string;
  let password: string;
   
  async function submitUserForm(){
      const result = await axios.post("http://localhost:3002/test",{
      username: username,
      email: email,
      password: password
    });
  }
  
</script>




<h2>My User Form</h2>

<div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">To Do</span>
     
    </label>
    <input bind:value={username} type="text" placeholder="Username" class="input input-bordered w-full max-w-xs" />
    <input bind:value={email} type="text" placeholder="Email" class="input input-bordered input-primary w-full max-w-xs" />
    <input bind:value={password} type="text" placeholder="Password" class="input input-bordered input-primary w-full max-w-xs" />
    <button on:click={async () => submitUserForm()} class="btn btn-active">Submit</button>
  
  
   
  </div>


  <button class="btn btn-active">Button</button>
<button class="btn btn-active btn-primary">Button</button>
<button class="btn btn-active btn-secondary">Button</button>
<button class="btn btn-active btn-accent">Button</button>
<button class="btn btn-active btn-ghost">Button</button>
<button class="btn btn-active btn-link">Button</button>

