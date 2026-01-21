<script lang="ts">
	import '$lib/styles/users.css';
	export let data: {
		items: Array<{
			id: string;
			email: string;
			role: 'user' | 'admin';
			status: 'active' | 'suspended' | 'deleted';
			createdAt: string;
			updatedAt?: string | null;
			deletedAt?: string | null;
		}>;
		page: number;
		role: string;
		status: string;
	};

	export let form: { message?: string; success?: boolean } | undefined;
</script>

<h1 class="mb-4 text-xl">Usuarios</h1>

{#if form?.message}
	<p
		class="mb-3 rounded border p-2 {form.success
			? 'border-green-400 bg-green-50'
			: 'border-red-400 bg-red-50'}"
	>
		{form.message}
	</p>
{/if}

<table class="w-full border-collapse">
	<thead>
		<tr>
			<th class="border p-2 text-left">Email</th>
			<th class="border p-2">Rol</th>
			<th class="border p-2">Estado</th>
			<th class="border p-2">Acciones</th>
		</tr>
	</thead>
	<tbody>
		{#each data.items as u}
			<tr>
				<td class="border p-2">{u.email}</td>
				<td class="border p-2">{u.role}</td>
				<td class="border p-2">{u.status}</td>
				<td class="border p-2">
					<form method="POST" class="inline">
						<input type="hidden" name="id" value={u.id} />
						<select name="role" class="border p-1">
							<option value="user" selected={u.role === 'user'}>user</option>
							<option value="admin" selected={u.role === 'admin'}>admin</option>
						</select>
						<button formaction="?/setRole" class="ml-1 border px-2 py-1">Guardar</button>
					</form>

					{#if u.status === 'active'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={u.id} />
							<button formaction="?/suspend" class="border px-2 py-1">Suspender</button>
						</form>
					{:else if u.status === 'suspended'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={u.id} />
							<button formaction="?/resume" class="border px-2 py-1">Reactivar</button>
						</form>
					{/if}

					{#if u.status !== 'deleted'}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={u.id} />
							<button formaction="?/softDelete" class="border px-2 py-1">Borrar</button>
						</form>
					{:else}
						<form method="POST" class="ml-2 inline">
							<input type="hidden" name="id" value={u.id} />
							<button formaction="?/resume" class="border px-2 py-1">Restaurar</button>
						</form>
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<form method="POST" class="mb-6 flex flex-wrap items-center gap-2 rounded border bg-gray-50 p-3">
	<h2 class="mb-1 w-full font-semibold">Crear nuevo usuario</h2>
	<input type="email" name="email" placeholder="Email" class="border p-1" required />
	<input type="username" name="username" placeholder="Username" class="border p-1" required />
	<input type="age" name="age" placeholder="Age" class="border p-1" required />
	<input
		type="password"
		name="password"
		placeholder="Contraseña (min 8)"
		class="border p-1"
		required
	/>
	<select name="role" class="custom-select">
		<option value="user">user</option>
		<option value="admin">admin</option>
	</select>
	<button formaction="?/createUser" class="border bg-blue-100 px-3 py-1 hover:bg-blue-200"
		>Crear</button
	>
</form>
