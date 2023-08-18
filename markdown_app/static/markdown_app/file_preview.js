var getTitle = () => { return $("#title") }

function getFileAndUpdate() {
    $.ajax({
        method: "GET",
        url: data.FileApiURL,
    })
        .done((res) => {
            getTitle().html(res['title'])
            document.title = res['title'] + " [preview]"
            // check the version and
            if (res['version'] != data.version) {
                data.verSet = res['version']
                var text = data.testEditor.getMarkdown();
                var resText = res['text'].replaceAll("\r", "")
                if (text != resText) {
                    console.log("detecting new file, setting")
                    $("#test-editormd").html("<textarea style='display:none;'></textarea>");
                    data.editorSet = editormd.markdownToHTML("test-editormd", {
                        htmlDecode: "style,script,iframe",  // you can filter tags decode
                        toc: true,
                        tocm: true,    // Using [TOCM]
                        tocContainer: "#custom-toc-container",
                        emoji: true,
                        taskList: true,
                        tex: true,  // 默认不解析
                        flowChart: true,  // 默认不解析
                        sequenceDiagram: true,  // 默认不解析
                        markdown: resText
                    });
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

function edit() {
    location.href = data.FileEditURL;
}

function menu() {
    location.href = data.MenuURL;
}