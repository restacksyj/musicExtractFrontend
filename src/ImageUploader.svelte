<script>
import FilePond, { registerPlugin, supported } from 'svelte-filepond';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation);

// a reference to the component, used to call FilePond methods
let pond;

console.log(pond)

// pond.setOptions({
// 	stylePanelLayout:"compact"
// })

// pond.getFiles() will return the active files

// the name to use for the internal file input
let name = 'filepond';

// handle filepond events
function handleInit() {
	console.log('FilePond has initialised');
}

function handleAddFile(err, fileItem) {
	console.log('A file has been added', fileItem);
	console.log(fileItem.getMetadata("resize"))
}
</script>

<div class="app">

	<FilePond bind:this={pond} {name}
		allowMultiple={false}
		oninit={handleInit}
		onaddfile={handleAddFile}
        allowProcess={false}
        allowReorder={false}
		maxFiles=1
		labelIdle="Upload here"
		stylePanelLayout="compact"
		credits=[]
		itemInsertLocationFreedom={false}
		
        />
	
</div>

<style global>
@import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
/* .stylePanelLayout{

} */
</style>