$(document).ready(function () {
  if (location.search.indexOf("path=Especialista") != -1) {
    abreModalEspecialista();
  }

  $("a.link-ri").each(function () {
    $(this).attr("href", "javascript:");
    $(this).attr("onclick", "javascript:abreModalEspecialista();");
  });

  $("a").each(function () {
    var link = $(this);
    var urlLink = $(this).attr("href");
    if (typeof link.attr("href") != "undefined") {
      if (
        link.attr("href").indexOf("/Download/") > -1 ||
        link.attr("href").indexOf("download.aspx") > -1 ||
        link.attr("href").indexOf("Download.aspx") > -1
      ) {
        var descricao = link.text().trim();
        link.attr("target", "_blank");

        if (descricao == "") {
          descricao = urlLink.split("download.aspx?")[1];
        }

        var url = window.location.href;

        if (url.toLowerCase().indexOf("/listresultados.aspx") > -1) {
          var ano = $(this).parents("div[id*=divResultados]").attr("ano");
          if (ano != undefined) {
            var idLink = $(this).attr("id");
            descricao = idLink.split("_")[4];

            if ($(".hidLinguagem").val() == "ptg") {
              link.attr(
                "onClick",
                "gtag('event', 'link', {'event_label': '" +
                  descricao +
                  "_PT_" +
                  ano +
                  "'});"
              );
            } else {
              link.attr(
                "onClick",
                "gtag('event', 'link', {'event_label': '" +
                  descricao +
                  "_EN_" +
                  ano +
                  "'});"
              );
            }
          }
        } else {
          link.attr(
            "onClick",
            "gtag('event', 'link', {'event_label': '" + descricao + "'});"
          );
        }
      }
    }
  });

  // Busca
  $(".inputBusca").keypress(function (event) {
    event = event || window.event;

    if (event.keyCode == "13") {
      Buscar();

      event.preventDefault();
    }
  });

  $(".inputBuscaMobile").keypress(function (event) {
    event = event || window.event;

    if (event.keyCode == "13") {
      BuscarMobile();

      event.preventDefault();
    }
  });

  $(".inputOk").click(function () {
    Buscar();
    event.preventDefault();
  });

  $(".inputOkMobile").click(function () {
    BuscarMobile();
    event.preventDefault();
  });

  var access_theme = "light";

  if (localStorage.getItem("access_theme")) {
    access_theme = localStorage.getItem("access_theme");
    accessApplyTheme(access_theme);
  }

  $(".icon-contraste").on("click", function (e) {
    if (access_theme == "light") {
      access_theme = "dark";
    } else {
      access_theme = "light";
    }
    accessApplyTheme(access_theme);
  });

  if ($(".hidLinguagem").val() == "ptg") {
    $(".trocaLinguagem").html('<img src="images/icon_BR.png" alt="" /> PT');
  } else {
    $(".trocaLinguagem").html('<img src="images/icon_EN.png" alt="" /> EN');
  }

  var cookiePoliticas = localStorage.getItem("cookiePoliticas");

  if (cookiePoliticas == null) {
    $(".box-cookies").attr("style", "display:block");
  }

  if ($("#hdnDefault").val() == "1" && $("div#Lbanner").length > 0) {
    $("div.alerta").attr("style", "display:block");
    $("body").attr("style", "max-height: 100vh;overflow-y: hidden;");
  }

  $("a.btn-fechar").on("click", function (e) {
    $("div.alerta").hide();
    $("body").attr("style", "");
  });

  if ($("#hdnDefault").val() == "1") {
    $("div.storiesHome").attr("style", "display:block");
  }

  $(".inside-footer a").each(function () {
    if ($(this).attr("href") === "#") {
      $(this).remove();
    }
  });

  $("a#menu-item-2").parent().find("ul").addClass("second-dropdown");

  $("ul.second-dropdown li.item").each(function () {
    var menu = $(this).find("a").text().toLowerCase();

    if (menu.indexOf("website") != -1) {
      $(this).prepend('<img src="images/icons/website-logo.png" alt="site">');
    } else if (menu.indexOf("meetings") != -1) {
      $(this).prepend(
        '<img src="images/icons/meetings-logo.png" alt="Meetings">'
      );
    } else if (menu.indexOf("irm") != -1) {
      $(this).prepend('<img src="images/icons/logo-irm.png" alt="IRM">');
    } else if (menu.indexOf("awareness") != -1) {
      $(this).prepend('<img src="images/icons/logo-awa.png" alt="Awareness">');
    } else if (
      menu.indexOf("consultoria") != -1 ||
      menu.indexOf("consultancy") != -1
    ) {
      $(this).prepend(
        '<img src="images/icons/logo-consult.png" alt="Consultoria">'
      );
    } else if (menu.indexOf("outros") != -1 || menu.indexOf("others") != -1) {
      $(this).prepend(
        '<img src="images/icons/icon-menu-outros.png" alt="Outros Serviços">'
      );
    }
  });
});

