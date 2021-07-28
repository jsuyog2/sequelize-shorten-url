getData()
if (getUrlVars().error == 1) {
    var myModal = new bootstrap.Modal(document.getElementById('errorModel'))
    var queryParams = new URLSearchParams(window.location.search);
    queryParams.set("error", "0");
    history.replaceState(null, null, "?");
    myModal.show()
}

function getData() {
    $("tbody").empty();
    $.ajax({
        type: "GET",
        url: "/getUrls",
        async: false,
        success: function (data) {
            if (data.statusCode !== 500) {
                data.forEach(function (sUrls) {
                    $("tbody").prepend(`<tr>
                    <th><a href="${sUrls.short_url}" target="_blank">${sUrls.full_url}</a>
                    </th>
                    <td class="KeyClick"><a href="${sUrls.short_url}" target="_blank">${sUrls.short_url}</a></td>
                    <td>${sUrls.clicks}</td>
                </tr>`)
                });
            }
        }
    });
}
$("#submit").click(function (e) {
    $("#message").empty();
    var url = $("#fullUrl").val();
    var key = $("#shortUrl").val();
    if (!validURL(url)) {
        $("#message").html("Please enter vaild url");
    }
    if (url === "") {
        $("#message").html("Please enter url");
    }
    var data = {
        url: url
    }
    if (key !== "") {
        data["key"] = key;
    }
    $.ajax({
        type: "POST",
        url: "/add_data",
        async: false,
        data: data,
        success: function (data) {
            switch (data.statusCode) {
                case 500:
                    $("#message").html(data.error);
                    break;
                case 200:
                    $("tbody").prepend(`<tr>
                            <th><a href="${data.key}" target="_blank">${data.url}</a>
                             </th>
                             <td class="KeyClick"><a href="${data.key}" target="_blank">${data.key}</a></td>
                             <td>0</td>
                             </tr>`)
                    break;
            }

        }
    });
});

$("#search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("tbody tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});


function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

function getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}