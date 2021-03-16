<script>

  import Uploader from "./Uploader.svelte";
  import Notifications from 'svelte-notifications';


</script>

<style global type="text/postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>

<main>
<Notifications>
<Uploader />
  
</Notifications>
  

</main>
