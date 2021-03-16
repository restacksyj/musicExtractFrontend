<script>
  import Select from "svelte-select";
  import { Pulse } from "svelte-loading-spinners";
  import { getContext } from "svelte";
  import { getNotificationsContext } from "svelte-notifications";

  const { addNotification } = getNotificationsContext();

  let avatar;
  let fileinput;
  let images = [];
  let result = "";
  let playlistName = "";

  let state = "none";

  let src =
    "https://i.pinimg.com/originals/72/39/ea/7239ea3bb245c4877a56737e572cdfcd.png";

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
  let active = false;
  const spotifyLogin = globalThis.SPOTIFY_LOGIN_URL;

  const changeUploadStatus = status => (state = status);

  const onFileSelected = e => {
    if (e.target.value.length !== 0) {
      images = [];
      let image = e.target.files[0];
      images.push(image.name);
      state = "present";
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e => {
        avatar = e.target.result;
      };
    }
  };

  const removeImage = () => {
    avatar = "";
    images = [];
  };

  async function doPost() {
    console.log(images.length);
    console.log(avatar);

    if (images.length == 1 && avatar !== "") {
      active = true;
      result = "";
      const blob = await fetch(avatar).then(res => res.blob());

      const formData = new FormData();

      formData.append("file", blob);
      formData.append("leftSide", leftSide);
      formData.append("separator", separatorValue);
      formData.append("playlistName", playlistName);

      try {
        const res = await fetch(globalThis.API_URL, {
          method: "POST",
          body: formData
        });
        const json = await res.json();
        const parsedJson = JSON.parse(JSON.stringify(json));
        if (parsedJson.error) {
          active = false;
          addNotification({
            text: `It's ${parsedJson.code} :( ${parsedJson.error}`,
            position: "bottom-center",
            removeAfter: 1500,
            type: "danger"
          });
         
        } else {
          active = false;
          console.log(result);
          result = parsedJson;
          addNotification({
            text: "Done! Link below",
            position: "bottom-center",
            removeAfter: 1500,
            type: "success"
          });
        }
      } catch (e) {
        active = false;
        addNotification({
          text: "Shhhh..something went wrong",
          position: "bottom-center",
          removeAfter: 1500,
          type: "danger"
        });
      }

      return false;
    } else {
      addNotification({
        text: "Duhh,I need image",
        position: "bottom-center",
        removeAfter: 1500,
        type: "danger"
      });
    }
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
    --itemColor: black;
    --itemIsActiveColor: white;
    --itemIsActiveBG: black;
    --itemHoverBG: rgba(0, 0, 0, 0.1);
    --indicatorColor: white;
    --itemActiveBackground: rgba(0, 0, 0, 0.1);
  }

  .btn-active {
    @apply w-full h-12 flex items-center justify-center bg-kinda-green text-black font-bold border border-black shadow-offset-black mb-5;
  }
  .btn-active:focus {
    @apply outline-black;
  }
  .btn-active:hover {
    @apply opacity-90 bg-kinda-green;
  }

  #uploadBtn {
    pointer-events: none;
  }
  #removeBtn {
    pointer-events: none;
  }
</style>

<div id="main" class="font-mono flex flex-col h-screen py-10 overflow-x-hidden">

  <div class="themed">
    <form id="form" enctype="multipart/form-data" method="POST">

      {#if avatar}
        <div class="flex justify-center align-center items-center">
          <img
            src={avatar}
            alt=""
            class="md:h-96 object-cover md:w-1/3 object-center w-3/4 border-3
            border-black" />

        </div>

        <div class="flex justify-center font-normal">
          <div
            id={active ? 'removeBtn' : ''}
            disabled={active}
            on:click|preventDefault={removeImage}
            class="md:w-1/3 line-through tracking-tighter w-4/5 ml-5 md:ml-0
            cursor-pointer">
            Remove
          </div>
        </div>
      {:else}
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
      {/if}
      <div class="flex justify-center align-center items-center ml-">

        <div
          id={active ? 'uploadBtn' : ''}
          alt="Upload button"
          class="w-1/2 md:w-1/7 my-5 focus:outline-none hover:bg-black
          hover:opacity-90 border border-black bg-black text-white p-2
          align-center text-center cursor-pointer"
          disabled={active}
          on:click={() => {
            fileinput.click();
          }}>
          Upload Image
        </div>

      </div>

      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        on:change={e => onFileSelected(e)}
        class="invisible w-0 h-0 block"
        bind:this={fileinput} />

      <div
        class="justify-center align-center items-center lg:space-x-20
        md:space-x-12 flex flex-col md:flex-row space-y-5 md:space-y-0">
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
            showIndicator={false}
            isSearchable={false}
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
            showIndicator={false}
            items={separators}
            isSearchable={false}
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
            class="w-full h-8 border-black px-4 py-5 mt-5 mb-5 items-center
            border-3 flex-auto focus:outline-none focus:ring focus:ring-black
            focus:border-transparent" />
        </div>
      </div>

      <div class="flex justify-center align-center items-center">

        <div class="w-1/2 md:w-1/7">

          <button
            disabled={active}
            type="submit"
            on:click|preventDefault={doPost}
            class="btn-active">
            {#if active}
              <Pulse color="#000000" />
            {:else}Generate playlist{/if}
          </button>
        </div>
      </div>

    </form>

    <div class="flex justify-center">
      <a class="md:mb-6 mb-4" href={spotifyLogin}>Log in with spotify</a>

    </div>

    {#if result.data}
      <div class="flex-col justify-center">

        <div class=" w-full md:flex-col">

          <p
            class="w-4/5 ml-14 md:ml-8 underline text-left md:text-center
            md:w-2/3 ">
            Name:
          </p>
          <p
            class="text-left w-4/5 md:w-4/5 lg:w-4/5 ml-14 md:ml-0 mb-4
            md:text-center ">
            {result.data.name}
          </p>

        </div>

        <div class=" w-full md:w-full">
          <p class="bg-black text-white font-bold p-2 text-center">

            <a href={result.data.url}>{result.data.url}</a>

          </p>
        </div>

      </div>
    {/if}

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
