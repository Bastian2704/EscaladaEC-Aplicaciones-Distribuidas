import { x as attr_class, y as stringify, z as ensure_array_like, F as bind_props } from './index-Co_WztV4.js';
import { l as logo, f as fullLogo } from './aeLogo-DPOhMyaG.js';
import { p as page } from './index2-B4mLFtGO.js';
import { a as attr } from './attributes-C7gAcNRt.js';
import { e as escape_html } from './context-R2425nfV.js';
import './exports-_CuWBanw.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let messageVisible = false;
    let data = $$props["data"];
    let form = $$props["form"];
    if (form?.message) {
      messageVisible = true;
      setTimeout(
        () => {
          messageVisible = false;
        },
        3e3
      );
    }
    $$renderer2.push(`<section class="background"><section class="header__container"><header class="header"><section class="header__logo-container"><img class="logo" alt="logo"${attr("src", logo)}/> <h1 class="header-text">Urqu Ascents</h1></section> <nav class="menu"><ul class="menu__list header-text"><li><a class="menu__item" href="/dashboard">Menú Principal</a></li> <li><a class="menu__item" href="/area">Áreas</a></li> <li><a class="menu__item" href="/area">Mi Perfil</a></li></ul></nav></header></section> <main><section class="main"><section class="main__title-container"><h1 class="main-title">Areas</h1> `);
    if (page.data.role == "admin") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button class="main__title-create">${escape_html("+")}</button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></section> `);
    if (form?.message && messageVisible) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p${attr_class(`mb-3 rounded border p-2 ${stringify(form.success ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50")}`)}>${escape_html(form.message)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <button formaction="">Filtros</button> <table class="main__table"><thead class="main__table-head"><tr><th class="main__table-item">Nombre</th><th class="main__table-item">Provincia</th><th class="main__table-item">Ciudad</th><th class="main__table-item">Descripción</th><th class="main__table-item">Latitud</th><th class="main__table-item">Longitud</th></tr></thead><tbody class="main__table-tbody"><!--[-->`);
    const each_array = ensure_array_like(data.items);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let area = each_array[$$index];
      $$renderer2.push(`<tr class="main__table-body"><td class="main__table-td">${escape_html(area.name)}</td><td class="main__table-td">${escape_html(area.province)}</td><td class="main__table-td">${escape_html(area.city)}</td><td class="main__table-td">${escape_html(area.description)}</td><td class="main__table-td">${escape_html(area.latitude)}</td><td class="main__table-td">${escape_html(area.longitude)}</td>`);
      if (page.data.role == "admin") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<td><a${attr("href", `/area/${stringify(area.id)}/edit`)}>editar</a></td> <td>`);
        if (area.status === "active") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<form method="POST" class="ml-2 inline"><input type="hidden" name="id"${attr("value", area.id)}/> <button formaction="?/suspend" class="border px-2 py-1">Suspender</button></form>`);
        } else {
          $$renderer2.push("<!--[!-->");
          if (area.status === "suspended") {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<form method="POST" class="ml-2 inline"><input type="hidden" name="id"${attr("value", area.id)}/> <button formaction="?/resume" class="border px-2 py-1">Reactivar</button></form>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]-->`);
        }
        $$renderer2.push(`<!--]--> `);
        if (area.status !== "deleted") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<form method="POST" class="ml-2 inline"><input type="hidden" name="id"${attr("value", area.id)}/> <button formaction="?/softDelete" class="border px-2 py-1">Borrar</button></form>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<form method="POST" class="ml-2 inline"><input type="hidden" name="id"${attr("value", area.id)}/> <button formaction="?/restore" class="border px-2 py-1">Restaurar</button></form>`);
        }
        $$renderer2.push(`<!--]--></td>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--><td class="main__table-td-arrow">→</td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></section></main> <footer class="footer"><img class="smallLogo" alt="logo"${attr("src", fullLogo)}/> <section class="footer__links"><a href="/dashboard">Inicio</a> <a href="/area">Áreas</a> <a href="/profile">Mi Perfil</a> <a href="/contact">Contacto</a></section> <p class="footer__text">© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} Urqu Ascents</p></footer></section>`);
    bind_props($$props, { data, form });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-L2AHjhUw.js.map
