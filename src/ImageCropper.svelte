<!-- 
  

 -->


 <script>
  import Cropper from "svelte-easy-crop";
  // import Uploader from "./Uploader.svelte"
 
   export let image;

  let crop = { x: 0, y: 0 };
  let zoom = 1;
  // let image = "https://cdn1-www.dogtime.com/assets/uploads/2011/03/puppy-development.jpg";
</script>

<Cropper {image} bind:crop bind:zoom />