import { F as bind_props } from './index-Co_WztV4.js';
import { a as attr } from './attributes-C7gAcNRt.js';
import './context-R2425nfV.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let data = $$props["data"];
    $$renderer2.push(`<h1 class="mb-4 text-xl">Grado</h1> <form method="POST" class="space-y-3"><label>Nombre: <input type="text" name="gradeSystem"${attr("value", data.item.gradeSystem)} required/></label> <label>Categoría: <input type="text" name="value"${attr("value", data.item.value)} required/></label> <label>Tipo de Escalada: <input type="boolean" name="accomplished"${attr("value", data.item.accomplished)} required/></label> <label>Equipo Requerido: <input type="number" name="difficultyLevel"${attr("value", data.item.difficultyLevel)} required/></label> <label>Estado: <select name="status">`);
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
    $$renderer2.push(`</select></label> <div class="mt-4 flex gap-2"><button formaction="?/save" class="border bg-green-100 px-3 py-1">Guardar</button> <button formaction="?/softDelete" class="border bg-red-100 px-3 py-1">Eliminar</button> <a href="../" class="inline-block border bg-blue-100 px-3 py-1">Salir</a></div></form>`);
    bind_props($$props, { data });
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CRh-2bKb.js.map
