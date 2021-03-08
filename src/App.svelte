<script>
import ImageCropper from "./ImageCropper.svelte";
import ImageUploader from "./ImageUploader.svelte";
import Uploader from "./Uploader.svelte"
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

<style>
	main {
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
	}
</style>