import { O as attr, P as attr_class, Q as stringify, V as bind_props } from './index-DEBH4Vt4.js';
import { l as logo } from './smallLogo-DiexfHjJ.js';
import { e as escape_html } from './context-R2425nfV.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let form = $$props["form"];
    $$renderer2.push(`<section class="login-background"><section class="login-split"><div class="login-left"><img class="logo-left"${attr("src", logo)} alt="logo Urqu Ascents"/> <h1 class="logo-text">Urqu Ascents</h1></div> <div class="login-card"><h1 class="login-title">Crear cuenta</h1> <p class="login-subtitle">Ingresa tus datos para registrarte</p> <form method="POST" class="login-form"><label class="login-label">Email <input name="email" type="email" required placeholder="ejemplo@correo.com" class="login-input"/></label> <label class="login-label">Contraseña <input name="password" type="password" minlength="8" required placeholder="••••••••" class="login-input"/></label> <label class="login-label">Username <input name="username" type="text" required placeholder="Tu nombre de usuario" class="login-input"/></label> <label class="login-label">Edad <input name="age" type="number" min="1" required placeholder="Tu edad" class="login-input"/></label> `);
    if (form?.message) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p${attr_class(`login-message ${stringify(form.success ? "success" : "error")}`)}>${escape_html(form.message)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <button type="submit" class="login-button">Registrarme</button></form> <p class="login-footer">¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p></div></section></section>`);
    bind_props($$props, { form });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B1bO1B81.js.map
