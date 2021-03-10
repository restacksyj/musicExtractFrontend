<script>
  import Select from "svelte-select";
  let avatar, fileinput;
  let result = "";
  let playlistName = "";
  let src = "/images/silence.png";
  let leftSideItems = [
    { value: "Artist", label: "Artist" },
    { value: "Song", label: "Song" }
  ];

  let separators = [
    { value: "-", label: "-" },
    { value: "=", label: "=" },
    { value: "--", label: "--" }
  ];
  let leftSide = leftSideItems[0].value;
  let separatorValue = separators[0].value;

  const onFileSelected = e => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = e => {
      avatar = e.target.result;
    };
  };

  const removeImage = () => {
    avatar = "";
  };

  async function doPost() {
    // result = "";
    // const blob = await fetch(avatar).then(res => res.blob());

    // const formData = new FormData();

    // formData.append("file", blob);
    // formData.append("leftSide", leftSide);
    // formData.append("separator", separatorValue);
    // formData.append("playlistName", playlistName);

    // const res = await fetch("http://localhost:3000/detectText", {
    //   method: "POST",
    //   body: formData
    // });

    // const json = await res.json();
    // result = JSON.parse(JSON.stringify(json));

    return false;
  }

  function handleSelect(event) {
    const detail = event.detail;
    leftSide = detail.value;
  }

  function handleSelectTwo(event) {
    const details = event.detail;
    separatorValue = details.value;
  }
</script>

<style>
   .themed {
    --itemColor:black;
    --itemIsActiveColor:white;
    --itemIsActiveBG:black;
    --itemHoverBG:rgba(0,0,0,0.1)

  
  }

</style>

<div id="main" class="font-mono flex flex-col h-screen py-10 overflow-x-hidden">

  <div class="themed">
    <form id="form" enctype="multipart/form-data" method="POST">

      <div class="flex justify-center align-center items-center">
        <img
          src="https://i.pinimg.com/originals/72/39/ea/7239ea3bb245c4877a56737e572cdfcd.png"
          alt=""
          class="md:h-96 object-cover md:w-1/3 object-center w-3/4" />

      </div>

      <div class="flex justify-center font-normal">
        <div class="md:w-1/3 underline tracking-tighter w-4/5 ml-4 md:ml-0 ">
          This just looks nice
        </div>
      </div>

      {#if avatar}
        <img src={avatar} alt="d" />
      {:else}
        <!-- <img class="avatar" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt="" />  -->
      {/if}
      <div class="flex justify-center align-center items-center ml-">

        <!-- <div
          class="my-5 md:w-1/5 w-2/5 border border-black bg-black text-white
          text-center focus:outline-black hover:bg-black hover:opacity-90"> -->
        <button
          alt="Upload button"
          class="w-1/2 md:w-1/7 my-5 focus:outline-none hover:bg-black
          hover:opacity-90 border border-black bg-black text-white p-2
          align-center"
          on:click={() => {
            fileinput.click();
          }}>
          Upload Image
        </button>
        <!-- </div> -->
      </div>

      {#if avatar}
        <button on:click|preventDefault={removeImage}>Remove Image</button>
      {/if}

      <div
        class="justify-center align-center items-center lg:space-x-20  md:space-x-12 flex
        flex-col md:flex-row space-y-5 md:space-y-0">
        <div class="md:w-1/7 w-3/4 ">

          <input
            style="display:none"
            type="file"
            accept=".jpg, .jpeg, .png"
            on:change={e => onFileSelected(e)}
            bind:this={fileinput}
            name="file" />
          <p class="underline mb-1 font-bold">What's left?</p>
          <Select
            items={leftSideItems}
            selectedValue={leftSide}
            on:select={handleSelect}
            isClearable={false}
            listAutoWidth={false}
            containerStyles="border: 3px solid black; text-align:
            center;border-radius:0;font-weight:bold;" />
        </div>

        <div class="md:w-1/7 w-3/4 ">
          <p class="underline mb-1 font-bold">Separator</p>
          <Select
            items={separators}
            selectedValue={separatorValue}
            on:select={handleSelectTwo}
            isClearable={false}
            listAutoWidth={false}
            containerStyles="border: 3px solid black; text-align: center;
            border-radius:0;font-weight:bold;font-size:20px;" />
        </div>

      </div>

      <div class="flex justify-center align-center items-center">
        <div class="w-3/4 md:w-1/3">

          <input
            type="text"
            placeholder="Playlist name(optional)"
            name="playlistName"
            id="playlistName"
            bind:value={playlistName}
            class="w-full h-8 border-black p-5 mt-5 mb-5 items-center border-3
            flex-auto" />
        </div>
      </div>

      <div class="flex justify-center align-center items-center">

        <div class="w-1/2 md:w-1/7">

          <button
            type="submit"
            on:click|preventDefault={doPost}
            class="w-full h-12 flex items-center justify-center bg-kinda-green
            text-black font-bold border border-black shadow-offset-black mb-5
            focus:outline-black hover:bg-kinda-green hover:opacity-90 ">
            Generate playlist
          </button>
        </div>
      </div>

      <pre>
        {#if result}
          <a href={result.data.url}>{result.data.name}- {result.data.url}</a>
        {/if}

      </pre>
    </form>

    <!-- <div class="flex justify-center">
      <a href="http://localhost:3000/spotifyLogin">Log in with spotify</a>

    </div> -->

    <!-- {#if result} -->

    <div class="flex-col justify-center">
      <!-- <a href={result.data.url}>{result.data.name}- {result.data.url}</a> -->
      <div class=" w-full md:flex-col">
        <p class="w-4/5 ml-14 md:ml-8 underline text-left md:text-center md:w-2/3 ">Name:</p>
        <p class="text-left w-4/5 md:w-4/5 lg:w-4/5 ml-14 md:ml-0 mb-4 md:text-center ">John Mayer and friends</p>
      </div>

      <div class=" w-full md:w-full">
        <!-- <p class="underline text-left w-4/5 ml-14 md:ml-0 mb-4">Link:</p> -->
        <p class="bg-black text-white font-bold p-2 text-center">
          https://open.spotify.com/dbdbeudeded
        </p>
      </div>

      <!-- <div class="md:w-1/3">
        <p class="pb-2">Name: John Mayer and friends</p>
        <p>
          Link:
          <span class="bg-black text-white font-bold p-2">
            https://open.spotify.com/dbdbeudeded
          </span>
        </p>

      </div> -->

    </div>
    <!-- {/if} -->

  </div>

  <footer class="py-5 h-5">

    <div class="container mx-auto px-6 font-thin">
      <div class=" flex flex-col mb-20 items-center">
        <div class="sm:w-2/3 text-center py-6">
          <p class="text-sm text-black mb-2">
            Made by
            <a href="https://instagram.com/restacksyj" class="underline">
              @restacksyj
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</div>
