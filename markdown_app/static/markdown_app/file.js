// data is the main object in file.html.
var getSuccessAlert = () => { return $("#successAlert") }
var getTitle = () => { return $("#title") }

function preview() {
    location.href = data.previewURL;
}


function submit() {
    var text = data.testEditor.getMarkdown();

    $.ajax({
        method: "POST", url: data.submitURL, headers: { 'X-CSRFToken': data.csrftoken },
        data: { "text": text, "title": getTitle().text(), "id": data.fileID }
    }).done(function (res) {
        getSuccessAlert().addClass("show")
        setTimeout(disableMessage, 2000)
    })
}

function disableMessage() {
    getSuccessAlert().removeClass("show")
}

function getFileAndUpdate() {
    $.ajax({
        method: "GET",
        url: data.FileApiURL,
    })
        .done((res) => {
            // check the version and
            const arrOld = res['user']

            let StringArray = arrOld.map(JSON.stringify)

            let uniqueStringArray = [... new Set(StringArray)]

            let uniqueArray = uniqueStringArray.map(JSON.parse).join(" ; ")

            $("#editingUser").html(uniqueArray)

            getTitle().html(res['title'])

            document.title = res['title']

            if (res['version'] != data.version) {
                data.verSet = res['version']
                var text = data.testEditor.getMarkdown();
                var resText = res['text'].replaceAll("\r", "")
                if (text != resText) {
                    console.log("detecting new file, setting")
                    data.testEditor.setMarkdown(resText)
                }
            }
        })
        .fail((res) => {
            if (res.status == 400) {
                alert("The file has been deleted!")
                location.href = data.MenuURL
            }
        })
}

function menu() {
    location.href = data.MenuURL;
}