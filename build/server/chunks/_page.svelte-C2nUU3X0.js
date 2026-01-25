import { O as attr, T as ensure_array_like, V as bind_props } from './index-DEBH4Vt4.js';
import { a as provinces } from './serviceFactory-BdHGVNT9.js';
import { e as escape_html } from './context-R2425nfV.js';
import './lucia-CGGv7VMT.js';
import 'lucia';
import '@lucia-auth/adapter-drizzle';
import 'postgres';
import './shared-server-DaWdgxVh.js';
import './index-B2LGyy1l.js';
import 'argon2';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    $$renderer2.push(`<h1>Editar área</h1> <form method="POST" class="space-y-3"><label>Nombre del Área: <input type="text" name="name"${attr("value", data.item.name)} required/></label> <label>Provincia: <select name="province" required><!--[-->`);
    const each_array = ensure_array_like(provinces);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let province = each_array[$$index];
      $$renderer2.option({ value: province, selected: province === data.item.province }, ($$renderer3) => {
        $$renderer3.push(`${escape_html(province)}`);
      });
    }
    $$renderer2.push(`<!--]--></select></label> <label>Ciudad: <input type="text" name="city"${attr("value", data.item.city)} required/></label> <label>Descripción: <textarea name="description" rows="3">`);
    const $$body = escape_html(data.item.description);
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></label> <label>Latitud: <input type="number" step="any" name="latitude"${attr("value", data.item.latitude)}/></label> <label>Longitud: <input type="number" step="any" name="longitude"${attr("value", data.item.longitude)}/></label> <label>Estado: <select name="status">`);
    $$renderer2.option({ value: "active", selected: data.item.status === "active" }, ($$renderer3) => {
      $$renderer3.push(`Activa`);
    });
    $$renderer2.option(
      {
        value: "suspended",
        selected: data.item.status === "suspended"
      },
      ($$renderer3) => {
        $$renderer3.push(`Suspendida`);
      }
    );
    $$renderer2.option({ value: "deleted", selected: data.item.status === "deleted" }, ($$renderer3) => {
      $$renderer3.push(`Eliminada`);
    });
    $$renderer2.push(`</select></label> <div><button formaction="?/save" class="border bg-green-100 px-3 py-1">Guardar</button> <button formaction="?/softDelete" class="border bg-red-100 px-3 py-1">Eliminar</button> <a href="../" class="inline-block border bg-blue-100 px-3 py-1">Salir</a></div></form> <h1>Sectores de ${escape_html(data.item.name)}</h1> <a${attr("href", `/area/${data.item.id}/sector/`)}>Visualizar</a>`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-C2nUU3X0.js.map
