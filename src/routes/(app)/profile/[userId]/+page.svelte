<script lang="ts">
	import '$lib/styles/profile.css';
	import logo from '$lib/assets/smallLogo.png';
	import fullLogo from '$lib/assets/aeLogo.png';
	export let data: {
		items: {
			id: string;
			email: string;
			username: string;
			climbingLevelSport: number;
			climbingLevelNoRope: number;
			climbingLevelTrad: number;
			age: number;
			createdAt: string;
			updatedAt?: string | null;
			deletedAt?: string | null;
		}[];
		page: number;
		role: string;
		status: string;
		userRopeClimbs: {
			areaId: string;
			areaName: string;
			sectorName: string;
			climbName: string;
			realValue: string;
			proposedValue: string;
			difficulty: number;
			done: boolean;
			createdAt: string;
		}[];
		userTradClimbs: {
			areaId: string;
			areaName: string;
			sectorName: string;
			climbName: string;
			realValue: string;
			proposedValue: string;
			difficulty: number;
			done: boolean;
			createdAt: string;
		}[];
		userNoRopeClimbs: {
			areaId: string;
			areaName: string;
			sectorName: string;
			climbName: string;
			realValue: string;
			proposedValue: string;
			difficulty: number;
			done: boolean;
			createdAt: string;
		}[];
		sportRecommendations: {
		climbId: string;
		areaName: string | null;
		sectorName: string | null;
		climbName: string;
		gradeSystem: string;
		gradeValue: string;
		scaledValue: number | null;
	}[];

	noRopeRecommendations: {
		climbId: string;
		areaName: string | null;
		sectorName: string | null;
		climbName: string;
		gradeSystem: string;
		gradeValue: string;
		scaledValue: number | null;
	}[];

	tradRecommendations: {
		climbId: string;
		areaName: string | null;
		sectorName: string | null;
		climbName: string;
		gradeSystem: string;
		gradeValue: string;
		scaledValue: number | null;
	}[];
	};

	export let form: { message?: string; success?: boolean } | undefined;
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
					<li><a class="menu__item" href="/profile/{data.items[0].id}">Mi Perfil</a></li>
				</ul>
			</nav>
		</header>
	</section>

	<main>
		<section class="main">
			<section class="main__title-container">
				<section class="main__parent-description">
					<h1 class="main-title">Perfil</h1>
					<p class="main__profile-info">Nombre de usuario: {data.items[0].username}</p>
					<p class="main__profile-info">Email registrado: {data.items[0].email}</p>
					<h2 class="main-title">Recomendaciones</h2>

