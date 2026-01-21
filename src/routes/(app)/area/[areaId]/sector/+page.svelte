<script lang="ts">
	import { type Status } from '$lib/contants/constants';
	import logo from '$lib/assets/smallLogo.png';
	import fullLogo from '$lib/assets/aeLogo.png';
	import { page } from '$app/state';
	import '$lib/styles/sector.css';

	export let data: {
		items: {
			id: string;
			areaId: string;
			name: string;
			orientation: string;
			description: string;
			status: Status;
			createdAt: string;
			updatedAt?: string | null;
			deletedAt?: string | null;
		}[];
		areaInfo: {
			id: string;
			name: string;
			province: string;
			city: string;
			description: string;
			latitude: number;
			longitude: number;
			status: Status;
			createdAt: string;
			updatedAt?: string | null;
			deletedAt?: string | null;
		}[];
		page: number;
		status: string;
	};

	export let form: { message?: string; success?: boolean } | undefined;
	let messageVisible = false;

	let showForm = false;

	function toggleForm() {
		showForm = !showForm;
	}
	$: if (form?.message) {
		messageVisible = true;
		setTimeout(() => {
			messageVisible = false;
		}, 3000);
	}
</script>

<section class="background">
	<section class="header__container">
		<header class="header">
			<section class="header__logo-container">
				<img class="logo" alt="logo" src={logo} />
				<h1 class="header-text">Urqu Ascents</h1>
			</section>
			<nav class="menu">
				<ul class="menu__list header-text">
					<li><a class="menu__item" href="/dashboard">Menú Principal</a></li>
					<li><a class="menu__item" href="/area">Áreas</a></li>
					<li><a class="menu__item" href="/profile/{page.data.user.id}">Mi Perfil</a></li>
				</ul>
			</nav>
		</header>
	</section>

	<main>
		<section class="main">
			<section class="main__parent-description">
				<h2 class="main__subtitle">{data.areaInfo[0].name}</h2>
				<p class="main__area-info">{data.areaInfo[0].province}-{data.areaInfo[0].city}</p>
			</section>
			<section class="main__title-container">
				<section class="main__title-left-container">
					<a class="main__title button" href="/area">←</a>
					<h1 class="main__title">Sectores</h1>
				</section>
				{#if page.data.role == 'admin'}
					<button class="main__title-create" on:click={toggleForm}>
						{showForm ? '×' : '+'}
					</button>
				{/if}
			</section>
			<!-- Check-->

			{#if form?.message && messageVisible}
				<p
					class="mb-3 rounded border p-2 {form.success
						? 'border-green-400 bg-green-50'
						: 'border-red-400 bg-red-50'}"
				>
					{form.message}
				</p>
			{/if}
			<button formaction="">Filtros</button>

			<!--TODO: ADD FILTERS-->

			<table class="main__table">
				<thead class="main__table-head">
					<tr>
						<th class="main__table-item">Nombre</th>
						<th class="main__table-item">Orientación</th>
						<th class="main__table-item">Descripción</th>
						<!--TODO: Verify if this is neccessary
						<th class="main__table-item">Acciones</th>
						-->
					</tr>
				</thead>
				<tbody class="main__table-tbody">
					{#each data.items as sector}
						<tr
							class="main__table-body"
							on:click={() =>
								(window.location.href = `/area/${sector.areaId}/sector/${sector.id}/climb`)}
						>
							<td class="main__table-td">{sector.name}</td>
							<td class="main__table-td">{sector.orientation}</td>
							<td class="main__table-td">{sector.description}</td>
							{#if page.data.role == 'admin'}
								<td>
									<a href="/area/{sector.areaId}/sector/{sector.id}/edit" on:click|stopPropagation
										>editar</a
									>
								</td>
								<td on:click|stopPropagation>
									{#if sector.status === 'active'}
										<form method="POST" class="ml-2 inline">
											<input type="hidden" name="id" value={sector.id} />
											<button formaction="?/suspend" class="border px-2 py-1">Suspender</button>
										</form>
									{:else if sector.status === 'suspended'}
										<form method="POST" class="ml-2 inline">
											<input type="hidden" name="id" value={sector.id} />
											<button formaction="?/resume" class="border px-2 py-1">Reactivar</button>
										</form>
									{/if}

									{#if sector.status !== 'deleted'}
										<form method="POST" class="ml-2 inline">
											<input type="hidden" name="id" value={sector.id} />
											<button formaction="?/softDelete" class="border px-2 py-1">Borrar</button>
										</form>
									{:else}
										<form method="POST" class="ml-2 inline">
											<input type="hidden" name="id" value={sector.id} />
											<button formaction="?/restore" class="border px-2 py-1">Restaurar</button>
										</form>
									{/if}
								</td>
							{/if}
							<td class="main__table-td-arrow">→</td>
						</tr>
					{/each}
				</tbody>
			</table>
			{#if showForm}
				<form method="POST" enctype="multipart/form-data">
					<h2>Crear nuevo sector</h2>
					<br />

					<label for="name">Nombre:</label>
					<input type="text" name="name" id="name" required />

					<br />

					<label for="orientation">Orientación:</label>
					<input type="text" name="orientation" id="orientation" required />

					<br />

					<label for="description">Descripción:</label>
					<input type="text" name="description" id="description" required />

					<br />

					<button type="submit" formaction="?/createSector">Crear Sector</button>
				</form>
			{/if}
		</section>
	</main>
	<footer class="footer">
		<img class="smallLogo" alt="logo" src={fullLogo} />

		<section class="footer__links">
			<a href="/dashboard">Inicio</a>
			<a href="/area">Áreas</a>
			<a href="/profile/{page.data.user.id}">Mi Perfil</a>
			<!--TODO: Add This Pages-->
			<a href="/contact">Contacto</a>
		</section>
		<p class="footer__text">
			© {new Date().getFullYear()} Urqu Ascents
		</p>
	</footer>
</section>