function preencheAlertas() {
  var email = $("input[id*=alertaemail]").val();
  var filter =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  if (filter.test(email)) {
    var emailContato = "&email=" + $("input[id*=alertaemail]").val();

    if ($(".hidLinguagem").val() == "ptg") {
      window.location =
        window.location.origin +
        "/Alertas.aspx?IdCanal=O5pIatW4++oC+UDLo8azag==&" +
        emailContato +
        "&linguagem=pt";
    } else {
      window.location =
        window.location.origin +
        "/Alertas.aspx?IdCanal=O5pIatW4++oC+UDLo8azag==&" +
        emailContato +
        "&linguagem=en";
    }
  } else if (!filter.test(email)) {
    if ($(".hidLinguagem").val() == "ptg") {
      alert("E-mail Inválido!");
    } else {
      alert("Invalid E-mail!");
    }
  }
}

function abreModalEspecialista() {
  $.post("FaleEspecialista.aspx", function (data) {
    $("#especialistaModal").html(data);
    $("#faleEspecialista").modal("show");
    $("#especialistaModal").show();
    activeInputsFocus();
  });
}

function captcha_onclick() {
  document.getElementById("recaptchaValidator").value = "verdadeiro";
}

function EnviarEspecialista() {
  var valorRecaptcha = $("#recaptchaValidator").val();
  if (valorRecaptcha == "") {
    if ($(".hidLinguagem").val() == "ptg") {
      alert("Marque a caixa de seleção!");
    } else {
      alert("Select the checkbox!");
    }
    return false;
  }

  $.post(
    "FaleEspecialista.aspx?email=" +
      $("#meuEmail").val() +
      "&nome=" +
      $("#TxtNome").val() +
      "&telefone=" +
      $("#TxtTelefone").val() +
      "&mensagem=" +
      $("#TxtMensagem").val(),
    function (data) {
      var args = data.split(";");
      if (args[0] == "0") {
        $("#LblMsgCadastro").text(args[1]);
      }
      if (args[0] == "1") {
        if (args[1] == "") {
          window.location = "Default.aspx";
        } else {
          if ($(".hidLinguagem").val() == "ptg") {
            alert("Sua mensagem foi enviada com sucesso.");
          } else {
            alert("Your message has been sent successfully.");
          }

          window.location = args[1];
        }
      }
    }
  );
}

// Ativar o focus personalizado dos inputs

function activeInputsFocus() {
  const inputs = document.querySelectorAll(
    ".div-input input, .div-input select, .div-input textarea"
  );

  inputs.forEach((input) => {
    input.addEventListener("focus", (e) => {
      input.parentNode.classList.add("focus");
    });
    input.addEventListener("blur", (e) => {
      if (input.value == "") {
        input.parentNode.classList.remove("focus");
      }
    });
  });
}

// Contraste
function accessApplyTheme(theme) {
  localStorage.setItem("access_theme", theme);

  if (theme == "dark") {
    $("body").attr("data-theme", "dark");
  } else {
    $("body").attr("data-theme", "light");
  }
}

// function accessApplyFont(size) {
//   localStorage.setItem("access_font_size", size);
//   var size_px = 100 + Number(size) + "% !important";
//   $("html").attr("style", "font-size:" + size_px);
// }