<h3 class="main__profile-info">Escalada Deportiva (Cuerda)</h3>
<table class="main__table">
	<thead class="main__table-head">
		<tr>
			<th class="main__table-item">Área / Sector</th>
			<th class="main__table-item">Climb</th>
			<th class="main__table-item">Sistema</th>
			<th class="main__table-item">Grado</th>
		</tr>
	</thead>
	<tbody class="main__table-tbody">
		{#if data.sportRecommendations.length === 0}
			<tr>
				<td class="main__table-td" colspan="4">
					No hay recomendaciones de deportiva por ahora.
				</td>
			</tr>
		{:else}
			{#each data.sportRecommendations as recommendation}
				<tr
					class="main__table-body"
					on:click={() =>
						(window.location.href = `climb/${recommendation.climbId}/grade`)}
				>
					<td class="main__table-td">
						{recommendation.areaName} - {recommendation.sectorName}
					</td>
					<td class="main__table-td">{recommendation.climbName}</td>
					<td class="main__table-td">{recommendation.gradeSystem}</td>
					<td class="main__table-td">{recommendation.gradeValue}</td>
				</tr>
			{/each}
		{/if}
	</tbody>
</table>

<h3 class="main__profile-info">Escalada Sin Cuerda (Boulder / Psicobloc / Highball)</h3>
<table class="main__table">
	<thead class="main__table-head">
		<tr>
			<th class="main__table-item">Área / Sector</th>
			<th class="main__table-item">Climb</th>
			<th class="main__table-item">Sistema</th>
			<th class="main__table-item">Grado</th>
		</tr>
	</thead>
	<tbody class="main__table-tbody">
		{#if data.noRopeRecommendations.length === 0}
			<tr>
				<td class="main__table-td" colspan="4">
					No hay recomendaciones sin cuerda por ahora.
				</td>
			</tr>
		{:else}
			{#each data.noRopeRecommendations as recommendation}
				<tr
					class="main__table-body"
					on:click={() =>
						(window.location.href = `climb/${recommendation.climbId}/grade`)}
				>
					<td class="main__table-td">
						{recommendation.areaName} - {recommendation.sectorName}
					</td>
					<td class="main__table-td">{recommendation.climbName}</td>
					<td class="main__table-td">{recommendation.gradeSystem}</td>
					<td class="main__table-td">{recommendation.gradeValue}</td>
				</tr>
			{/each}
		{/if}
	</tbody>
</table>

<h3 class="main__profile-info">Escalada Tradicional</h3>
<table class="main__table">
	<thead class="main__table-head">
		<tr>
			<th class="main__table-item">Área / Sector</th>
			<th class="main__table-item">Climb</th>
			<th class="main__table-item">Sistema</th>
			<th class="main__table-item">Grado</th>
		</tr>
	</thead>
	<tbody class="main__table-tbody">
		{#if data.tradRecommendations.length === 0}
			<tr>
				<td class="main__table-td" colspan="4">
					No hay recomendaciones de trad por ahora.
				</td>
			</tr>
		{:else}
			{#each data.tradRecommendations as recommendation}
				<tr
					class="main__table-body"
					on:click={() =>
						(window.location.href = `climb/${recommendation.climbId}/grade`)}
				>
					<td class="main__table-td">
						{recommendation.areaName} - {recommendation.sectorName}
					</td>
					<td class="main__table-td">{recommendation.climbName}</td>
					<td class="main__table-td">{recommendation.gradeSystem}</td>
					<td class="main__table-td">{recommendation.gradeValue}</td>
				</tr>
			{/each}
		{/if}
	</tbody>
</table>


					<p class="main__profile-info">
						Nivel de Escalada Deportiva: {data.items[0].climbingLevelSport}
					</p>
					<table class="main__table">
						<thead class="main__table-head">
							<tr>
								<th class="main__table-item">Area-Sector</th>
								<th class="main__table-item">Climb</th>
								<th class="main__table-item">Valor</th>
								<th class="main__table-item">Valor Propuesto</th>
								<th class="main__table-item">Dificultad</th>
								<th class="main__table-item">Logrado</th>
							</tr>
						</thead>
						<tbody class="main__table-tbody">
							{#each data.userRopeClimbs as ropeClimbs}
								<tr
									class="main__table-body"
									on:click={() => (window.location.href = `climb/${ropeClimbs.areaId}/grade`)}
								>
									<td class="main__table-td">{`${ropeClimbs.areaName}-${ropeClimbs.sectorName}`}</td
									>
									<td class="main__table-td">{ropeClimbs.climbName}</td>
									<td class="main__table-td">{ropeClimbs.realValue}</td>
									<td class="main__table-td">{ropeClimbs.proposedValue}</td>
									<td class="main__table-td">{ropeClimbs.difficulty}</td>
									<td class="main__table-td">{ropeClimbs.done ? '✅' : '❌'}</td>
								</tr>
							{/each}
						</tbody>
					</table>

					<p class="main__profile-info">
						Nivel de Escalada Sin Cuerda: {data.items[0].climbingLevelNoRope}
					</p>
					<table class="main__table">
						<thead class="main__table-head">
							<tr>
								<th class="main__table-item">Area-Sector</th>
								<th class="main__table-item">Climb</th>
								<th class="main__table-item">Valor</th>
								<th class="main__table-item">Valor Propuesto</th>
								<th class="main__table-item">Dificultad</th>
								<th class="main__table-item">Logrado</th>
							</tr>
						</thead>
						<tbody class="main__table-tbody">
							{#each data.userNoRopeClimbs as noRopeClimbs}
								<tr
									class="main__table-body"
									on:click={() => (window.location.href = `climb/${noRopeClimbs.areaId}/grade`)}
								>
									<td class="main__table-td"
										>{`${noRopeClimbs.areaName}-${noRopeClimbs.sectorName}`}</td
									>
									<td class="main__table-td">{noRopeClimbs.climbName}</td>
									<td class="main__table-td">{noRopeClimbs.realValue}</td>
									<td class="main__table-td">{noRopeClimbs.proposedValue}</td>
									<td class="main__table-td">{noRopeClimbs.difficulty}</td>
									<td class="main__table-td">{noRopeClimbs.done ? '✅' : '❌'}</td>
								</tr>
							{/each}
						</tbody>
					</table>
					<p class="main__profile-info">
						Nivel de Escalada Tradicional: {data.items[0].climbingLevelTrad}
					</p>
					<table class="main__table">
						<thead class="main__table-head">
							<tr>
								<th class="main__table-item">Area-Sector</th>
								<th class="main__table-item">Climb</th>
								<th class="main__table-item">Valor</th>
								<th class="main__table-item">Valor Propuesto</th>
								<th class="main__table-item">Dificultad</th>
								<th class="main__table-item">Logrado</th>
							</tr>
						</thead>
						<tbody class="main__table-tbody">
							{#each data.userTradClimbs as tradClimbs}
								<tr
									class="main__table-body"
									on:click={() => (window.location.href = `climb/${tradClimbs.areaId}/grade`)}
								>
									<td class="main__table-td">{`${tradClimbs.areaName}-${tradClimbs.sectorName}`}</td
									>
									<td class="main__table-td">{tradClimbs.climbName}</td>
									<td class="main__table-td">{tradClimbs.realValue}</td>
									<td class="main__table-td">{tradClimbs.proposedValue}</td>
									<td class="main__table-td">{tradClimbs.difficulty}</td>
									<td class="main__table-td">{tradClimbs.done ? '✅' : '❌'}</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</section>
			</section>
			{#if form?.message}
				<p
					class="mb-3 rounded border p-2 {form.success
						? 'border-green-400 bg-green-50'
						: 'border-red-400 bg-red-50'}"
				>
					{form.message}
				</p>
			{/if}
		</section>
	</main>
	<footer class="footer">
		<img class="smallLogo" alt="logo" src={fullLogo} />

		<section class="footer__links">
			<a href="/dashboard">Inicio</a>
			<a href="/area">Áreas</a>
			<a href="/profile/{data.items[0].id}">Mi Perfil</a>
			<!--TODO: Add This Pages-->
			<a href="/contact">Contacto</a>
		</section>
		<p class="footer__text">
			© {new Date().getFullYear()} Urqu Ascents
		</p>
	</footer>
</section>
