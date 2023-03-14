<script lang="ts">
    import axios from "axios";

    let email:string = "";
    let password:string = "";
    let result = "";
    
    async function loginByEmail(){
  const result = await axios.post(`http://localhost:3002/login`,{
        email: email,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json' // Add this line
        }
      });
      console.log(result.data.token);
      if(result.data.token){
        localStorage.setItem('token', result.data.token);
        
        const result2 = await axios.post("http://localhost:3002/changeuser",null,{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
          
        },
        withCredentials: false
      });
  }
}


</script>

<h2>Login</h2>

<div class="form-control w-full max-w-xs">
    <label class="label">
      <span class="label-text">To Do</span>
     
    </label>
    <input bind:value={email} type="text" placeholder="email" class="input input-bordered w-full max-w-xs" />
    <input bind:value={password} type="text" placeholder="password" class="input input-bordered input-primary w-full max-w-xs" />
    <button on:click={async () => loginByEmail()} class="btn btn-active">Submit</button>
  
  {result}
   
  </div>