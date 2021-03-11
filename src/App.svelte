<script>
// import ImageCropper from "./ImageCropper.svelte";
// import ImageUploader from "./ImageUploader.svelte";
import Uploader from "./Uploader.svelte"
import { SvelteToast } from '@zerodevx/svelte-toast'



const options= {
	progress:0,
	initial:0,
	reversed:true,
	intro: { y:192},
	theme:{
		 '--toastBackground': 'black',
    '--toastColor': 'white',
	'--toastFont':'mono',
	 '--toastContainerTop': 'auto',
  '--toastContainerRight': 'auto',
  '--toastContainerBottom': '20rem',
  '--toastContainerLeft': "calc(50vw - 8rem)",
	
	}

}


// export let name;

// let avatar="";

// const onFileSelected =(e)=>{
//    let image = e.target.files[0];
//             let reader = new FileReader();
//             reader.readAsDataURL(image);
//             reader.onload = e => {
//                   avatar = e.target.result
				 
//             };
// }
</script>

<main>
<!-- <ImageUploader/> -->
<Uploader/>
<SvelteToast {options} />
	<!-- <h1>Hello {name}!</h1> -->
	<!-- <ImageUploader/> -->
	<!-- <p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p> -->
	<!-- <ImageCropper/> -->

	<!-- <button onclick="">Click me</button> -->
	<!-- <input type="file" accept=".jpg, .jpeg, .png" onchange={e=> onFileSelected(e)} />
	{#if avatar!=""}
	<img alt="" src="{avatar}" class="avatar"/>
	<!-- {:else} -->
	<!-- <p>Nothing hwre</p> -->
	
</main>

<style global type="text/postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  /* .btn-active{
	  @apply w-full h-12 flex items-center justify-center bg-kinda-green text-black font-bold border border-black shadow-offset-black mb-5;
  }
  .btn-active:focus{
   @apply outline-black;
  }
  .btn-active:hover{
   @apply opacity-80 bg-kinda-green;
  }
  .btn-disable{
	  @apply w-full h-12 flex items-center justify-center bg-blue-300 text-black font-bold border border-black shadow-offset-black mb-5;
  } */
	/* main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.avatar{
		display:flex;
		height:200px;
		width:200px;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	} */
</style>