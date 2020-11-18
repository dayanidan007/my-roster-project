
const source = $('#teamPlayers-template').html();
const template = Handlebars.compile(source)


const Renderer = () => {
    const input = $("#teamName").val()
    $.get(`/team/${input}`, function (players) {
        let someHTML = template({players})
        $("#viewPlayers").append(someHTML)
    }
    )
}
$("bottun").on("click",Renderer)


