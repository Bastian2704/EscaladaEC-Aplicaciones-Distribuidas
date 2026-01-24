import { P as attr_class, Q as stringify, T as ensure_array_like, O as attr, V as bind_props } from './index-DEBH4Vt4.js';
import { e as escape_html } from './context-R2425nfV.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    let form = $$props["form"];
    $$renderer2.push(`<h1 class="mb-4 text-xl">Usuarios</h1> `);
    if (form?.message) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p${attr_class(`mb-3 rounded border p-2 ${stringify(form.success ? "border-green-400 bg-green-50" : "border-red-400 bg-red-50")}`)}>${escape_html(form.message)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <table class="w-full border-collapse"><thead><tr><th class="border p-2 text-left">Email</th><th class="border p-2">Rol</th><th class="border p-2">Estado</th><th class="border p-2">Acciones</th></tr></thead><tbody><!--[-->`);
    const each_array = ensure_array_like(data.items);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let u = each_array[$$index];
      $$renderer2.push(`<tr><td class="border p-2">${escape_html(u.email)}</td><td class="border p-2">${escape_html(u.role)}</td><td class="border p-2">${escape_html(u.status)}</td><td class="border p-2"><form method="POST" class="inline"><input type="hidden" name="id"${attr("value", u.id)}/> <select name="role" class="border p-1">`);
      $$renderer2.option({ value: "user", selected: u.role === "user" }, ($$renderer3) => {
        $$renderer3.push(`user`);
      });
      $$renderer2.option({ value: "admin", selected: u.role === "admin" }, ($$renderer3) => {
        $$renderer3.push(`admin`);
      });
      $$renderer2.push(`</select> <button formaction="?/setRole" class="ml-1 border px-2 py-1">Guardar</button></form> `);
      if (u.status === "active") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<form method="POST" class="ml-2 inline"><input type="hidden" name="id"${attr("value", u.id)}/> <button formaction="?/suspend" class="border px-2 py-1">Suspender</button></form>`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (u.status === "suspended") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<form method="POST" class="ml-2 inline"><input type="hidden" name="id"${attr("value", u.id)}/> <button formaction="?/resume" class="border px-2 py-1">Reactivar</button></form>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--> `);
      if (u.status !== "deleted") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<form method="POST" class="ml-2 inline"><input type="hidden" name="id"${attr("value", u.id)}/> <button formaction="?/softDelete" class="border px-2 py-1">Borrar</button></form>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<form method="POST" class="ml-2 inline"><input type="hidden" name="id"${attr("value", u.id)}/> <button formaction="?/resume" class="border px-2 py-1">Restaurar</button></form>`);
      }
      $$renderer2.push(`<!--]--></td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table> <form method="POST" class="mb-6 flex flex-wrap items-center gap-2 rounded border bg-gray-50 p-3"><h2 class="mb-1 w-full font-semibold">Crear nuevo usuario</h2> <input type="email" name="email" placeholder="Email" class="border p-1" required/> <input type="username" name="username" placeholder="Username" class="border p-1" required/> <input type="age" name="age" placeholder="Age" class="border p-1" required/> <input type="password" name="password" placeholder="Contraseña (min 8)" class="border p-1" required/> <select name="role" class="custom-select">`);
    $$renderer2.option({ value: "user" }, ($$renderer3) => {
      $$renderer3.push(`user`);
    });
    $$renderer2.option({ value: "admin" }, ($$renderer3) => {
      $$renderer3.push(`admin`);
    });
    $$renderer2.push(`</select> <button formaction="?/createUser" class="border bg-blue-100 px-3 py-1 hover:bg-blue-200">Crear</button></form>`);
    bind_props($$props, { data, form });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CaBtLcio.js.map
