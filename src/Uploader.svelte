<script>
    import Select from "svelte-select";
    let avatar, fileinput;
    let result = "";
    let playlistName=""
    // let selectedSide, selectedSep;

    let leftSideItems = [
        { value: "artist", label: "Artist" },
        { value: "song", label: "Song" },
    ];

    let separators = [
        { value: "=", label: "=" },
        { value: "-", label: "-" },
        { value: "--", label: "--" },
    ];
    let leftSide = leftSideItems[0];
    let separatorValue = separators[0];

    const onFileSelected = (e) => {
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
            avatar = e.target.result;
        };
    };

    async function doPost() {
        const blob = await fetch(avatar).then((res) => res.blob());

        const formData = new FormData();
        formData.append("file", blob);
        formData.append("leftSide",leftSide)
        formData.append("separator",separatorValue)
        formData.append("playlistName",playlistName)

        const res = await fetch("http://localhost:3000/detectText", {
            method: "POST",
            body: formData,
        });

        const json = await res.json();
        result = JSON.stringify(json);
        return false;
    }

    function handleSelect(event) {
       
        const detail = event.detail;
        leftSide = detail.value;
    }

    function handleSelectTwo(event) {
        const detail = event.detail;
        separatorValue = detail.value;

    }

</script>

<div id="main">
    <div id="app">
        <form id="form" enctype="multipart/form-data" method="POST">
            <h1>Upload Image</h1>

            {#if avatar}
                <img class="avatar" src={avatar} alt="d" />
            {:else}
                <!-- <img class="avatar" src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png" alt="" />  -->
            {/if}
            <img
                class="upload"
                src="https://static.thenounproject.com/png/625182-200.png"
                alt=""
                on:click={() => {
                    fileinput.click();
                }}
            />

            <div />
            <!-- <div
                class="chan"
                on:click={() => {
                    fileinput.click();
                }}
            >
                Choose Image
            </div> -->

            <input
                style="display:none"
                type="file"
                accept=".jpg, .jpeg, .png"
                on:change={(e) => onFileSelected(e)}
                bind:this={fileinput}
                name="file"
            />
            <p>What's on left</p>
            <Select
                items={leftSideItems}
                selectedValue={leftSide}
                on:select={handleSelect}
                isClearable={false}
                showIndicator={true}
                listAutoWidth={false}
            />
            <p>What's separator</p>
            <Select
                items={separators}
                selectedValue={separatorValue}
                on:select={handleSelectTwo}
                isClearable={false}
                showIndicator={true}
                listAutoWidth={false}
            />
            <div class="empty" />
            <label for="playlistName">Playlist Name </label>
            <input
                type="text"
                placeholder="(Optional)"
                name="playlistName"
                id="playlistName"
                bind:value={playlistName}
            />

            <div />
            <button type="submit" on:click|preventDefault={doPost}>
                Generate playlist</button
            >
            <pre>
{result}
</pre>
        </form>

        <a href="http://localhost:3000/spotifyLogin">Log in with spotify</a>
    </div>
</div>

<style>
    /* 
    html{
        height:100% ;
    } */
    :global(body) {
        background-image: url("https://besthqwallpapers.com/Temp/8-3-2021/4k-old-paper-texture-close-up-brown-paper-paper-backgrounds-besthqwallpapers.com-1680x1050.jpg");
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
    #app {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;
        overflow: hidden;
    }

    .empty {
        padding-bottom: 35px;
    }

    .upload {
        display: block;
        height: 50px;
        width: 50px;
        cursor: pointer;
    }
    .avatar {
        /* display: flex; */
        height: 200px;
        width: 200px;
    }

    #form {
        display: block !important;
    }
</style>
