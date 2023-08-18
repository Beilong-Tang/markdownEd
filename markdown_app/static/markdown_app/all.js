var getCreateFileName = () => { return $("#filename").val() }
var getAllFile = () => { return $("#allFile") }

function addFile() {
    var filename = getCreateFileName()

    if (confirm("Are you sure you want to create a file called " + filename)) {
        if (filename == "") {
            alert("Please input File Name");
            return
        }
        // create a file
        $.ajax({
            method: "POST", url: data.createFileURL, headers: { 'X-CSRFToken': data.csrftoken },
            data: { "title": getCreateFileName() }
        }).done(function (res) {
            console.log(filename + " succesfully created")
            location.reload()

        }).fail(function (res) {
            if (res.status == 400) {
                alert("File Create Error: There already exists the file.")
            }
        })


    }
}

function setNameToCookie() {
    var cname = "name"
    var cvalue = document.getElementById("name").value
    var exdays = 500;
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
    alert("name changed succesfully")
}

function getNameFromCookie() {
    var cname = "name"
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "annoynomous";
}

function updateEditingUser() {
    $.ajax({
        method: "GET",
        url: data.userAPI,
    })
        .done((res) => {
            // check the version and
            const arrOld = res['users']

            let StringArray = arrOld.map(JSON.stringify)

            let uniqueStringArray = [... new Set(StringArray)]

            let uniqueArray = uniqueStringArray.map(JSON.parse)
            console.log(uniqueArray)
            // console.log(arr);
            console.log($(".file"))
            $(".file").each(function (i) {
                var id = this.id
                $("#" + this.id).html("")
                for (var j = 0; j < uniqueArray.length; j++) {
                    console.log(id)
                    console.log(uniqueArray[j][1] + "")
                    if (id.replace("file", "") == uniqueArray[j][1] + "") {
                        $("#" + this.id).append(uniqueArray[j][0] + " ; ")
                    }
                }
            })
        })
}

function changeName(fileID) {
    let fileName = prompt("Please enter the file name:", "");
    if (fileName == "" || fileName == null) {
        // doing nothing
        return;
    }
    let url = data.changeFileURL;
    console.log(url);
    url += `?title=${fileName}&id=${fileID}`
    $.ajax({
        method: "GET",
        url: url,
    })
        .done((res) => {
            // check the version and
            location.reload();
        })
        .fail(function (res) {
            console.log(res)
            if (res.status == 400) {
                alert("file already exists")
            }
        })

}

function deleteFile(fileID) {
    let url = data.deleteFileURL
    url += `?id=${fileID}`
    $.ajax({
        method: "GET",
        url: url,
    })
        .done((res) => {
            // check the version and
            location.reload();
        })
}
