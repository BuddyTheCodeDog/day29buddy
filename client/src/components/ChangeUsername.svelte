<script lang="ts">
    import axios from "axios";

    let uuid:string = "";
    let newUsername:string = "";
    
async function submitNewUsername(){
// const result = await axios.put(`http://localhost:3002/changeuser/${uuid}`,{
//   newUsername: newUsername,
// });

const result = await axios.post("http://localhost:3002/changeuser");
}

</script>

<h2>Change Username</h2>

<div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">To Do</span>
     
    </label>
    <input bind:value={uuid} type="text" placeholder="uuid" class="input input-bordered w-full max-w-xs" />
    <input bind:value={newUsername} type="text" placeholder="newUsername" class="input input-bordered input-primary w-full max-w-xs" />
    <button on:click={async () => submitNewUsername()} class="btn btn-active">Submit</button>
  
  
   
  </div>