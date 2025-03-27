var recordsPerPage = 3;
var page = 1;
page = (page === 0) ? 1 : page;
var start = 0;
getSongs();
searchSongs();
function searchSongs() {
    var formSearch = $("#formSearch"),
            inputSearch = $("#inputSearch"),
            btnSearch = $("#btnSearch");
    formSearch.on("submit", function() {
        page = 1;
        start = 0;
        getSongs();
        return false;
    });
    $("body").on("click", ".pagging_js a", function(e) {
        e.preventDefault();
        var self = $(this),
                selfPage = self.data("page");

        if (selfPage === "prev") {
            prev();
        } else if (selfPage === "next") {
            next();
        } else {
            goTo(selfPage);
        }
    });
}
function goTo(pag) {
    page = pag * 1;
    getSongs();
    //console.log(page);
}
function next() {
    page++;
    getSongs();
}
function prev() {
    page--;
    getSongs();
}

function createPagging(total) {
    var pagination = "",
            prev = page - 1,
            next = page + 1,
            lastPage = Math.ceil(total / recordsPerPage);
    $(".pagging_js").html("").empty();
    if (total > recordsPerPage) {

        if (lastPage > 1) {
            if (page > 1) {
                pagination += '<li><a href="javascript:void(0);" class="prev" data-page="prev">Previo</a></li>';
            } else {
                pagination += '<li><span class="prev">Previo</span></li>';
            }
        }
        for (var i = 0; i < lastPage; i++) {
            if (i === page - 1) {
                pagination += '<li><a href="javascript:void(0);" data-page="' + (i * 1 + 1) + '" class="active">' + (i * 1 + 1) + ' Active</a></li>';
            } else {
                pagination += '<li><a href="javascript:void(0);" data-page="' + (i * 1 + 1) + '" >' + (i * 1 + 1) + '</a></li>';
            }
        }
        if (lastPage > 1) {
            if (page < lastPage) {
                pagination += '<li><a href="javascript:void(0);" data-page="next" class="next">Next</a></li>';
            } else {
                pagination += '<li><span class="next">Next</span></li>';
            }
        }

        $(".pagging_js").append(pagination);
    }
}

function getSongs() {

    start = (page - 1) * recordsPerPage;
    $("#content").html("");
    var inputSearch = $("#inputSearch").val();
    $.get("repertorio.xml", function(d) {
        var output = '',
                total = 0,
                output_arr = [];
        $(d).find("song").each(function(i) {
            var book = $(this),
                    title = book.attr("title"),
                    titleHtml = '<h3>' + title + '</h3>',
                    author = book.attr("author"),
                    fileName = book.attr("fileName"),
                    thumb = book.attr("thumb"),
                    thumbHtml = '<img src="' + thumb + '" width="65">',
                    regInputSearch = (inputSearch !== "") ? new RegExp(inputSearch, "i") : "";
            if (title.search(regInputSearch) > -1 || author.search(regInputSearch) > -1) {

                total++;
                output_arr.push('<div class="repertorio ">' +
                        '<div class="display-table container">' +
                        '<div class="img display-table-cell vertical_top">' +
                        thumbHtml +
                        '</div>' +
                        '<div class="txt display-table-cell w_display-inline vertical_top">' +
                        '<div class="contenido">' +
                        '<h3>' + titleHtml + '</h3>' +
                        '<p class="title">Autor: ' + author + '</p>' +
                        '</div>' +
                        '</div>' +
                        '<div class="reproductor display-table-cell vertical_top">' +
                        '<div class="w_reproductor">' +
                        '<div class="players">' +
                        '<div id="jp_container_2" class="jp-audio">' +
                        '<div class="jp-type-single">' +
                        '<div id="jquery_jplayer_2" class="jp-jplayer"></div>' +
                        '<div id="jp_interface_2" class="jp-interface">' +
                        '<div class="jp-controls">' +
                        '<div class="display-table">' +
                        '<div class="display-table-cell">' +
                        '<a href="javascript:;" class="jp-play align_center" tabindex="1">' +
                        '<i class="icon-play_pause"></i>' +
                        '</a>' +
                        '</div>' +
                        '<div class="display-table-cell">' +
                        '<div class="jp-pause align_center" tabindex="1">' +
                        '<i class="icon-play_pause"></i>' +
                        '</div>' +
                        '</div>' +
                        '<div class="display-table-cell">' +
                        '<a href="javascript:;" class="jp-stop" tabindex="1">' +
                        '<span></span>' +
                        '</a>' +
                        '</div>' +
                        '<div class="display-table-cell ">' +
                        '<div class="jp-progress">' +
                        '<div class="jp-seek-bar">' +
                        '<div class="jp-play-bar"></div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="display-table-cell">' +
                        '<div class="jp-mute align_center" tabindex="1" title="mute">' +
                        '<i class="icon-unmute"></i>' +
                        '</div>' +
                        '</div>' +
                        '<div class="display-table-cell">' +
                        '<div class="jp-unmute align_center" tabindex="1" title="unmute">' +
                        '<i class="icon-volume"></i>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                        );
            }
        });
        for (var i = 0; i < total; i++) {
            if (i >= start && i < (start + recordsPerPage)) {
                output += output_arr[i];
            }
        }

        $("#content").append(output);
        createPagging(total);
    }
    );
}