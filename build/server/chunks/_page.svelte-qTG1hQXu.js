import { O as attr, Q as stringify, T as ensure_array_like, P as attr_class, V as bind_props } from './index-DEBH4Vt4.js';
import { l as logo } from './smallLogo-DiexfHjJ.js';
import { f as fullLogo } from './aeLogo-B49Ylsbh.js';
import { e as escape_html } from './context-R2425nfV.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let form = $$props["form"];
    $$renderer2.push(`<section class="background"><section class="header__container"><header class="header"><section class="header__logo-container"><img class="logo" alt="logo"${attr("src", logo)}/> <h1 class="header-text">Urqu Ascents</h1></section> <nav class="menu"><ul class="menu__list header-text"><li><a class="menu__item" href="/dashboard">Menú Principal</a></li> <li><a class="menu__item" href="/area">Áreas</a></li> <li><a class="menu__item"${attr("href", `/profile/${stringify(data.items[0].id)}`)}>Mi Perfil</a></li></ul></nav></header></section> <main><section class="main"><section class="main__title-container"><section class="main__parent-description"><h1 class="main-title">Perfil</h1> <p class="main__profile-info">Nombre de usuario: ${escape_html(data.items[0].username)}</p> <p class="main__profile-info">Email registrado: ${escape_html(data.items[0].email)}</p> <h2 class="main-title">Recomendaciones</h2> <h3 class="main__profile-info">Escalada Deportiva (Cuerda)</h3> <table class="main__table"><thead class="main__table-head"><tr><th class="main__table-item">Área / Sector</th><th class="main__table-item">Climb</th><th class="main__table-item">Sistema</th><th class="main__table-item">Grado</th></tr></thead><tbody class="main__table-tbody">`);
    if (data.sportRecommendations.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<tr><td class="main__table-td" colspan="4">No hay recomendaciones de deportiva por ahora.</td></tr>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(data.sportRecommendations);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let recommendation = each_array[$$index];
        $$renderer2.push(`<tr class="main__table-body"><td class="main__table-td">${escape_html(recommendation.areaName)} - ${escape_html(recommendation.sectorName)}</td><td class="main__table-td">${escape_html(recommendation.climbName)}</td><td class="main__table-td">${escape_html(recommendation.gradeSystem)}</td><td class="main__table-td">${escape_html(recommendation.gradeValue)}</td></tr>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></tbody></table> <h3 class="main__profile-info">Escalada Sin Cuerda (Boulder / Psicobloc / Highball)</h3> <table class="main__table"><thead class="main__table-head"><tr><th class="main__table-item">Área / Sector</th><th class="main__table-item">Climb</th><th class="main__table-item">Sistema</th><th class="main__table-item">Grado</th></tr></thead><tbody class="main__table-tbody">`);
    if (data.noRopeRecommendations.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<tr><td class="main__table-td" colspan="4">No hay recomendaciones sin cuerda por ahora.</td></tr>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(data.noRopeRecommendations);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let recommendation = each_array_1[$$index_1];
        $$renderer2.push(`<tr class="main__table-body"><td class="main__table-td">${escape_html(recommendation.areaName)} - ${escape_html(recommendation.sectorName)}</td><td class="main__table-td">${escape_html(recommendation.climbName)}</td><td class="main__table-td">${escape_html(recommendation.gradeSystem)}</td><td class="main__table-td">${escape_html(recommendation.gradeValue)}</td></tr>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></tbody></table> <h3 class="main__profile-info">Escalada Tradicional</h3> <table class="main__table"><thead class="main__table-head"><tr><th class="main__table-item">Área / Sector</th><th class="main__table-item">Climb</th><th class="main__table-item">Sistema</th><th class="main__table-item">Grado</th></tr></thead><tbody class="main__table-tbody">`);
    if (data.tradRecommendations.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<tr><td class="main__table-td" colspan="4">No hay recomendaciones de trad por ahora.</td></tr>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array_2 = ensure_array_like(data.tradRecommendations);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let recommendation = each_array_2[$$index_2];
        $$renderer2.push(`<tr class="main__table-body"><td class="main__table-td">${escape_html(recommendation.areaName)} - ${escape_html(recommendation.sectorName)}</td><td class="main__table-td">${escape_html(recommendation.climbName)}</td><td class="main__table-td">${escape_html(recommendation.gradeSystem)}</td><td class="main__table-td">${escape_html(recommendation.gradeValue)}</td></tr>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></tbody></table> <p class="main__profile-info">Nivel de Escalada Deportiva: ${escape_html(data.items[0].climbingLevelSport)}</p> <table class="main__table"><thead class="main__table-head"><tr><th class="main__table-item">Area-Sector</th><th class="main__table-item">Climb</th><th class="main__table-item">Valor</th><th class="main__table-item">Valor Propuesto</th><th class="main__table-item">Dificultad</th><th class="main__table-item">Logrado</th></tr></thead><tbody class="main__table-tbody"><!--[-->`);
    const each_array_3 = ensure_array_like(data.userRopeClimbs);
    for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
      let ropeClimbs = each_array_3[$$index_3];
      $$renderer2.push(`<tr class="main__table-body"><td class="main__table-td">${escape_html(`${ropeClimbs.areaName}-${ropeClimbs.sectorName}`)}</td><td class="main__table-td">${escape_html(ropeClimbs.climbName)}</td><td class="main__table-td">${escape_html(ropeClimbs.realValue)}</td><td class="main__table-td">${escape_html(ropeClimbs.proposedValue)}</td><td class="main__table-td">${escape_html(ropeClimbs.difficulty)}</td><td class="main__table-td">${escape_html(ropeClimbs.done ? "✅" : "❌")}</td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table> <p class="main__profile-info">Nivel de Escalada Sin Cuerda: ${escape_html(data.items[0].climbingLevelNoRope)}</p> <table class="main__table"><thead class="main__table-head"><tr><th class="main__table-item">Area-Sector</th><th class="main__table-item">Climb</th><th class="main__table-item">Valor</th><th class="main__table-item">Valor Propuesto</th><th class="main__table-item">Dificultad</th><th class="main__table-item">Logrado</th></tr></thead><tbody class="main__table-tbody"><!--[-->`);
    const each_array_4 = ensure_array_like(data.userNoRopeClimbs);
    for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
      let noRopeClimbs = each_array_4[$$index_4];
      $$renderer2.push(`<tr class="main__table-body"><td class="main__table-td">${escape_html(`${noRopeClimbs.areaName}-${noRopeClimbs.sectorName}`)}</td><td class="main__table-td">${escape_html(noRopeClimbs.climbName)}</td><td class="main__table-td">${escape_html(noRopeClimbs.realValue)}</td><td class="main__table-td">${escape_html(noRopeClimbs.proposedValue)}</td><td class="main__table-td">${escape_html(noRopeClimbs.difficulty)}</td><td class="main__table-td">${escape_html(noRopeClimbs.done ? "✅" : "❌")}</td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table> <p class="main__profile-info">Nivel de Escalada Tradicional: ${escape_html(data.items[0].climbingLevelTrad)}</p> <table class="main__table"><thead class="main__table-head"><tr><th class="main__table-item">Area-Sector</th><th class="main__table-item">Climb</th><th class="main__table-item">Valor</th><th class="main__table-item">Valor Propuesto</th><th class="main__table-item">Dificultad</th><th class="main__table-item">Logrado</th></tr></thead><tbody class="main__table-tbody"><!--[-->`);
    const each_array_5 = ensure_array_like(data.userTradClimbs);
    for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
      let tradClimbs = each_array_5[$$index_5];
      $$renderer2.push(`<tr class="main__table-body"><td class="main__table-td">${escape_html(`${tradClimbs.areaName}-${tradClimbs.sectorName}`)}</td><td class="main__table-td">${escape_html(tradClimbs.climbName)}</td><td class="main__table-td">${escape_html(tradClimbs.realValue)}</td><td class="main__table-td">${escape_html(tradClimbs.proposedValue)}</td><td class="main__table-td">${escape_html(tradClimbs.difficulty)}</td><td class="main__table-td">${escape_html(tradClimbs.done ? "✅" : "❌")}</td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></section></section> `);
    if (form?.message) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p${attr_class(`mb-3 rounded border p-2 ${stringify(form.success ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50")}`)}>${escape_html(form.message)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></section></main> <footer class="footer"><img class="smallLogo" alt="logo"${attr("src", fullLogo)}/> <section class="footer__links"><a href="/dashboard">Inicio</a> <a href="/area">Áreas</a> <a${attr("href", `/profile/${stringify(data.items[0].id)}`)}>Mi Perfil</a> <a href="/contact">Contacto</a></section> <p class="footer__text">© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} Urqu Ascents</p></footer></section>`);
    bind_props($$props, { data, form });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-qTG1hQXu.js.map