// var access_font_size = 0;

// if (localStorage.getItem("access_font_size")) {
//   access_font_size = Number(localStorage.getItem("access_font_size"));
//   accessApplyFont(access_font_size);
// }

// $(".icon-aumentar-fonte").on("click", function (e) {
//   e.preventDefault();
//   if (access_font_size < 25) {
//     access_font_size += 6.25;
//     accessApplyFont(access_font_size);
//   }
// });

// $(".icon-diminuir-fonte").on("click", function (e) {
//   e.preventDefault();
//   if (access_font_size > 0) {
//     access_font_size -= 6.25;
//     accessApplyFont(access_font_size);
//   }
// });

var increaseCount = 0;
var decreaseCount = 0;

function accessApplyFont(size) {
  var currentSize = parseFloat($("html").css("font-size"));
  var newSize = currentSize + size;
  $("html").css("font-size", newSize + "px");
  $("html *").css("font-size", function (index, fontSize) {
    var currentFontSize = parseFloat(fontSize);
    return currentFontSize + size + "px";
  });
  localStorage.setItem("access_font_size", newSize);
}

var access_font_size = 0;

if (localStorage.getItem("access_font_size")) {
  access_font_size = Number(localStorage.getItem("access_font_size"));
  accessApplyFont(0);
}

$(".icon-aumentar-fonte").on("click", function (e) {
  e.preventDefault();
  if (increaseCount < 10) {
    increaseCount++;
    accessApplyFont(1);
  }
});

$(".icon-diminuir-fonte").on("click", function (e) {
  e.preventDefault();
  if (decreaseCount < 10) {
    decreaseCount++;
    accessApplyFont(-1);
  }
});

function setCookie() {
  localStorage.setItem("cookiePoliticas", "prisma");
  $(".box-cookies").attr("style", "display:none");
}

function Buscar() {
  var buscada = $(".inputBusca").val().replace(/"/g, "");
  window.location = "ListaBusca.aspx?busca=" + buscada;
}

function BuscarMobile() {
  var buscada = $(".inputBuscaMobile").val().replace(/"/g, "");
  window.location = "ListaBusca.aspx?busca=" + buscada;
}

function irParaTopo() {
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    "slow"
  );
}

function retornoCallback(arg) {
  var args = arg.split(";");

  switch (args[0]) {
    case "impressao": {
      executaImpressao(args[1]);
      break;
    }
    case "buscarShow": {
      alert(args[1]);
      break;
    }
    case "email": {
      if (args[1] == "success") {
        alert(args[2]);
        fechaBoxEmail();
      } else alert(args[2]);
      break;
    }
    case "novaDescricaoTriResponse":
      exibirNovaDescricao(args[1], args[2]);
      break;
    case "lembreteAgenda":
      var alertagenda = $("input[id$=MsgLembreteAgenda]").val();
      limparCamposAgenda();
      alert(alertagenda);
      break;
    case "paginarResponse":
      efetuarPaginacaoResponse(args[1], args[2]);
      break;
    case "alerta": {
      var alertari = $("input[id$=MsgSucessoRi]").val();
      alert(alertari);
      fechaBoxAlerta();
      limpaModal();
      break;
    }
    case "alertaContatoExiste": {
      var mensagem = unescape(args[1]);
      eval(mensagem);
      fechaBoxAlerta();
      limpaModal();
      $("body").removeClass();
      break;
    }
    case "EventosAnteriores": {
      carregarEventosAnteriores(args);
      break;
    }
    case "EventosProximos": {
      carregarEventosProximos(args);
      break;
    }
    case "paginarcalendarioresponsive": {
      montaEventosCalendario(args[1]);
      mostraEventosDoDiaSelecionadoPosMudancaMes();
      break;
    }
    case "captchaIvalido": {
      var textoAlerta = $("input[id$=MsgErroCaptcha]").val();
      alert(textoAlerta);
      break;
    }
    default:
      break;
  }
}

function erroCallback(err) {
  alert("erro:" + err);
}
