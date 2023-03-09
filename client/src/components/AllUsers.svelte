<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";

    let users = [];
    let i = 1;

    async function getAllUsers(){

        const result = await axios.get("http://localhost:3002/test");
        return result.data;
    }

    onMount(async function() {
        users = await getAllUsers();
        users.forEach(users => {

            console.log(users.username)
        });

    });




</script>

{#each users as user}
{user.username}
<br/>
{/each}

